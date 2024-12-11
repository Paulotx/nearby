import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { colors } from '@/styles/theme';

import { style } from './styles';
import { IconTicket } from "@tabler/icons-react-native";

export type Place = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
}

type Props = TouchableOpacityProps & {
  place: Place;
}

export function Place({ place, ...rest }: Props) {
  return(
    <TouchableOpacity style={style.container} {...rest}>
      <Image source={{ uri: place.cover }} style={style.image}/>

      <View style={style.content}>
        <Text style={style.name}>{place.name}</Text>
        <Text style={style.description}>{place.description}</Text>

        <View style={style.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={style.tickets}>{place.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}