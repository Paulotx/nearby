import { Text, View } from 'react-native';
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native';

import { Step } from '../step';

import { style } from './styles';

export const Steps = () => {
  return (
    <View style={style.container}>
      <Text style={style.title}>Veja como funciona:</Text>

      <View style={style.content}>
        <Step 
          icon={IconMapPin}
          title="Encontre estabelecimentos" 
          description="Veja locais perto de você que são parceiros Nearby" 
        />
        <Step 
          icon={IconQrcode}
          title="Ative o cupom com QR Code" 
          description="Escaneie o código no estabelecimento para usar o beneficio"
        />
        <Step 
          icon={IconTicket}
          title="Garanta as vantagens perto de você" 
          description="Ative cupons onde estiver, em diferentes tipos de estabelecimentos" 
        />
      </View>
    </View>
  );
}

