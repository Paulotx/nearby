import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

import { api } from '@/services/api';

import { Places } from '@/components/places';
import { type Place } from '@/components/place';
import { Categories, type Category } from '@/components/categories';

type Market = Place & {}
 
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

      <Places places={places} />
    </View>
  );
}