import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Full Name"
      />

      <TextInput 
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          // Add register logic here
          router.back();
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// ...existing styles...
// Replace // ...existing styles... with:
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 10,
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
    },
    linkButton: {
      marginTop: 15,
    },
    linkText: {
      color: '#007AFF',
      textAlign: 'center',
    },
  });