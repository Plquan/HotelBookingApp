import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { roomTypeAction } from '@/stores/roomTypeStore/roomTypeReducer';
import { AppDispatch, RootState } from '@/stores';
import { ICheckRoomData } from '@/interfaces/booking/IBookingType';
import { useDispatch, useSelector } from 'react-redux';
import SaveRoom from '@/components/ui/SavedIcon';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import CustomHeader from '@/components/ui/CustomHeader';

export default function SavedScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const {savedRoom, loading} = useSelector(
        (state: RootState) => state.roomTypeStore
    );

    useEffect(() => {
        dispatch(roomTypeAction.getListSavedRoom());
    }, [dispatch]);

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <FontAwesome name="heart-o" size={64} color="#666" />
            <Text style={styles.emptyText}>Chưa có phòng được lưu</Text>
            <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => router.push('/(booking)/findRoom')}
            >
                <Text style={styles.browseButtonText}>Khám phá phòng</Text>
            </TouchableOpacity>
        </View>
    );

    const renderRoomItem = ({ item }: { item: ICheckRoomData }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push(`/(booking)/roomDetail?id=${item.id}`)}
        >
            <View style={styles.hotelItem}>
                <View style={styles.hotelItemContent}>
                    <View style={styles.hotelImageContainer}>
                        <Image
                            source={{ 
                                uri: "https://currently-together-squid.ngrok-free.app/images/" + 
                                     (item.roomImages?.[0]?.url || 'default-image.jpg') 
                            }}
                            style={styles.hotelImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.hotelInfo}>
                        <SaveRoom 
                            roomId={item.id} 
                            isSaved={item.isSaved} 
                            style={styles.favoriteButton}
                        />
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.hotelName}>
                            {item.name}
                        </Text>
                        <View style={styles.ratingContainer}>
                            <View style={styles.ratingBox}>
                                <Text style={styles.ratingScore}>
                                    {item.price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.locationContainer}>
                            <MaterialIcons name="visibility" size={14} color="#666" />
                            <Text style={styles.locationText}>Hướng nhìn: view biển</Text>
                        </View>
                        <View style={styles.locationContainer}>
                            <MaterialIcons name="person" size={14} color="#666" />
                            <Text style={styles.locationText}>Số lượng: 5 người 1 phòng</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.divider} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <LoadingOverlayView visible={loading} text="Đang tải" />
            <StatusBar barStyle="light-content" backgroundColor="#1c1c1c" />
            
            {/* Using the new CustomHeader component */}
            <CustomHeader 
                title="Phòng đã lưu" 
                showBackButton={false}
            />

            <View style={styles.content}>
                <FlatList
                    data={savedRoom}
                    renderItem={renderRoomItem}
                    ListEmptyComponent={renderEmptyState}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#333',
    },
    content: {
        flex: 1,
        backgroundColor: '#222',
        paddingTop: 20,
        paddingBottom: 20,
    },
    hotelItem: {
        backgroundColor: '#333',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    hotelItemContent: {
        flexDirection: 'row',
        padding: 12,
    },
    hotelImageContainer: {
        width: 120,
        height: 100,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 12,
    },
    hotelImage: {
        width: '100%',
        height: '100%',
    },
    hotelInfo: {
        flex: 1,
        paddingRight: 8,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        paddingRight: 24,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingBox: {
        backgroundColor: '#0066cc',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    ratingScore: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationText: {
        color: '#666',
        fontSize: 14,
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#444',
        marginHorizontal: 12,
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 24,
    },
    browseButton: {
        backgroundColor: '#b58e50',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    browseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContent: {
        flexGrow: 1,
    },
});