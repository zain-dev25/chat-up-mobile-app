import { AntDesign, Octicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/authContext";
import { router } from "expo-router";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [profile, setProfile] = useState("");
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!username || !email || !password || !profile) {
      Alert.alert("Sign Up", "Please fill all fields");
      return;
    }
   
    await register(email, password, username, profile );
    setUsername("");
    setEmail("");
    setPassword("");
    setProfile("");

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
            className="font-serif font-medium text-[#111] mb-1"
            style={{ fontSize: hp(3) }}
          >
            Create Account
          </Text>
          <Text className="text-[13px] text-[#888]">
            Sign up to get started
          </Text>
        </View>

        {/* Fields */}
        <View className="gap-4" style={{ marginBottom: hp(2) }}>
          <View className="gap-1">
            <Text className="text-[11px] font-semibold text-[#888] uppercase tracking-wider">
              User Name
            </Text>
            <View
              className="flex-row items-center bg-[#f5f4f1] border-0.5 border-[#d0cfc8] rounded-[10px] px-3.5"
              style={{ height: 44 }}
            >
              <Octicons name="person" size={16} color="#888" />
              <TextInput
                className="flex-1 ml-2 text-[14px] text-[#111]"
                placeholder="Enter your username"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          </View>

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
          </View>

          <View className="gap-1">
            <Text className="text-[11px] font-semibold text-[#888] uppercase tracking-wider">
              Image URL
            </Text>
            <View
              className="flex-row items-center bg-[#f5f4f1] border-0.5 border-[#d0cfc8] rounded-[10px] px-3.5"
              style={{ height: 44 }}
            >
              <Octicons name="image" size={16} color="#888" />
              <TextInput
                className="flex-1 ml-2 text-[14px] text-[#111]"
                placeholder="Enter image URL"
                placeholderTextColor="#aaa"
                value={profile}
                onChangeText={setProfile}
              />
            </View>
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          className="bg-[#111] rounded-[10px] h-[44px] items-center justify-center mb-4"
          onPress={handleRegister}
        >
          <View className="flex-row items-center">
            <Text className="text-white text-[14px] font-semibold mr-2">
              Sign Up
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
        <TouchableOpacity onPress={() => router.push("/signIn")}>
          <Text className="text-center text-[12px] text-[#888]">
            Already have an account?{" "}
            <Text className="text-[#111] font-semibold">Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
