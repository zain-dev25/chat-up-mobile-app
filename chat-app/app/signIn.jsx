import { Octicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/authContext";
import { router } from "expo-router";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (email && password) await login(email, password);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-300 items-center justify-center"
      style={{ padding: wp(5) }}
    >
      <StatusBar style="dark" />
      <View
        className="w-full max-w-[420px] bg-white rounded-[20px] border-0.5 border-[#e0dfd8]"
        style={{ padding: wp(6) }}
      >
        {/* Header */}
        <View style={{ marginBottom: hp(2.5) }}>
          <Text
            className="font-serif font-bold text-center text-[#111] mb-1 "
            style={{ fontSize: hp(2.5), lineHeight: hp(3) }}
          >
            Chat UP!
          </Text>
          <Text className="text-[11px] text-center text-[#888]">
            Sign in to continue to your account
          </Text>
        </View>

        {/* Fields */}
        <View className="gap-4" style={{ marginBottom: hp(2) }}>
          <View className="gap-1">
            <Text className="text-[11px] font-semibold text-[#888] uppercase tracking-wider">
              EMAIL
            </Text>
            <View
              className="flex-row items-center bg-[#f5f4f1] border-0.5 border-[#d0cfc8] rounded-[10px] px-3.5"
              style={{ height: 44 }}
            >
              <Octicons name="mail" size={16} color="#888" />
              <TextInput
                className="flex-1 ml-2 text-[14px] text-[#111]"
                placeholder="you@example.com"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View className="gap-1">
            <Text className="text-[11px] font-semibold text-[#888] uppercase tracking-wider">
              PASSWORD
            </Text>
            <View
              className="flex-row items-center bg-[#f5f4f1] border-0.5 border-[#d0cfc8] rounded-[10px] px-3.5"
              style={{ height: 44 }}
            >
              <Octicons name="lock" size={16} color="#888" />
              <TextInput
                className="flex-1 ml-2 text-[14px] text-[#111]"
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <TouchableOpacity className="self-end mt-1">
              <Text className="text-[12px] text-[#888]">Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          className="bg-[#111] rounded-[10px] h-[44px] items-center justify-center mb-4"
          onPress={handleLogin}
        >
          <View className="flex-row items-center">
            <Text className="text-white text-[14px] font-semibold mr-2">
              Sign in
            </Text>
            <Octicons name="arrow-right" size={16} color="white" />
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center gap-2.5 mb-4">
          <View className="flex-1 h-0.5 bg-[#e0dfd8]" />
          <Text className="text-[12px] text-[#bbb]">or</Text>
          <View className="flex-1 h-0.5 bg-[#e0dfd8]" />
        </View>

        {/* Google */}
        <TouchableOpacity className="flex-row items-center justify-center gap-2 border-0.5 border-[#d0cfc8] rounded-[10px] h-[42px] mb-5">
          <AntDesign name="google" size={24} color="black" />
          <Text className="text-[13px] font-medium text-[#111]">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <TouchableOpacity onPress={() => router.push("/signUp")}>
          <Text className="text-center text-[12px] text-[#888]">
            No account?{" "}
            <Text className="text-[#111] font-semibold">Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
