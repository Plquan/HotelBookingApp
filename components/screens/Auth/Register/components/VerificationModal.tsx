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
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './VerificationModal.style';
import { useTranslate } from '@/hooks/useTranslate';

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
  const t = useTranslate();
  const { theme } = useTheme();
  const styles = createStyles(theme);
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

                <Text style={styles.modalTitle}>{t("00010")}</Text>
                <Text style={styles.modalDescription}>
                {t("00011")}
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
                    placeholder={t("00012")}
                    placeholderTextColor="#999"
                  />
                  {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  ) : null}
                </View>

                <CustomButton
                  title={t("00013")}
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
                        ? t("00015") + `(${countdown}s)`
                        : t("00014")}
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


export default VerificationModal;