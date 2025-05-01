import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.content,
    },
    header: {
      backgroundColor: theme.background,
      padding: 15,
      borderColor: '#b58e50',
      borderWidth: 2,
      borderRadius: 10,
      margin: 10,
    },
    headerContent: {
      flexDirection: 'column',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    headerTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    headerDates: {
      color: theme.text,
      fontSize: 16,
      marginLeft: 34,
    },
    headerIcons: {
      flexDirection: 'row',
      position: 'absolute',
      top: 20,
      right: 15,
    },
    headerIconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
      marginLeft: 10,
      
    },
    mainScrollView: {
      flex: 1,
      backgroundColor: theme.background,
    },
    imageContainer: {
      height: 300,
      width: '100%',
      position: 'relative',
    },
    roomImage: {
      width: '100%',
      height: '100%',
    },
    seeMoreOverlay: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    seeMoreText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    contentContainer: {
      padding: 16,
      backgroundColor: theme.content,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    roomTitle: {
      color: theme.text,
      fontSize: 24,
      fontWeight: 'bold',
      flex: 1,
    },
    ratingContainer: {
      alignItems: 'flex-end',
    },
    ratingBox: {
      backgroundColor: '#0066cc',
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    ratingScore: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    sectionContainer: {
      marginTop: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderInput,
    },
    sectionTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    priceContainer: {
      flexDirection: 'column',
    },
    priceText: {
      color: theme.text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    featuresContainer: {
      marginTop: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderInput,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    featureText: {
      color: theme.text,
      fontSize: 16,
      marginLeft: 10,
    },
    descriptionContainer: {
      marginTop: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderInput,
    },
    descriptionTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    descriptionText: {
      color: theme.text,
      fontSize: 16,
      lineHeight: 24,
    },
    bottomSpacer: {
      height: 80,
    },
    bookingButton: {
      backgroundColor: '#b58e50',
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginBottom: 40,
      marginTop: 8
    },
    bookingButtonWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.background,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: theme.borderInput,
    },
    bookingButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    // Modal styles
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    dateSelectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    dateSelection: {
      flex: 1,
      padding: 15,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      marginHorizontal: 5,
    },
    activeDateSelection: {
      backgroundColor: '#e0e0e0',
      borderColor: '#b58e50',
      borderWidth: 1,
    },
    dateSelectionLabel: {
      color: '#b58e50',
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    dateSelectionValue: {
      fontSize: 16,
      color: '#333',
    },
    datePicker: {
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      marginBottom: 20,
    },
    personSelection: {
      padding: 15,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      marginBottom: 20,
    },
    personSelectionLabel: {
      color: '#b58e50',
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    personInput: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    applyButton: {
      backgroundColor: '#b58e50',
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
    },
    applyButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });