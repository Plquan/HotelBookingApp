import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.content,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: theme.content,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginVertical: 20,
      gap: 20,
    },
    titleImage: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    logoText: {
      color: theme.borderInput,
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: 2,
      fontStyle: 'italic',
    },
    inputContainer: {
      position: 'relative',
      marginBottom: 15,
    },
    input: {
      backgroundColor: theme.background,
      color: theme.text,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      borderWidth: 1,
      borderColor: theme.borderInput,
    },
    eyeIcon: {
      position: 'absolute',
      right: 16,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
    forgotPasswordContainer: {
      alignSelf: 'flex-end',
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: '#b58E50',
      fontSize: 14,
    },
    loginButton: {
      backgroundColor: '#B58E50',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme.borderInput,
    },
    dividerText: {
      color: '#888',
      paddingHorizontal: 10,
      fontSize: 14,
    },
    registerButton: {
      borderWidth: 1,
      borderColor: '#b58E50',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
    },
    registerButtonText: {
      color: '#b58E50',
      fontSize: 16,
      fontWeight: '500',
    },
  });
