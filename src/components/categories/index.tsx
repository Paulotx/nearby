import { FlatList } from "react-native";

import { Category } from "../category";
import { colors } from '@/styles/theme';

import { style } from './styles';

export type Category = {
  id: string;
  name: string;
}

type CategoriesPros = {
  selected: string;
  categories: Category[];
  onSelect: (category: string) => void;
}

export function Categories({ selected, categories, onSelect }: CategoriesPros) {
  return(
    <FlatList 
      data={categories} 
      keyExtractor={(category) => category.id} 
      renderItem={({ item }) => (
        <Category 
          name={item.name} 
          iconId={item.id}
          isSelected={item.id === selected}
          onPress={() => onSelect(item.id)}
        /> 
      )}
      horizontal
      contentContainerStyle={style.content}
      style={style.container}
      showsHorizontalScrollIndicator={false}
    />
      
  );
}