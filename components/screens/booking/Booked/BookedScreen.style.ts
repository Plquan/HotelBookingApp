import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    backgroundColor: theme.content,
  },
  
  // Header styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.background,
    position: 'relative',
  },
  headerTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '500',
  },
   // Tab styles
   tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.content,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop:20
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(238, 191, 128, 0.15)',
    borderWidth: 1,
    borderColor: '#b58e50',
  },
  tabText: {
    color: theme.text,
    fontWeight:500,
    fontSize: 14,
  },
  activeTabText: {
    color: '#b58e50',
    fontWeight:500,
    fontSize: 14,
  },
  
  // Trip card styles
  tripCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.background,
  },
  tripImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  tripDetails: {
    padding: 16,
    paddingRight: 40,
  },
  tripDate: {
    color: theme.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  chevronIcon: {
    position: 'absolute',
    right: 16,
    bottom: 24,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tripInfo: {
    flex: 1,
  }
});