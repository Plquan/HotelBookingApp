import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';
const { width, height } = Dimensions.get('window');

export const createStyles = (theme: Theme) => StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: theme.content,
      height: height * 0.9,
      borderTopLeftRadius: 20,
  
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderInput,
    },
    closeButton: {
      padding: 5,
    },
    headerTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    helpButton: {
      padding: 5,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 0,
      marginBottom: 16,
      borderRadius: 8,
    },
    timeText: {
      color: theme.text,
      fontSize: 16,
      marginLeft: 12,
      fontWeight: 'bold',
    },
    confirmationContainer: {
      padding: 16,
      paddingBottom: 24,
    },
    confirmationStatus: {
      color: '#4CAF50',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    confirmationTitle: {
      color: theme.text,
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      lineHeight: 34,
      maxWidth:300
    },
    codeContainer: {
      backgroundColor: '#1a3320',
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#2d4d36',
    },
    codeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    codeLabel: {
      color: 'white',
      fontSize: 16,
      marginRight: 8,
    },
    codeValue: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
    },
    copyButton: {
      padding: 4,
    },
    roomsContainer: {
      padding: 16,
    },
    sectionTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    roomItem: {
      flexDirection: 'row',
      backgroundColor: theme.background,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      borderWidth:1,
      borderColor:theme.borderInput,
    },
    roomImage: {
      width: 100,
      height: 80,
      borderRadius: 6,
      backgroundColor:theme.borderInput,
    },
    roomInfo: {
      flex: 1,
      marginLeft: 12,
    },
    roomName: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    roomPrice: {
      color: '#b58e50',
      fontSize: 14,
      marginBottom: 4,
    },
    roomQuantity: {
      color: '#999',
      fontSize: 14,
    },
    bookingDetailsContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderInput,
      marginBottom: 16,
    },
    propertyHeader: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    propertyImage: {
      width: 80,
      height: 80,
      borderRadius: 4,
      backgroundColor: theme.content,
    },
    propertyInfo: {
      flex: 1,
      marginLeft: 12,
    },
    propertyName: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    propertyPrice: {
      color:theme.text,
      fontSize: 16,
    },
    bookingDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    bookingDetailText: {
      color: theme.text,
      fontSize: 16,
      marginLeft: 12,
    },
    totalPriceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.borderInput,
      marginTop: 16,
    },
    totalPriceLabel: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    totalPriceValue: {
      color: '#b58e50',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });