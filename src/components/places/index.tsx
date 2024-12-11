import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Place } from "../place";

import { colors } from '@/styles/theme';

import { style } from './styles';

type PlacesProps = {
  places: Place[];
}

export function Places({ places }: PlacesProps) {
  const dimensions = useWindowDimensions();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278, 
    max: dimensions.height - 128,
  };

  return(
    <BottomSheet 
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={style.indicator}
      backgroundStyle={style.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Place place={item} />}
        contentContainerStyle={style.content}
        ListHeaderComponent={() => (
          <Text style={style.title}>Explore locais perto de vocês</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}