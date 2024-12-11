import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const style = StyleSheet.create({
  container: {
    maxHeight: 36,
    position: "absolute",
    zIndex: 1,
    top: 32,
  },
  content: {
    gap: 8,
    paddingHorizontal: 24,
  },
});
