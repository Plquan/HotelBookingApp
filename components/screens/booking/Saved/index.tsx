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
  RefreshControl,
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
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './SavedScreen.style';
import {useTranslate} from '@/hooks/useTranslate';
export default function SavedScreen() {
    const t = useTranslate();
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const dispatch = useDispatch<AppDispatch>();
    const {savedRoom, loading} = useSelector(
        (state: RootState) => state.roomTypeStore
    );
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        dispatch(roomTypeAction.getListSavedRoom());
    }, [dispatch]);

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <FontAwesome name="heart-o" size={64} color="#666" />
            <Text style={styles.emptyText}>{t("00062")}</Text>
            <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => router.push('/(booking)/findRoom')}
            >
                <Text style={styles.browseButtonText}>{t("00063")}</Text>
            </TouchableOpacity>
        </View>
    );
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(roomTypeAction.getListSavedRoom()).finally(() => {
          setRefreshing(false);
        });
      }, [dispatch]);
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
                title={t("00061")}
                showBackButton={false}
            />

            <View style={styles.content}>
                <FlatList
                    data={savedRoom}
                    renderItem={renderRoomItem}
                    ListEmptyComponent={renderEmptyState}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                />
            </View>
        </SafeAreaView>
    );
}

