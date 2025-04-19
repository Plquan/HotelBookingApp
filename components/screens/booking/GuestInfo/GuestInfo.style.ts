import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor:'#222'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerBackButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  // New login button styles
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B58E50',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
    backgroundColor: '#2a2a2a',
  },
  loginButtonText: {
    color: '#B58E50',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  required: {
    color: '#ff6b6b',
  },
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    height: 50,
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    paddingHorizontal: 16,
    fontSize: 16,
    height: '100%',
    width: '100%',
  },
  checkCircle: {
    position: 'absolute',
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'limegreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeCircle: {
    position: 'absolute',
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPurpose: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  priceSection: {
    marginVertical: 20,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  taxInfo: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
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
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  bookingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});