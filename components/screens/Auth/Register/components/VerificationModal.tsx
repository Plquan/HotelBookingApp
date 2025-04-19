// VerificationModal.tsx
import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '@/components/ui/Button';

interface VerificationModalProps {
  visible: boolean;
  verificationCode: string;
  onChangeCode: (text: string) => void;
  onVerify: () => void;
  onResendCode: () => void;
  onClose: () => void;
  countdown: number;
  isResendDisabled: boolean;
  errorMessage: string | null;
  isVerifying: boolean;
  isResending: boolean;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  visible,
  verificationCode,
  onChangeCode,
  onVerify,
  onResendCode,
  onClose,
  countdown,
  isResendDisabled,
  errorMessage,
  isVerifying,
  isResending,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalContainer}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <FontAwesome name="times" size={20} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Xác thực tài khoản</Text>
                <Text style={styles.modalDescription}>
                  Vui lòng nhập mã xác thực 4 chữ số đã được gửi đến email của bạn
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.singleCodeInput, errorMessage ? styles.inputError : null]}
                    value={verificationCode}
                    onChangeText={(text) =>
                      onChangeCode(text.replace(/[^0-9]/g, '').slice(0, 4))
                    }
                    keyboardType="numeric"
                    maxLength={4}
                    placeholder="Nhập mã"
                    placeholderTextColor="#999"
                  />
                  {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  ) : null}
                </View>

                <CustomButton
                  title="Xác thực"
                  onPress={onVerify}
                  isLoading={isVerifying}
                  disabled={isVerifying}
                  style={styles.verifyButton}
                />

                <TouchableOpacity
                  style={[
                    styles.resendCodeButton,
                    (isResendDisabled || isResending) && styles.resendCodeButtonDisabled,
                  ]}
                  onPress={onResendCode}
                  disabled={isResendDisabled || isResending}
                >
                  {isResending ? (
                    <ActivityIndicator size="small" color="#B58E50" />
                  ) : (
                    <Text
                      style={[
                        styles.resendCodeText,
                        isResendDisabled && styles.resendCodeTextDisabled,
                      ]}
                    >
                      {isResendDisabled
                        ? `Gửi lại mã sau (${countdown}s)`
                        : 'Gửi lại mã'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#2a2a2a',
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
    color: '#fff',
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
    backgroundColor: '#fff',
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

export default VerificationModal;