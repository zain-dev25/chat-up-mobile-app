import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../context/userContext.js";
import { useAuth } from "../../context/authContext.js";
import { Image } from "expo-image";

const home = () => {
  const router = useRouter();
  const { userInfo, loadingUserInfo } = useUser();
  const { logout } = useAuth();
  console.log("Home user info:", userInfo);
  console.log("Home loadingUserInfo:", loadingUserInfo);
  console.log("Home profile:", userInfo?.profile);
  const logoutFun = async () => {
    await logout();
    router.replace("/signIn");
  };
  if (loadingUserInfo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading user info...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">
        Welcome, {userInfo?.username || "Guest"}!
      </Text>
      {userInfo?.email && (
        <>
          <View className="flex-row items-center mt-4 gap-0">
            <View
              className="rounded-full mr-2  border-gray-300 w-18 p-0 "
            >
              <Image
                source={userInfo? userInfo.profile: "https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"}
                style={{ width: 150, height: 200 }}
                className="rounded-full"
              />
            </View>
            <View className="ml-0">
              <Text className="text-gray-600">
                Username: {userInfo?userInfo.username: "N/A"}
              </Text>
              <Text className="text-gray-600">Email: {userInfo?.email}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={logoutFun}>
            <Text className="border bg-black text-white m-5 px-5 py-2 rounded shadow-sm">
              Logout
            </Text>
          </TouchableOpacity>
        </>
      )}
      {/* Yahan aur bhi user info display kar sakte hain, jaise profile picture ya doosri details */}
    </View>
  );
};

export default home;
