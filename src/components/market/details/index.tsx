import { View, Text } from "react-native";

import { style } from './styles';
import { Info } from "../info";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

export type DetailsProps = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[]
}

type Props = {
  data: DetailsProps;
}

export function Details({ 
  data: {
    name,
    description,
    address,
    phone,
    coupons,
    rules
  }
}: Props) {
  return(
    <View style={style.container}>
      <Text style={style.name}>{name}</Text>
      <Text style={style.description}>{description}</Text>

      <View style={style.group}>
        <Text style={style.title}>Informações</Text>
        <Info icon={IconTicket} description={`${coupons} cupons disponíveis`}  />
        <Info icon={IconMapPin} description={address}  />
        <Info icon={IconPhone} description={phone}  />
      </View>

      <View style={style.group}>
        <Text style={style.title}>Regulamento</Text>
        {rules.map(rule => (
          <Text key={rule.id} style={style.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}