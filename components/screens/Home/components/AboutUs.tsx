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

const AboutUs = () => {

    return (
        <View style={styles.container}>
        {/* Cột Trái: Nội dung Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Về chúng tôi</Text>
          <View style={styles.line} />
          <Text style={styles.description}>
          Khách sạn chúng tôi mang đến không gian sang trọng, tiện nghi hiện đại và dịch vụ đẳng cấp, giúp bạn tận hưởng kỳ nghỉ trọn vẹn.
        </Text>
        </View>
  
        {/* Cột Phải: Hình ảnh chồng lên nhau */}
        <View style={styles.imageContainer}>
          <Image
            source={ require('../../../assets/images/room1.jpg') }
            style={[styles.image, styles.imageTop]}
          />
          <Image
            source={ require('../../../assets/images/room1.jpg') }
            style={[styles.image, styles.imageMiddle]}
          />
          <Image
            source={ require('../../../assets/images/room1.jpg') }
            style={[styles.image, styles.imageBottom]}
          />
        </View>
      
      </View>
    )
}


const styles = StyleSheet.create({ 
    container: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 20,
      },
      textContainer: {
        flex: 1,
        paddingRight: 20,
        justifyContent: 'center',
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
      },
      line: {
        width: 50,
        height: 2,
        backgroundColor: '#d4a373',
        marginVertical: 10,
      },
      description: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 15,
      },
      imageContainer: {
        flex: 1,
        position: 'relative',
        height: 200, // Đặt chiều cao cho container để định vị hình ảnh tuyệt đối
        justifyContent: 'center',
      },
      image: {
        width: 150,
        height: 100,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: '#fff',
      },
      imageTop: {
        position: 'absolute',
        top: 0,
        right: 20,
      },
      imageMiddle: {
        position: 'absolute',
        top: 50,
        right: 0,
      },
      imageBottom: {
        position: 'absolute',
        top: 100,
        right: 20,
      },
    


})