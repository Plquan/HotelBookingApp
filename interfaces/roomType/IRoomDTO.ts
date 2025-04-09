export interface RoomImage {
    id: number;
    roomTypeId: number;
    url: string;
  }
  
export interface RoomFacility {
    id: number;
    roomTypeId: number;
    name: string;
  }
  
export interface IRoomTypeData {
    id: number;
    name: string;
    content: string;
    slug: string;
    capacity: number;
    price: number;
    view: string;
    bedType: string;
    size: string;
    status: string;
    roomImages: RoomImage[];
    roomFacilitys: RoomFacility[];
  }