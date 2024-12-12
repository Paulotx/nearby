import { Text, View } from "react-native";
import { IconTicket } from "@tabler/icons-react-native";

import { colors } from "@/styles/theme";

import { style } from './styles';

type CouponProps = {
  code: string;
}

export function Coupon({ code }: CouponProps) {
  return(
    <View style={style.container}>
      <Text style={style.title}>Utilize esse cupom</Text>

      <View style={style.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={style.code}>{code}</Text>
      </View>
    </View>
  );
}