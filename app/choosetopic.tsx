// app/chooseTopics.tsx
"use client";

import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const TOPICS = [
  "Smart city",
  "Climate & AI",
  "Microplastics",
  "CO2 footprint",
  "Nanoplastic",
  "Climate change",
  "Electric vehicle",
  "Greenhouse",
  "Net zero emissions",
  "Carbon credit",
  "Mercury pollution",
  "Surprise me",
  "All",
];

export default function ChooseTopics() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (topic: string) => {
    setSelected((prev) => {
      const next = new Set(prev);

      if (topic === "All") {
        // tapping "All" toggles selecting or clearing every topic
        if (!prev.has("All")) {
          TOPICS.forEach((t) => next.add(t));
        } else {
          next.clear();
        }
      } else {
        // regular topic toggle
        if (next.has(topic)) {
          next.delete(topic);
        } else {
          next.add(topic);
        }
        // if any individual toggled off, also remove "All"
        if (next.has("All") && topic !== "All") {
          next.delete("All");
        }
      }

      return next;
    });
  };

  const handleNext = () => {
    router.push("/home");
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* push content down a bit */}
      <View className="h-24" />

      {/* Centered Header */}
      <View className="px-6 items-center mb-6">
        <Text className="text-2xl font-bold text-gray-800 text-center">
          What are you interested in?
        </Text>
        <Text className="mt-2 text-sm text-gray-600 text-center">
          Add or edit the topics you follow. Choose three or more.
        </Text>
      </View>

      {/* Pills Grid */}
      <ScrollView className="px-4 flex-1">
        <View className="flex-row flex-wrap justify-between">
          {TOPICS.map((topic) => {
            const isSel = selected.has(topic);
            return (
              <View key={topic} className="w-1/2 p-2">
                <TouchableOpacity
                  onPress={() => toggle(topic)}
                  className={`
                    flex-nowrap px-3 py-3 border rounded-full items-center
                    ${isSel
                      ? "bg-[#63CBB2] border-transparent"
                      : "bg-white border-gray-300"
                    }
                  `}
                >
                  <Text
                    numberOfLines={1}
                    className={`text-base font-medium ${
                      isSel ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View className="px-6 pb-12">
        <TouchableOpacity
          onPress={handleNext}
          disabled={selected.size < 3}
          className={`
            w-full py-4 rounded-full items-center
            ${selected.size >= 3 ? "bg-[#63CBB2]" : "bg-gray-300"}
          `}
        >
          <Text className="text-white font-semibold text-lg">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
