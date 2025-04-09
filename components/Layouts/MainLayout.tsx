import React from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Header />
          <View style={styles.content}>{children}</View>
  
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#333",
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  content: {
    flex: 1,
  },
});

export default MainLayout;