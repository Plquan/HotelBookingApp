import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  content: {
    flex: 1,
    backgroundColor: '#222',
  },
  
  // Header styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#333',
    position: 'relative',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 16,
  },
  iconButton: {
    marginLeft: 20,
  },
  
   // Tab styles
   tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
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
    color: 'white',
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
    backgroundColor: '#333',
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
  tripLocation: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  tripDate: {
    color: '#aaa',
    fontSize: 14,
  },
  chevronIcon: {
    position: 'absolute',
    right: 16,
    bottom: 24,
  }
});