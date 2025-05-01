import { Theme } from '@/providers/ThemeContext';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) => StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    leftContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    titleContainer: {
      flex: 2,
      alignItems: 'center',
    },
    rightContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    backButton: {
      padding: 5,
    },
    backButtonColor: {
        color: theme.text,
    },
    emptyButton: {
      width: 34,
      height: 34,
    },
    headerTitle: {
      color: theme.text,
      fontSize: 15,
      fontWeight: 'bold',
    },
  });
  