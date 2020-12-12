import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import BodyText from "../BodyText";
import {
  DEFAULT_SPACING,
  DEFAULT_BORDER_RADIUS_SM,
  DEFAULT_FONT_SIZE,
} from "../../const/style";

export default function Input({
  styleOptions,
  label,
  value,
  onChangeText,
  keyboardType,
  disabled,
  RightSideComponent,
  numberOfLines,
  multiline,
  selectTextOnFocus,
  onFocus,
  onBlur,
  valueWhenBlurred,
  italic,
  errorMsg,
  secureTextEntry,
}) {
  const [textInputFocused, setTextInputFocused] = useState(false);

  const textInputRef = useRef();

  const handlePressOnDisabledTextInput = () => {
    showMessage({
      message: "Disabled field",
      description: `${label} cannot be edited.`,
      type: "warning",
    });
  };

  return (
    <View style={[styles.container, styleOptions?.container]}>
      <View style={{ flex: 1 }}>
        <View style={[styles.labelContainer, styleOptions?.labelContainer]}>
          <BodyText italic style={[styles.label, styleOptions?.label]}>
            {label}
          </BodyText>
        </View>
        {disabled ? (
          <TouchableWithoutFeedback onPress={handlePressOnDisabledTextInput}>
            <View
              style={[
                styles.textInput,
                styles.textInputDisabled,
                styleOptions?.textInput,
              ]}
            >
              <BodyText italic={italic}>{value}</BodyText>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View>
            <TextInput
              ref={textInputRef}
              style={[
                styles.textInput,
                textInputFocused && styles.textInputFocused,
                styleOptions?.textInput,
              ]}
              value={
                valueWhenBlurred && !textInputRef.current?.isFocused()
                  ? valueWhenBlurred
                  : value
              }
              onChangeText={onChangeText}
              onFocus={() => {
                setTextInputFocused(true);
                if (onFocus) onFocus();
              }}
              onBlur={() => {
                setTextInputFocused(false);
                if (onBlur) onBlur();
              }}
              keyboardType={keyboardType}
              returnKeyType="done"
              numberOfLines={numberOfLines}
              multiline={multiline}
              selectTextOnFocus={selectTextOnFocus}
              secureTextEntry={secureTextEntry}
            />
            {errorMsg && (
              <BodyText italic style={styles.errorMsg}>
                {errorMsg}
              </BodyText>
            )}
          </View>
        )}
      </View>
      {RightSideComponent && <RightSideComponent />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelContainer: {
    marginBottom: DEFAULT_SPACING * 0.25,
    paddingLeft: DEFAULT_SPACING * 0.4,
  },
  label: {
    fontSize: DEFAULT_FONT_SIZE * 1.2,
  },
  textInput: {
    fontFamily: "roboto",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
    paddingHorizontal: DEFAULT_SPACING * 0.5,
    paddingVertical: DEFAULT_SPACING * 0.5,
  },
  textInputFocused: {
    borderColor: "black",
  },
  textInputDisabled: {
    backgroundColor: "#ccc",
    borderColor: "#999",
  },
  errorMsg: {
    color: "red",
    marginTop: DEFAULT_SPACING * 0.25,
  },
});
