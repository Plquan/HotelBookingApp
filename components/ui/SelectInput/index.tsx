import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './SelectInput.style';

interface SelectInputProps {
  value: number;
  maxValue: number;
  onValueChange: (value: number) => void;
  label?: string;
}

export default function SelectInput({ value, maxValue, onValueChange, label = "phòng" }: SelectInputProps) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const { theme } = useTheme();


  const [animation] = useState(new Animated.Value(0));
  const [modalAnimation] = useState(new Animated.Value(0));
  
  const styles = createStyles(theme);
  
  const animatingRef = useRef(false);

  const showModal = () => {
    setVisibleModal(true);
    animatingRef.current = true;
    
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(modalAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => {
      animatingRef.current = false;
    });
  };

  // Hide animation
  const hideModal = () => {
    if (animatingRef.current) return;
    
    animatingRef.current = true;
    
    // Fade out overlay and slide down modal
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setVisibleModal(false);
      animatingRef.current = false;
    });
  };
  
  const handleSelect = () => {
    onValueChange(tempValue);
    hideModal();
  };
  
  const handleDelete = () => {
    setTempValue(0);
    onValueChange(0);
    hideModal();
  };
  
  const handleValueChange = (newValue: number) => {
    setTempValue(newValue);
  };
  
  const displayText = value === 0 ? "Chọn" : `${value} ${label}`;
  
  // Animation styles
  const overlayStyle = {
    opacity: animation,
  };
  
  const modalStyle = {
    transform: [
      {
        translateY: modalAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
    opacity: modalAnimation,
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setTempValue(value);
          showModal();
        }}
      >
        <Text style={styles.valueText}>{displayText}</Text>
        <FontAwesome5 name="chevron-down" size={12} color="#999" />
      </TouchableOpacity>
      
      <Modal
        visible={visibleModal}
        transparent={true}
        animationType="none"
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <Animated.View 
            style={[styles.overlay, overlayStyle]}
          >
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <Animated.View style={[styles.modalContainer, modalStyle]}>
                <View style={styles.headerLine} />
                <Text style={styles.modalTitle}>Chọn số lượng</Text>
                
                <ScrollView
                  style={styles.valueScrollView}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.valueScrollContent}
                >
                  {Array.from({ length: maxValue }, (_, i) => {
                    const optionValue = i + 1;
                    return (
                      <TouchableOpacity
                        key={optionValue}
                        style={[styles.optionItem, tempValue === optionValue && styles.selectedOption]}
                        onPress={() => handleValueChange(optionValue)}
                      >
                        <Text style={[styles.optionText, tempValue === optionValue && styles.selectedOptionText]}>
                          {`${optionValue} ${label}`}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                >
                  <Text style={styles.deleteText}>Xóa</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleSelect}
                >
                  <Text style={styles.confirmText}>Chọn</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
