/**
 * This file is a web polyfill of React Native's Alert class.
 * This module has the exact same API as React Native's Alert.
 *
 * How this works:
 * 1. The first time Alert is imported, create a new React tree in
 * another DOM node. We use a div with id "alert-root" appended to
 * the body of the web page.
 *
 * 2. Set up an event subscription in AlertComponent. This is the
 * React component of the alert itself that is displayed.
 *
 * 3. In Alert.alert and Alert.prompt, trigger events that will
 * make AlertComponent render the alert.
 */

import React, { useEffect, useState } from "react";
import {
  AlertStatic,
  AlertButton,
  AlertOptions,
  AlertType,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ReactDOM from "react-dom";
import EventEmitter from "../EventEmitter";

const alertEmitter = new EventEmitter();
enum AlertEvent {
  ShowAlert = "ShowAlert",
  ShowPrompt = "ShowPrompt",
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alert: {
    backgroundColor: "white",
    width: "90%",
    maxWidth: 500,
    padding: 24,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: 16,
  },
  buttonLabel: {
    color: "#2196f3",
    fontSize: 16,
    fontWeight: "bold",
  },
});

type State =
  | { show: "none" }
  | {
      show: "alert";
      title: string;
      message?: string;
      buttons?: AlertButton[];
      options?: AlertOptions;
    };

function AlertComponent() {
  useEffect(() => {
    const unsubAlert = alertEmitter.on(AlertEvent.ShowAlert, showAlert);
    const unsubPrompt = alertEmitter.on(AlertEvent.ShowPrompt, showPrompt);

    return () => {
      unsubAlert();
      unsubPrompt();
    };
  }, []);
  const [state, setState] = useState<State>({ show: "none" });

  function showAlert(
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions
  ) {
    setState({
      show: "alert",
      title,
      message,
      buttons,
      options,
    });
  }

  function showPrompt() {
    // Alert.prompt is not implemented on web. It seems to be an
    // undocumented legacy(?) feature in React Native, and doesn't
    // work on Android, so it should probably not be used anyway.
    console.error("Alert.prompt not implemented on web.");
  }

  function dismissAndDo(callback?: () => void) {
    setState({ show: "none" });
    callback?.();
  }

  switch (state.show) {
    case "none":
      return null;
    case "alert":
      const { title, message, buttons } = state;

      // Only support up to 3 buttons, similar to Android.
      // If buttons are undefined, add a default "OK" button.
      const validButtons =
        buttons != null
          ? buttons.slice(0, 3)
          : [
              {
                text: "OK",
              },
            ];

      return (
        <View style={styles.container}>
          <View style={styles.alert}>
            <Text style={styles.title}>{title}</Text>
            {message != null && <Text style={styles.message}>{message}</Text>}
            <View style={styles.buttonContainer}>
              {validButtons.map((btn, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.button}
                  onPress={() => dismissAndDo(btn.onPress)}
                >
                  <Text style={styles.buttonLabel}>{btn.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      );
  }
}

let hasInitialized = false;
function initIfNeeded() {
  if (hasInitialized) return;

  const alertDomRoot = document.createElement("div");
  alertDomRoot.id = "alert-root";
  document.body.appendChild(alertDomRoot);

  ReactDOM.render(<AlertComponent />, alertDomRoot);

  hasInitialized = true;
}
initIfNeeded();

const Alert: AlertStatic = {
  alert(
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions
  ) {
    alertEmitter.emit(AlertEvent.ShowAlert, title, message, buttons, options);
  },
  prompt(
    title: string,
    message?: string,
    callbackOrButtons?: ((text: string) => void) | AlertButton[],
    type?: AlertType,
    defaultValue?: string,
    keyboardType?: string
  ) {
    alertEmitter.emit(
      AlertEvent.ShowPrompt,
      title,
      message,
      callbackOrButtons,
      type,
      defaultValue,
      keyboardType
    );
  },
};

export default Alert;
