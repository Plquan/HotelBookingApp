// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';

// export default function SavedScreen() {
//   const savedRooms = []; // TODO: Replace with your saved rooms data

//   const renderEmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <FontAwesome name="heart-o" size={64} color="#666" />
//       <Text style={styles.emptyText}>Chưa có phòng được lưu</Text>
//       <TouchableOpacity 
//         style={styles.browseButton}
//         onPress={() => router.push('/(booking)/checkRoom')}
//       >
//         <Text style={styles.browseButtonText}>Khám phá phòng</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderRoomItem = ({ item:any }) => (
//     <TouchableOpacity 
//       style={styles.roomCard}
//       onPress={() => router.push(`/(booking)/roomDetail?id=${item.id}`)}
//     >
//       <Image
//         source={{ uri: 'https://currently-together-squid.ngrok-free.app/images/' + item.roomImages[0].url }}
//         style={styles.roomImage}
//       />
//       <View style={styles.roomInfo}>
//         <Text style={styles.roomName} numberOfLines={2}>
//           {item.name}
//         </Text>
//         <View style={styles.locationRow}>
//           <MaterialIcons name="location-on" size={14} color="#666" />
//           <Text style={styles.locationText}>{item.view}</Text>
//         </View>
//         <Text style={styles.priceText}>
//           {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
//         </Text>
//       </View>
//       <TouchableOpacity 
//         style={styles.favoriteButton}
//         onPress={() => {/* Handle remove from favorites */}}
//       >
//         <FontAwesome name="heart" size={22} color="#ff6b6b" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#222" />
      
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Phòng đã lưu</Text>
//       </View>

//       <FlatList
//         data={savedRooms}
//         renderItem={renderRoomItem}
//         ListEmptyComponent={renderEmptyState}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.listContent}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#222',
//   },
//   header: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   listContent: {
//     padding: 16,
//     flexGrow: 1,
//   },
//   roomCard: {
//     backgroundColor: '#333',
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//   },
//   roomImage: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#444',
//   },
//   roomInfo: {
//     padding: 16,
//   },
//   roomName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 8,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   locationText: {
//     color: '#666',
//     marginLeft: 4,
//     fontSize: 14,
//   },
//   priceText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#b58e50',
//   },
//   favoriteButton: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 8,
//     borderRadius: 20,
//   },
//   emptyContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 40,
//   },
//   emptyText: {
//     color: '#666',
//     fontSize: 16,
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   browseButton: {
//     backgroundColor: '#b58e50',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   browseButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });