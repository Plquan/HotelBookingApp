import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.content,
    },
    paymentIcon: {
      width: 45,
      height: 30,
      marginRight: 8,
      borderRadius: 4,
    },
    sectionContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderInput,
    },
    sectionTitle: {
      color: theme.text,
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    sectionSubtitle: {
      color: theme.text,
      fontSize: 16,
      marginBottom: 16,
    },
    paymentMethodItem: {
      padding: 16,
      borderWidth: 1,
      borderColor: theme.borderInput,
      borderRadius: 8,
      backgroundColor: theme.background,
    },
    paymentMethodItemSpace: {
      marginTop: 12,
    },
    selectedPaymentMethod: {
      borderColor: '#b58e50',
    },
    paymentMethodContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkboxContainer: {
      marginRight: 10,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: '#b58e50',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxSelected: {
      backgroundColor: '#b58e50',
    },
    paymentMethodIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ffffff20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    paymentMethodText: {
      color: theme.text,
      fontSize: 16,
    },
    termsContainer: {
      padding: 16,
      paddingBottom: 180,
    },
    termsTitle: {
      color: theme.text,
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    termItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    termText: {
      color: theme.text,
      fontSize: 16,
      marginLeft: 8,
      flex: 1,
    },
    termHighlight: {
      color: '#b58e50',
    },
    priceSection: {
      marginVertical: 20,
    },
    priceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    discountedPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    taxInfo: {
      fontSize: 14,
      color: '#999',
      marginTop: 4,
    },
    bookingButton: {
      backgroundColor: '#b58e50',
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginBottom: 40,
      marginTop: 8,
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
    webView: {
      flex: 1,
    },
    checkMarkColor:{
        color: theme.text
    },
    roomItemContainer: {
      flexDirection: 'row',
      backgroundColor: theme.background,
      borderRadius: 12,
      marginTop: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.borderInput,
    },
    
    roomImage: {
      width: 120,
      height: 120,
    },
    
    roomContent: {
      flex: 1,
      padding: 12,
    },
    
    roomMainInfo: {
      flex: 1,
    },
    
    roomName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    
    roomMetrics: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    
    roomMetricItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    
    metricText: {
      fontSize: 14,
      color: theme.text,
    },
    
    priceContainer: {
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.borderInput,
      paddingTop: 8,
    },
    
    priceLabel: {
      fontSize: 12,
      color: theme.text,
      marginBottom: 4,
    },
    
    priceText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#b58e50',
    },
    dateInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 6,
    },
    
    dateInfoText: {
      fontSize: 14,
      color: theme.text,
    },
  });