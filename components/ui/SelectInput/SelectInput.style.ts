import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: theme.background,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      },
      valueText: {
        fontSize: 16,
        color: theme.text,
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
      },
      modalContainer: {
        backgroundColor: theme.content,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      },
      headerLine: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.text,
        textAlign: 'center',
        marginBottom: 16,
      },
      valueScrollView: {
        maxHeight: 280,
        marginBottom: 20,
      },
      valueScrollContent: {
        paddingVertical: 8,
      },
      optionItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginVertical: 4,
        backgroundColor: theme.background,
      },
      selectedOption: {
        backgroundColor: 'rgba(181, 142, 80, 0.15)', // Lighter gold color with opacity
        borderColor: '#B58E50',
        borderWidth: 1,
      },
      optionText: {
        fontSize: 16,
        color: theme.text,
        textAlign: 'center',
        fontWeight: '500',
      },
      selectedOptionText: {
        color: '#B58E50',
        fontWeight: '600',
      },
      deleteButton: {
        paddingVertical: 14,
        marginBottom: 12,
        borderRadius: 12,
        alignItems: 'center',
      },
      deleteText: {
        fontSize: 16,
        color: '#FF3B30',
        fontWeight: '600',
      },
      confirmButton: {
        backgroundColor: '#B58E50',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#B58E50',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
      confirmText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
      },
  });