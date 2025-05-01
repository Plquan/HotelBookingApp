import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '90%',
      maxWidth: 340,
    },
    modalContent: {
      backgroundColor: theme.content,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 12,
      right: 12,
      padding: 8,
    },
    modalTitle: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 16,
      textAlign: 'center',
    },
    modalDescription: {
      color: '#bbb',
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 24,
      paddingHorizontal: 8,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 24,
    },
    singleCodeInput: {
      backgroundColor: theme.background,
      color: '#000',
      width: '100%',
      height: 50,
      borderRadius: 8,
      fontSize: 20,
      textAlign: 'center',
      letterSpacing: 5,
      fontWeight: '600',
    },
    inputError: {
      borderWidth: 1,
      borderColor: '#FF4141',
    },
    errorText: {
      color: '#FF4141',
      fontSize: 12,
      marginTop: 4,
      textAlign: 'center',
    },
    verifyButton: {
      width: '100%',
      marginBottom: 12,
    },
    resendCodeButton: {
      paddingVertical: 12,
      height: 44,
      justifyContent: 'center',
    },
    resendCodeText: {
      color: '#B58E50',
      fontSize: 14,
    },
    resendCodeButtonDisabled: {
      opacity: 0.6,
    },
    resendCodeTextDisabled: {
      color: '#999',
    },
  });
  