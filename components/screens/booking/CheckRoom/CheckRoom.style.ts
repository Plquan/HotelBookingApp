import { StyleSheet } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.content,
  },
  header: {
    backgroundColor: theme.background,
    padding: 15,
    borderColor: '#b58e50',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  headerContent: {
    flexDirection: 'column',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    color: theme.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerDates: {
    color: theme.text,
    fontSize: 16,
    marginLeft: 34,
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderInput,
  },
  filterText: {
    color: theme.text,
    marginLeft: 5,
    fontSize: 16,
  },
  totalCount: {
    color: theme.text,
    padding: 15,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
  hotelItem: {
    marginBottom: 5,
    backgroundColor: theme.content,
    padding: 10,

  },
  hotelItemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hotelImageContainer: {
    width: 160,
    marginRight: 12,
  },
  hotelImage: {
    width: '100%',
    height: 135,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 15,
    padding: 6,
    zIndex: 1,
  },
  hotelInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  hotelName: {
    color: theme.text,
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 30,
  },
  hostedByText: {
    color:theme.text,
    fontSize: 12,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingBox: {
    backgroundColor: '#0066cc',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 6,
  },
  ratingScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  ratingText: {
    color: '#ccc',
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: theme.text,
    marginLeft: 4,
    fontSize: 12,
  },
  roomTypeText: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
  },
  priceQuantityContainer: {
    marginTop: 8,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feesText: {
    color: '#ccc',
    fontSize: 12,
  },
  feesIncludedText: {
    color: '#ccc',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: theme.borderInput,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateSelection: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeDateSelection: {
    backgroundColor: '#e0e0e0',
    borderColor: '#b58e50',
    borderWidth: 1,
  },
  dateSelectionLabel: {
    color: '#b58e50',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateSelectionValue: {
    fontSize: 16,
    color: '#333',
  },
  datePicker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  personSelection: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  personSelectionLabel: {
    color: '#b58e50',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  personInput: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#b58e50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  bookingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconColor: {
    color: theme.text,
  }
});