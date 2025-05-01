import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Theme } from '@/providers/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  // Not logged in styles
  container: {
    flexGrow: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginWrapper: {
    backgroundColor: theme.content, 
    width: '90%',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: theme.background, 
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  description: {
    color: theme.text,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: '#B58E50',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Fixed header styles
  fixedHeader: {
    backgroundColor: theme.background,
    zIndex: 999,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  // Scrollable content styles
  scrollContent: {
    flex: 1,
    backgroundColor: theme.content,
  },
  scrollContentContainer: {
    paddingBottom: 30,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#B58E50',
    padding: 2,
    marginRight: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  nameContainer: {
    justifyContent: 'center',
  },
  userName: {
    color: theme.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Các section mới
  section: {
    marginTop: 20,
    paddingHorizontal: 16,

  },
  // Section header
  sectionHeader: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 10,
    paddingBottom: 8,
  },
  // Container cho các setting row để bo tròn cả nhóm
  settingRowContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  // Setting row styling
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.background,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.borderInput,
  },
  // Row cuối cùng không có border ở dưới
  lastSettingRow: {
    borderBottomWidth: 0,
  },
  settingIconContainer: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    color: theme.text,
    fontSize: 16,
    flex: 1,
  },
  rowArrow: {
    marginLeft: 'auto',
    opacity: 0.5,
  },
  // Logout section và button
  logoutSection: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  logoutButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1C1C1E', 
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  modalOption: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOptionIcon: {
    marginRight: 10,
    width: 24,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#B58E50',
  },
  modalCancel: {
    marginTop: 15,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    fontWeight: '500',
  },
  // Add these new styles
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalImageContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#B58E50',
  },
  zoomedAvatar: {
    width: '100%',
    height: '100%',
  },
});