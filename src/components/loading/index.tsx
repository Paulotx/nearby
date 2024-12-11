import { ActivityIndicator } from "react-native";

import { colors } from '@/styles/theme';

import { style } from './styles';

export function Loading() {
  return(
    <ActivityIndicator 
      size={32}
      color={colors.green.base} 
      style={style.container} 
    />
  );
}