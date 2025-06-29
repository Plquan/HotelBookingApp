import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.content,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 1,
      backgroundColor: theme.content
    },
    backButton: { padding: 5 },
    headerTitle: { color: theme.text, fontSize: 16, fontWeight: 'bold' },
    helpButton: { padding: 5 },
    content: { flex: 1, backgroundColor: theme.content },
    statusContainer: { padding: 16, paddingBottom: 24 },
    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: 8,
    },
    statusBadgeText: { fontSize: 13, fontWeight: '500' },
    bookingTitle: {
      color: theme.text,
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      lineHeight: 34,
    },
    codeContainer: {
      backgroundColor: '#1a3320',
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#2d4d36',
    },
    codeRow: { flexDirection: 'row', alignItems: 'center' },
    codeLabel: { color: 'white', fontSize: 16, marginRight: 8 },
    codeValue: { color: 'white', fontSize: 16, fontWeight: 'bold', flex: 1 },
    copyButton: { padding: 4 },
    roomsContainer: { padding: 16 },
    sectionTitle: { color: theme.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.background,
      borderRadius: 8,
      marginBottom: 16,
    },
    timeText: { color: theme.text, fontSize: 16, marginLeft: 12, fontWeight: 'bold' },
    roomItem: {
      flexDirection: 'row',
      backgroundColor: theme.background,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.borderInput,
    },
    roomImage: { width: 100, height: 80, borderRadius: 6, backgroundColor: '#444' },
    roomInfo: { flex: 1, marginLeft: 12 },
    roomName: { color: theme.text, fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    roomPrice: { color: '#b58e50', fontSize: 14, marginBottom: 4 },
    separator: { height: 1, backgroundColor: theme.borderInput, marginHorizontal: 16, marginTop: 16 },
    footerContainer: {
      padding: 16,
      backgroundColor: theme.background,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.borderInput,
    },
    footerText: { color: theme.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    paymentDetails: { gap: 12 },
    paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    paymentLabel: { color: '#999', fontSize: 14 },
    paymentValue: { color: theme.text, fontSize: 14, fontWeight: '500' },
    totalRow: { marginTop: 16, borderTopWidth: 1, borderTopColor: theme.borderInput, paddingTop: 16 },
    totalLabel: { color: theme.text, fontSize: 16, fontWeight: 'bold' },
    totalValue: { color: '#b58e50', fontSize: 18, fontWeight: 'bold' },
    cancelButtonContainer: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    cancelButton: {
      backgroundColor: '#FF3B30',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  