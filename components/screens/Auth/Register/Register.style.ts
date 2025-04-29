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
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginVertical: 20,
      gap: 12,
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
    registerButton: {
      marginTop: 20,
      marginBottom: 20,
    },
  });