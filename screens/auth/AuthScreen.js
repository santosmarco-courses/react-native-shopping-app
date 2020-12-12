import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import validator from "validator";
import { showMessage } from "react-native-flash-message";
import Input from "../../components/UI/Input";
import { DEFAULT_SPACING, DEFAULT_BORDER_RADIUS_SM } from "../../const/style";
import * as colors from "../../const/colors";
import * as authActions from "../../store/actions/auth";

const AuthScreen = ({ navigation, signUp = false }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmError, setConfirmError] = useState(null);

  const dispatch = useDispatch();

  const validateInputs = useCallback(() => {
    const errors = {};
    if (email.length > 0 && !validator.isEmail(email)) {
      errors.email = "Invalid e-mail";
    }
    if (signUp) {
      if (username.length > 0 && !validator.isLength(username, { min: 10 })) {
        errors.username = "Username must contain at least 10 characters";
      }
      if (
        password.length > 0 &&
        !validator.isStrongPassword(password, { minLength: 12, minSymbols: 0 })
      ) {
        errors.password =
          "Password is not strong enough.\nMin length: 12 • Min lowercase: 1 • Min uppercase: 1 • Min numbers: 1";
      }
      if (confirmPassword.length > 0 && password !== confirmPassword) {
        errors.confirmPassword = "Passwords don't match";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [signUp, email, password, confirmPassword]);

  const switchHandler = () => {
    if (signUp) return navigation.navigate("Login");
    return navigation.navigate("Sign Up");
  };

  const confirmHandler = useCallback(async () => {
    if (!validateInputs()) return;

    if (signUp) {
      try {
        await dispatch(authActions.signUp({ email, password, username }));
        // showMessage({
        //   message: "Success!",
        //   description: "User successfully signed up",
        //   type: "success",
        // });
      } catch (err) {
        setConfirmError(err);
      }
    } else {
      dispatch(authActions.signIn({ email, password }))
        .then(() =>
          showMessage({
            message: "Success!",
            description: "User successfully signed in",
            type: "success",
          })
        )
        .catch((err) => {
          setConfirmError(err);
        });
    }
  }, [signUp, validateInputs, email, password, username]);

  useEffect(() => {
    validateInputs();
  }, [validateInputs]);

  useEffect(() => {
    if (confirmError) {
      Alert.alert("An error occurred", confirmError, [{ text: "OK" }]);
      setConfirmError(null);
    }
  }, [confirmError]);

  useEffect(() => {
    dispatch(authActions.tryAutoLogIn());
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-50}
      style={styles.screen}
    >
      <LinearGradient colors={["#FC7A1E", "#19323C"]} style={styles.gradient}>
        <View style={styles.authContainer}>
          <ScrollView
            contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
          >
            <View>
              {signUp && (
                <Input
                  label="Username"
                  value={username}
                  onChangeText={setUsername}
                  errorMsg={errors.username}
                  styleOptions={{
                    container: { marginBottom: DEFAULT_SPACING },
                  }}
                />
              )}
              <Input
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                errorMsg={errors.email}
                styleOptions={{ container: { marginBottom: DEFAULT_SPACING } }}
              />
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                errorMsg={errors.password}
                secureTextEntry
              />
              {signUp && (
                <Input
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  errorMsg={errors.confirmPassword}
                  secureTextEntry
                  styleOptions={{
                    container: { marginTop: DEFAULT_SPACING },
                  }}
                />
              )}
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                title={signUp ? "Switch to Login" : "Switch to Sign Up"}
                color={colors.DARK}
                onPress={switchHandler}
              />
              <Button
                title={signUp ? "Sign Up >" : "Login >"}
                color={colors.BTNS_PRIMARY}
                onPress={confirmHandler}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: DEFAULT_SPACING * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "50%",
    padding: DEFAULT_SPACING,
    borderRadius: DEFAULT_BORDER_RADIUS_SM * 2,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: DEFAULT_SPACING,
  },
});
