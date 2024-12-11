import { 
  Text, 
  TextProps, 
  TouchableOpacity, 
  TouchableOpacityProps, 
  ActivityIndicator
} from "react-native";
import { IconProps as TablerIconPros } from "@tabler/icons-react-native";

import { colors } from '@/styles/theme';

import { style } from './styles';

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
}

function Button({ children, style: buttonStyle, isLoading = false, ...rest }: ButtonProps) {
  return(
    <TouchableOpacity 
      style={[style.container, buttonStyle]} 
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <ActivityIndicator size="small" color={colors.gray[100]} /> : children}
    </TouchableOpacity>
  );
}

function Title ({ children, ...rest }: TextProps) {
  return <Text style={style.title} {...rest}>{children}</Text>
}

type IconProps = {
  icon: React.ComponentType<TablerIconPros>
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button }