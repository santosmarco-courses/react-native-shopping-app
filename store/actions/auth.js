import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGN_UP, SIGN_IN, SIGN_OUT, SET_USER } from "./actionTypes";

const setLogoutTimer = (expirationTime) => async (dispatch) => {
  const logoutTimeout = await setTimeout(() => {
    dispatch(signOut());
  }, expirationTime);
  clearTimeout(logoutTimeout);
};

export const signUp = ({ email, password, username }) => async (dispatch) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3N6lalzlXy9WNq4WRjl_EdKyRTpXDr0Y`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error.message);
  }

  const { idToken } = await res.json();

  const updateRes = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD3N6lalzlXy9WNq4WRjl_EdKyRTpXDr0Y`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
        displayName: username,
        returnSecureToken: true,
      }),
    }
  );

  if (!updateRes.ok) {
    const errData = await res.json();
    throw new Error(errData.error.message);
  }

  dispatch({ type: SIGN_UP });

  dispatch(signIn({ email, password }));
};

export const signIn = ({ email, password }) => async (dispatch) => {
  const now = new Date();

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3N6lalzlXy9WNq4WRjl_EdKyRTpXDr0Y`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error.message);
  }

  const data = await res.json();

  const storeData = {
    user: { id: data.localId, email: data.email, username: data.displayName },
    idToken: data.idToken,
    refreshToken: data.refreshToken,
    expiresIn: data.expiresIn,
  };

  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: storeData.user.id,
      idToken: storeData.idToken,
      refreshToken: storeData.refreshToken,
      expiresAt: new Date(
        now.getTime() + +storeData.expiresIn * 1000
      ).toISOString(),
    })
  );

  dispatch(setLogoutTimer(+storeData.expiresIn * 1000));

  dispatch({
    type: SIGN_IN,
    data: { ...storeData },
  });
};

export const tryAutoLogIn = () => async (dispatch) => {
  let userStorageData = await AsyncStorage.getItem("userData");

  if (!userStorageData) {
    return;
  }

  userStorageData = JSON.parse(userStorageData);

  if (new Date(userStorageData.expiresAt) <= new Date()) {
    return;
  }

  const tokenRes = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=AIzaSyD3N6lalzlXy9WNq4WRjl_EdKyRTpXDr0Y`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: userStorageData.refreshToken,
      }),
    }
  );

  const tokenData = await tokenRes.json();

  const userData = {
    idToken: tokenData.id_token,
    refreshToken: tokenData.refresh_token,
    expiresIn: tokenData.expires_in,
    user: { id: tokenData.user_id },
  };

  const userInfoRes = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD3N6lalzlXy9WNq4WRjl_EdKyRTpXDr0Y`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: userData.idToken }),
    }
  );

  const userInfoData = await userInfoRes.json();

  userData.user = {
    ...userData.user,
    email: userInfoData.users[0].email,
    username: userInfoData.users[0].displayName,
  };

  dispatch(setLogoutTimer(+userData.expiresIn * 1000));

  dispatch({
    type: SET_USER,
    data: userData,
  });
};

export const signOut = () => async (dispatch) => {
  await AsyncStorage.removeItem("userData");

  dispatch({ type: SIGN_OUT });
};
