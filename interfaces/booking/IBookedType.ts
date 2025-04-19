export interface RoomImageModel {
    id: number;
    url: string;
    roomTypeId: number;
  }
  
  export interface RoomTypeVM {
    id: number;
    name?: string;
    content?: string;
    slug?: string;
    capacity?: number;
    price?: number;
    view?: string;
    bedType?: string;
    size?: string;
    status?: string;
    roomImages?: RoomImageModel[];
  }
  
  export interface IBookedData {
    id: number;
    userName?: string;
    email?: string;
    phone?: string;
    code?: string;
    note?: string;
    totalPerson: number;
    totalPrice: number;
    fromDate: string; 
    toDate: string;
    paymentMethod?: string;
    paymentStatus?: string;
    createdDate: string;
    confirmBy?: string;
    status?: string;
    roomTypes: RoomTypeVM[];
  }
  