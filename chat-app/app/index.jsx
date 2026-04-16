import { ActivityIndicator, Text, View } from "react-native";
import "../global.css";


export default function StartPage() {
  return (
    
   <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg font-bold text-center">zain project is working...</Text>
    </View>
  );
}
