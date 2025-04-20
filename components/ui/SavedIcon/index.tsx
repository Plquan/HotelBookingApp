import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import roomServices from '@/services/roomService';

interface SaveRoomProps {
  roomId: number;
  isSaved?: boolean;
  size?: number;
  color?: string;
  savedColor?: string;
  loadingColor?: string;
  style?: object;
}

const SaveRoom: React.FC<SaveRoomProps> = ({
  roomId,
  isSaved = false,
  size = 22,
  color = "white",
  savedColor = "#ff6b6b",
  loadingColor = "white",
  style = {}
}) => {
  const [saved, setSaved] = useState<boolean>(isSaved);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (isLoading) return; 
    
    try {
      setIsLoading(true);
      const res = await roomServices.saveRoom(roomId);
      setSaved(!saved);
      return res;
    } catch (error) {
      console.error('Error saving room:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.favoriteButton, style]} 
      onPress={handleSave}
      disabled={isLoading}
    >
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator 
            size={size} 
            color={loadingColor} 
            style={styles.loader} 
          />
        </View>
      ) : (
        <FontAwesome 
          name={saved ? "heart" : "heart-o"} 
          size={size} 
          color={saved ? savedColor : color} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
  
  }
});

export default SaveRoom;