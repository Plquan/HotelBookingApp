import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface ICheckDate{
    roomTypeId?: number;
    fromDate: string;
    toDate: string;
}

export interface IChooseRoom {
    roomTypeId:number;
    price: number;
    number:number
}

export interface IBookingRequestData {
    id?: number;
    appUserId: string | null;
    userName?: string;
    email?: string;
    phone?: string;
    note?: string;
    totalPerson?: number;
    totalPrice?: number;
    fromDate: string;
    toDate: string;
    paymentMethod?: string;
    confirmBy?: string;
    chooseRooms?: IChooseRoom[];
}

export interface IPaymentData {
    orderType?: string
    amount?: number;
    orderDescription?: string;
    name?: string;
    booking?: IBookingRequestData
}

  export interface RoomImage {
    id: number;
    roomTypeId: number;
    url: string;
  }

  export interface ISelectedRoom{
    id:number,
    name:string,
    count:number,
    originalPrice:number,
    totalPrice:number,
    image:string
  }

  export interface ICheckRoomData {
    id: number;
    name: string;
    content: string;
    slug: string;
    capacity: number;
    price: number;
    view: string;
    bedType: string;
    size?: string;
    availableRooms: number;
    roomImages: RoomImage[];
  }