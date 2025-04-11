import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Dimensions,
  StatusBar,
  GestureResponderEvent,
  PanResponder,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
const imageSize = width / 2 - 12; // 2 images per row with some padding

const GalleryModal = ({ visible, images, onClose, imageBaseUrl }: { visible: boolean; images: { url: string }[]; onClose: () => void; imageBaseUrl: string }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [panPosition] = useState(new Animated.ValueXY());
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Pan responder for swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Move image with finger
      panPosition.setValue({ x: gestureState.dx, y: 0 });
      
      // Determine swipe direction
      if (gestureState.dx > 20) {
        setSwipeDirection('right');
      } else if (gestureState.dx < -20) {
        setSwipeDirection('left');
      } else {
        setSwipeDirection(null);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Reset animation position
      Animated.spring(panPosition, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
      
      // If swiped far enough in either direction, change image
      if (gestureState.dx > 100 && selectedImage !== null && selectedImage > 0) {
        // Swiped right - go to previous image
        setSelectedImage(selectedImage - 1);
      } else if (gestureState.dx < -100 && selectedImage !== null && selectedImage < images.length - 1) {
        // Swiped left - go to next image
        setSelectedImage(selectedImage + 1);
      }
      
      setSwipeDirection(null);
    }
  });

  // Function to render each image item in the grid
  const renderImageItem = ({ item, index }: { item: { url: string }; index: number }) => (
    <TouchableOpacity 
      style={styles.imageItem} 
      onPress={() => setSelectedImage(index)}
    >
      <Image 
        source={{ uri: imageBaseUrl + item.url }} 
        style={styles.gridImage} 
        resizeMode="cover" 
      />
    </TouchableOpacity>
  );

  // Handle navigation between images
  const goToPreviousImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const goToNextImage = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  // Function to render full screen image viewer
  const renderFullScreenImage = () => {
    if (selectedImage === null) return null;
    
    return (
      <Modal visible={selectedImage !== null} transparent={true} animationType="fade">
        <View style={styles.fullScreenContainer} {...panResponder.panHandlers}>
          <TouchableOpacity 
            style={styles.closeFullScreenButton}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          
          {/* Navigation arrows */}
          {selectedImage > 0 && (
            <TouchableOpacity 
              style={[styles.navigationArrow, styles.leftArrow]}
              onPress={goToPreviousImage}
            >
              <Ionicons name="chevron-back" size={40} color="white" />
            </TouchableOpacity>
          )}
          
          {selectedImage < images.length - 1 && (
            <TouchableOpacity 
              style={[styles.navigationArrow, styles.rightArrow]}
              onPress={goToNextImage}
            >
              <Ionicons name="chevron-forward" size={40} color="white" />
            </TouchableOpacity>
          )}

          {/* Swipe indicators */}
          {swipeDirection === 'left' && (
            <View style={styles.swipeIndicatorRight}>
              <Ionicons name="chevron-forward" size={36} color="white" />
            </View>
          )}
          
          {swipeDirection === 'right' && (
            <View style={styles.swipeIndicatorLeft}>
              <Ionicons name="chevron-back" size={36} color="white" />
            </View>
          )}
          
          {/* Animated image */}
          <Animated.View style={{ transform: [{ translateX: panPosition.x }] }}>
            <Image 
              source={{ uri: imageBaseUrl + images[selectedImage]?.url }} 
              style={styles.fullScreenImage} 
              resizeMode="contain" 
            />
          </Animated.View>
          
          {/* Image counter and helper text */}
          <View style={styles.bottomControls}>
            <Text style={styles.imageCounter}>{selectedImage + 1} / {images.length}</Text>
            <Text style={styles.swipeHelper}>Vuốt để xem ảnh khác</Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#222" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hình ảnh</Text>
          <View style={{ width: 40 }} />
        </View>
        
        {/* Image Grid */}
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => `image-${index}`}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
        
        {/* Fullscreen Image Viewer */}
        {renderFullScreenImage()}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gridContainer: {
    padding: 8,
  },
  imageItem: {
    margin: 4,
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeFullScreenButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width,
    height: height * 0.7,
  },
  navigationArrow: {
    position: 'absolute',
    top: '50%',
    marginTop: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  leftArrow: {
    left: 20,
  },
  rightArrow: {
    right: 20,
  },
  swipeIndicatorLeft: {
    position: 'absolute',
    left: 20,
    top: '50%',
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(181, 142, 80, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  swipeIndicatorRight: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(181, 142, 80, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  imageCounter: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  swipeHelper: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  }
});

export default GalleryModal;