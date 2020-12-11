import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet } from "react-native";
import { loadCldr, GlobalizeProvider } from "react-native-globalize";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import AppNavigator from "./nav";
import store from "./store";

// Example: loading German, English, and Spanish
loadCldr(require("react-native-globalize/locale-data/en"));

const App = () => {
  const [fontsLoaded, fontsError] = useFonts({
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "roboto-bold-italic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
  });

  if (fontsError) console.error(fontsError);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <GlobalizeProvider locale="en">
      <Provider store={store}>
        <AppNavigator />
        <FlashMessage
          titleStyle={styles.flashMsgTitle}
          textStyle={styles.flashMsgText}
        />
      </Provider>
    </GlobalizeProvider>
  );
};

const styles = StyleSheet.create({
  flashMsgText: {
    fontFamily: "poppins-bold",
  },
  flashMsgText: {
    fontFamily: "roboto",
  },
});

export default App;
