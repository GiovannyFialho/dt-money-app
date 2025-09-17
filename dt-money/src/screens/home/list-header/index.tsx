import { ScrollView, View } from "react-native";

import { AppHeader } from "@/components/app-header";

export function ListHeader() {
  return (
    <>
      <AppHeader />

      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute h-[141] pl-6"
        ></ScrollView>
      </View>
    </>
  );
}
