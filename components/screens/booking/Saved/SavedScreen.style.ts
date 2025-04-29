import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.background,
    },
    content: {
        flex: 1,
        backgroundColor: theme.content,
        paddingTop: 20,
        paddingBottom: 20,
    },
    hotelItem: {
        backgroundColor:  theme.background,
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    hotelItemContent: {
        flexDirection: 'row',
        padding: 12,
    },
    hotelImageContainer: {
        width: 120,
        height: 100,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 12,
    },
    hotelImage: {
        width: '100%',
        height: '100%',
    },
    hotelInfo: {
        flex: 1,
        paddingRight: 8,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 8,
        paddingRight: 24,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingBox: {
        backgroundColor: '#0066cc',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    ratingScore: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationText: {
        color: '#666',
        fontSize: 14,
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: theme.borderInput,
        marginHorizontal: 12,
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 24,
    },
    browseButton: {
        backgroundColor: '#b58e50',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    browseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContent: {
        flexGrow: 1,
    },
});