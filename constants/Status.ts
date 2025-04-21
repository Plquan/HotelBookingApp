// helpers/statusHelper.ts
export const getStatusInfo = (status: string) => {
    switch (status) {
      case 'CheckIn':
        return { label: 'Đã nhận phòng', color: '#16a34a', backgroundColor: '#dcfce7' }; // xanh lá
      case 'CheckOut':
        return { label: 'Đã trả phòng', color: '#2563eb', backgroundColor: '#dbeafe' }; // xanh dương
      case 'Pending':
        return { label: 'Chờ xác nhận', color: '#ca8a04', backgroundColor: '#fef9c3' }; // vàng
      case 'Confirmed':
        return { label: 'Đã xác nhận', color: '#7c3aed', backgroundColor: '#ede9fe' }; // tím
      case 'Cancelled':
        return { label: 'Đã hủy', color: '#dc2626', backgroundColor: '#fee2e2' }; // đỏ
      default:
        return { label: status, color: '#6b7280', backgroundColor: '#f3f4f6' }; // xám
    }
  };
  