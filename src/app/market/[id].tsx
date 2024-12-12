import { useEffect, useState, useRef } from 'react';
import { Alert, View, Modal, ScrollView } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { router, useLocalSearchParams, Redirect } from 'expo-router';

import { api } from '@/services/api';

import { Button } from '@/components/button';
import { Loading } from '@/components/loading';
import { Cover } from '@/components/market/cover';
import { Coupon } from '@/components/market/coupon';
import { Details, DetailsProps } from '@/components/market/details';

type Data = DetailsProps & {
  cover: string;
}

export default function Market() {
  const [data, setData] = useState<Data>();
  const [coupon, setCoupon] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  const params = useLocalSearchParams<{ id: string }>();
  const [_, requestPermission] = useCameraPermissions();

  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);

      setData(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Não foi possível carregar os dados do local.', 
        [
          {
            text: 'Ok',
            onPress: () => router.back(),
          }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if(!granted) {
        return Alert.alert('Camera', 'Você precisa permitir o acesso à câmera para ler o QR Code.');
      }

      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert('Camera', 'Não foi possível utilizar a câmera.');

    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      const { data } = await api.patch("/coupons/" + id);

      Alert.alert('Cupom', data.coupon);

      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert('Cupom', 'Não foi possível utilizar o cupom.');
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert('Cupom', 'Você realmente deseja resgatar esse cupom?', [
      {
        text: 'Sim',
        onPress: () => getCoupon(id),
      },
      {
        text: 'Não',
        style: 'cancel',
      }
    ]);
  }

  if(isLoading) {
    return <Loading />
  }

  if(!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>     
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Cover uri={data.cover} />

        <Details data={data} />

        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView 
          facing='back' 
          style={{ flex: 1 }} 
          onBarcodeScanned={({ data }) => {
            if(data && !qrLock.current){
              qrLock.current = true;

              console.log('DATA', data);

              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />
        
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button 
            isLoading={couponIsFetching} 
            onPress={() => setIsVisibleCameraModal(false)}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}