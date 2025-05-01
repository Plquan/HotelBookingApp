import { Theme } from '@/providers/ThemeContext';
import { StyleSheet } from 'react-native';
export const createStyles = (theme: Theme) => StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      zIndex: 1,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    logo: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    logoText: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
      fontStyle: 'italic', // Add this line to make text italic
    },
    scrollView: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: theme.content,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 80,
    },
    content: {
      flex: 1,
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
      backgroundColor: theme.background,
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
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    countBoxRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    countControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countButton: {
      width: 35,
      height: 35,
      backgroundColor: '#b58e50',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    countButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    countDisplay: {
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    countText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
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
  
    lastMinuteSection: {
      marginTop: 10,
      marginBottom: 20,
    },
    lastMinuteTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginLeft: 10,
      marginBottom: 10,
    },
    lastMinuteScroll: {
      paddingLeft: 10,
    },
    lastMinuteCard: {
      width: 220,
      backgroundColor: theme.background,
      borderRadius: 10,
      marginRight: 10,
      overflow: 'hidden',
    },
    lastMinuteImage: {
      width: '100%',
      height: 180,
      resizeMode: 'cover',
    },
    infoContainer: {
      padding: 10,
    },
    hotelName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    distance: {
      fontSize: 12,
      color: '#ccc',
      marginBottom: 5,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    oldPrice: {
      fontSize: 12,
      color: '#999',
      textDecorationLine: 'line-through',
      marginRight: 5,
    },
    newPrice: {
      fontSize: 18,
      color: '#B58E50', 
      fontWeight: 'bold',
    },
  });