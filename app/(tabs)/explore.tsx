import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const [adults, setAdults] = useState('22');
  const [children, setChildren] = useState('2');

  // Danh sách phòng ví dụ
  const rooms = [
    {
      id: '1',
      name: 'LUXURY ROOM',
      price: '$320 / PER NIGHT',
      image: require('../../assets/images/room1.jpg'),
    },
    {
      id: '2',
      name: 'DELUXE ROOM',
      price: '$280 / PER NIGHT',
      image: require('../../assets/images/room1.jpg'),
    },
    {
      id: '3',
      name: 'SUPERIOR ROOM',
      price: '$250 / PER NIGHT',
      image: require('../../assets/images/room1.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/sky-logo-header.png')}
              style={styles.logo}
            />
            <TouchableOpacity>
              <FontAwesome name="bars" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={require('../../assets/images/banner.jpg')}
              style={styles.bannerImage}
            >
              <View style={styles.overlay}>
                <Text style={styles.bannerTitle}>Enjoy a Luxury Experience</Text>
                <Text style={styles.bannerSubtitle}>HOTELS & RESORTS</Text>
              </View>
            </ImageBackground>
          </View>

          {/* Booking Form */}
          <View style={styles.bookingContainer}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>ARRIVAL DATE</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  placeholder="Select date"
                />
                <FontAwesome name="calendar" size={20} color="gray" />
              </View>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>DEPARTURE DATE</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  placeholder="Select date"
                />
                <FontAwesome name="calendar" size={20} color="gray" />
              </View>
            </View>

            {/* Adults Input */}
            <View style={styles.countBox}>
              <Text style={styles.label}>ADULTS</Text>
              <TextInput
                style={styles.countInput}
                value={adults}
                onChangeText={setAdults}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>

            {/* Children Input */}
            <View style={styles.countBox}>
              <Text style={styles.label}>CHILDREN</Text>
              <TextInput
                style={styles.countInput}
                value={children}
                onChangeText={setChildren}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>CHECK AVAILABILITY</Text>
            </TouchableOpacity>
          </View>

          {/* OUR ROOMS SECTION */}
          <View style={styles.roomSection}>
            <Text style={styles.sectionTitle}>Our Rooms</Text>
            <Text style={styles.sectionDesc}>
              When you host a party or family reunion, the special celebrations
              let you streng then bonds with ...
            </Text>

            {/* Danh sách phòng */}
            <View style={styles.roomsList}>
              {rooms.map((room) => (
                <View key={room.id} style={styles.roomCard}>
                  <Image source={room.image} style={styles.roomImage} />
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.roomPrice}>{room.price}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333',
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },

  /* Banner */
  bannerContainer: {
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    borderRadius: 5,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },

  /* Booking Form */
  bookingContainer: {
    backgroundColor: '#444',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    color: '#b58e50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: '#888',
  },
  countBox: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  countInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 0,
  },
  button: {
    backgroundColor: '#b58e50',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /* OUR ROOMS */
  roomSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
  },
  roomsList: {
    // Nếu muốn grid 2 cột, có thể dùng flexDirection: 'row' + flexWrap: 'wrap'
  },
  roomCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  roomImage: {
    width: '100%',
    height: 200,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color: '#000',
  },
  roomPrice: {
    fontSize: 16,
    color: '#b58e50',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
