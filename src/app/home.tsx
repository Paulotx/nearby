import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

import { api } from '@/services/api';

import { Categories, type Category } from '@/components/categories';
 
export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");

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

  useEffect(() => {
    fetchCategories()
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Categories 
        selected={category} 
        categories={categories} 
        onSelect={setCategory}
      />
    </View>
  );
}