import { useEffect, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps'
import { Alert, Text, View } from 'react-native';

import { api } from '@/services/api';

import { Places } from '@/components/places';
import { type Place } from '@/components/place';
import { Categories, type Category } from '@/components/categories';
import { colors, fontFamily } from '@/styles/theme';

type Market = Place & {
  latitude: number;
  longitude: number;
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}
 
export default function Home() {
  const [category, setCategory] = useState("");
  const [places, setPlaces] = useState<Market[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");

      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.');
    }
  }

  // async function getCurrentLocation() {
  //   try {
  //     const { granted } = await Location.requestForegroundPermissionsAsync();

  //     if(granted) {
  //       const { coords } = await Location.getCurrentPositionAsync();

  //       console.log("COORDS", coords);
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async function fetchMarkets() {
    try {
      if(!category) return;

      const { data } = await api.get(`/markets/category/${category}`);

      setPlaces(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Locais', 'Não foi possível carregar os locais.');
    }
  }

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#CCC" }}>
      <Categories 
        selected={category} 
        categories={categories} 
        onSelect={setCategory}
      />

      <MapView style={{ flex: 1 }} initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
        <Marker 
          identifier='current' 
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout>
              <View style={{width: 100, height: 60}}>
                <Text 
                  style={{
                    fontSize: 14, 
                    color: colors.gray[600], 
                    fontFamily: fontFamily.medium
                  }}
                >
                  {place.name}
                </Text>
                <Text 
                  style={{
                    fontSize: 12, 
                    color: colors.gray[600], 
                    fontFamily: fontFamily.regular
                  }}
                >
                  {place.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places places={places} />
    </View>
  );
}