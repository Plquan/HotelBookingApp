import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useTranslate } from '@/hooks/useTranslate';

interface DatePickerProps {
  fromDate: Date;
  toDate: Date;
  onFromDateChange: (date: Date) => void;
  onToDateChange: (date: Date) => void;
  personCount: number;
  onPersonCountChange: (count: number) => void;
  modalTitle?: string;
  applyButtonText?: string;
  onApply?: () => void;
  displayFormat?: string;
  showPersonSelection?: boolean;
  headerStyle?: object;
  dateTextStyle?: object;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  personCount,
  onPersonCountChange,
  modalTitle = 'Chọn ngày',
  applyButtonText = 'ÁP DỤNG THAY ĐỔI',
  onApply,
  displayFormat = "d 'thg' M",
  showPersonSelection = true,
  headerStyle,
  dateTextStyle,
}) => {
  const t = useTranslate();
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);

  const toggleDatePickerModal = () => {
    setShowDatePickerModal(!showDatePickerModal);
  };

  const toggleArrivalPicker = () => {
    setShowArrivalPicker(!showArrivalPicker);
    setShowDeparturePicker(false);
  };

  const toggleDeparturePicker = () => {
    setShowDeparturePicker(!showDeparturePicker);
    setShowArrivalPicker(false);
  };

  const onChangeArrival = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) onFromDateChange(selectedDate);
  };

  const onChangeDeparture = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) onToDateChange(selectedDate);
  };

  const formatDateRange = () => {
    return `${format(fromDate, displayFormat)} - ${format(toDate, displayFormat)}`;
  };

  const handleApply = () => {
    if (onApply) {
      onApply();
    }
    toggleDatePickerModal();
  };

  const decrementPersonCount = () => {
    const currentCount = personCount;
    if (currentCount > 1) {
      onPersonCountChange(currentCount - 1);
    }
  };

  const incrementPersonCount = () => {
    const currentCount = personCount;
    onPersonCountChange(currentCount + 1);
  };

  return (
    <View>
      <TouchableOpacity style={headerStyle} onPress={toggleDatePickerModal}>
        <Text style={dateTextStyle}>{formatDateRange()}</Text>
      </TouchableOpacity>

      <Modal
        visible={showDatePickerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleDatePickerModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleDatePickerModal}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{t("00074")}</Text>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.dateSelectionContainer}>
              <TouchableOpacity
                style={[styles.dateSelection, showArrivalPicker && styles.activeDateSelection]}
                onPress={toggleArrivalPicker}
              >
                <Text style={styles.dateSelectionLabel}>{t("00064")}</Text>
                <Text style={styles.dateSelectionValue}>{format(fromDate, 'dd/MM/yyyy')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.dateSelection, showDeparturePicker && styles.activeDateSelection]}
                onPress={toggleDeparturePicker}
              >
                <Text style={styles.dateSelectionLabel}>{t("00065")}</Text>
                <Text style={styles.dateSelectionValue}>{format(toDate, 'dd/MM/yyyy')}</Text>
              </TouchableOpacity>
            </View>

            {(showArrivalPicker || showDeparturePicker) && (
              <DateTimePicker
                value={showArrivalPicker ? fromDate : toDate}
                locale="vi-VN"
                mode="date"
                display="inline"
                onChange={showArrivalPicker ? onChangeArrival : onChangeDeparture}
                themeVariant="light"
                style={styles.datePicker}
                minimumDate={new Date()}
              />
            )}

            {showPersonSelection && (
              <View style={styles.personSelection}>
                <View style={styles.personSelectionRow}>
                  <Text style={styles.personSelectionLabel}>{t("00066")}</Text>
                  <View style={styles.personCountContainer}>
                    <TouchableOpacity 
                      style={styles.countButton} 
                      onPress={decrementPersonCount}
                    >
                      <Text style={styles.countButtonText}>－</Text>
                    </TouchableOpacity>
                    <View style={styles.countDisplay}>
                      <Text style={styles.personCountText}>{personCount}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.countButton} 
                      onPress={incrementPersonCount}
                    >
                      <Text style={styles.countButtonText}>＋</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>{t("00079")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingLeft:20,
    paddingRight:20,
    transform: [{ translateX:20 }]
  },
  personSelection: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  personSelectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personSelectionLabel: {
    color: '#b58e50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  personCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countButton: {
    width: 35,
    height: 35,
    backgroundColor: '#b58e50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  countButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  countDisplay: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#b58e50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom:10
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomDatePicker;