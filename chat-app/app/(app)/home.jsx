import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const home = () => {
    const router = useRouter();
  
  return (
    <View className="flex-1 justify-center items-center">
      <Text>home // redirect to sign in checking page </Text>
    <TouchableOpacity>
      <Text onPress={() => router.push("/signIn")}>Go to Sign In</Text>
    </TouchableOpacity>
 
        </View>

  )
}

export default home