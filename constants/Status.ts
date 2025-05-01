
// helpers/statusHelper.ts
export const getStatusInfo = (
  status: string,
  t: (key: string) => string // truyền vào hook dịch
) => {
  switch (status) {
    case 'CheckIn':
      return { label: t("00045"), color: '#16a34a', backgroundColor: '#dcfce7' };
    case 'CheckOut':
      return { label: t("00046"), color: '#2563eb', backgroundColor: '#dbeafe' };
    case 'Pending':
      return { label: t("00047"), color: '#ca8a04', backgroundColor: '#fef9c3' };
    case 'Confirmed':
      return { label: t("00048"), color: '#7c3aed', backgroundColor: '#ede9fe' };
    case 'Cancelled':
      return { label: t("00049"), color: '#dc2626', backgroundColor: '#fee2e2' };
    default:
      return { label: status, color: '#6b7280', backgroundColor: '#f3f4f6' };
  }
};
