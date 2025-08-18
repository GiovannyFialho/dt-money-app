import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";

export function AuthHeader() {
  const keyboardIsVisible = useKeyboardVisible();

  const height = useRef(new Animated.Value(48)).current;
  const width = useRef(new Animated.Value(255)).current;
  const containerHeight = useRef(new Animated.Value(160)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: keyboardIsVisible ? 20 : 48,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(width, {
      toValue: keyboardIsVisible ? 106 : 255,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(containerHeight, {
      toValue: keyboardIsVisible ? 80 : 160,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [keyboardIsVisible]);

  return (
    <Animated.View
      className="w-full items-center justify-center"
      style={{ height: containerHeight }}
    >
      <Animated.Image
        source={require("@/assets/logo.png")}
        className="resize-contain"
        style={{ height, width }}
      />
    </Animated.View>
  );
}
