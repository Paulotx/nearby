import { Text, View } from 'react-native';
import { IconProps } from '@tabler/icons-react-native';

import { colors } from '@/styles/colors';

import { style } from './styles';

interface StepPros {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>
}

export const Step = ({ title, description, icon: Icon }: StepPros) => {
  return (
    <View style={style.container}>
      {Icon && <Icon size={32} color={colors.red.base}/>}

      <View style={style.details}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
    </View>
  );
}

