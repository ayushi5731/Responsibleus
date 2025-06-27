// app/index.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [showTerms, setShowTerms] = useState(false);

  // Show notification alert after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      Alert.alert(
        "ResponsibleUs Would Like To Send You Notifications",
        "These may include alerts, sounds and icon badges. These can be configured in Settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Allow" },
        ],
        { cancelable: true }
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show the Terms modal
  const handleContinue = () => setShowTerms(true);

  // After "I Accept", close modal and navigate to chooseTopics screen
  const handleAccept = () => {
    setShowTerms(false);
    router.push("/choosetopic");
  };

  return (
    <ImageBackground
      source={require("../assets/images/welcomescreenbg.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 bg-black/40">
        {/* Centered title & tags */}
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-4xl font-bold text-white text-center">
            ResponsibleUs
          </Text>
          <Text className="mt-2 text-base text-white text-center">
            The pulse of a sustainable world.
          </Text>
          <View className="mt-20 flex-row flex-wrap justify-center space-x-2">
            {[
              "Green finance",
              "Regenerative agriculture",
              "Climate & AI",
              "Sustainable urbanisation",
            ].map((tag) => (
              <View key={tag} className="px-3 py-1 mb-2">
                <Text className="text-xs text-white">{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Privacy notice */}
        <View className="px-6 mb-4">
          <Text className="text-[10px] text-white text-center">
            By continuing you agree to ResponsibleUs’s Privacy Policy and Terms
            of Service
          </Text>
        </View>

        {/* Continue button */}
        <View className="px-6 pb-20">
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-[#63CBB2] rounded-full w-full py-4 items-center"
          >
            <Text className="text-white font-semibold text-lg">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TERMS & PRIVACY MODAL */}
      <Modal
        visible={showTerms}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTerms(false)}
      >
        <View className="flex-1 bg-black/20 justify-end">
          <View className="bg-white rounded-t-2xl overflow-hidden pt-4">
            {/* Header bar */}
            <View className="flex-row justify-between items-center px-6 pb-2 border-b border-gray-200">
              <Text className="text-lg font-semibold text-gray-800">
                Terms & Privacy
              </Text>
              <TouchableOpacity onPress={() => setShowTerms(false)}>
                <Text className="text-gray-400 text-xl">×</Text>
              </TouchableOpacity>
            </View>

            {/* Scrollable content */}
            <ScrollView
              className="px-6"
              contentContainerStyle={{ paddingBottom: 24 }}
            >
              <Text className="mt-4 text-sm text-gray-700 mb-4">
                By accessing the ResponsibleUs app, you agree to our Terms of Use.
                ResponsibleUs is a platform for sustainable living tips and
                community collaboration. You must be 18+ to participate. Users
                agree to provide accurate information, respect community
                guidelines, and not misuse the platform.
              </Text>

              {/* THIS LINE now matches header size */}
              <Text className="text-lg font-semibold text-gray-800 mb-4">
                Your data is yours
              </Text>

              <Text className="text-sm text-gray-700 mb-4">
                Your data is handled in accordance with our Privacy Policy. We
                collect minimal personal information to personalize your
                experience and operate the platform securely. By continuing to
                use ResponsibleUs, you agree to any future updates to these
                policies. For questions, reach us at support@responsibleus.com.
              </Text>
            </ScrollView>

            {/* I Accept */}
            <View className="px-6 pb-12">
              <TouchableOpacity
                onPress={handleAccept}
                className="bg-[#63CBB2] rounded-full w-full py-4 items-center"
              >
                <Text className="text-white font-semibold text-lg">
                  I Accept
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}











