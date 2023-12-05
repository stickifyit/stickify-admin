type Container = {
    _id: string;
    isOpen: "open" | "closed";
    sheets: number;
    state: "filling" | "ready"|"printed"|"delivering"| "delivered"; // Add more states as needed
    createdAt: string; // Assuming it's a string in ISO date format
    updatedAt: string; // Assuming it's a string in ISO date format
    __v: number;
    sheetsIds: string[];
    serverTime: Date;
  };
  
  type Sheet = {
    _id: string;
    order: string;
    stickerUrl: string;
    size: string;
    type: string;
    container: string;
    snapshot: string;
    createdAt: string; // Assuming it's a string in ISO date format
    updatedAt: string; // Assuming it's a string in ISO date format
    __v: number;
  };
  


  type StickerSheet = {
    _id: string;
    state: string;
    orderId: string;
    image: string;
    type: string;
    stickerSheetSchema?: {
      data: {
        sheetId: string;
      };
      _id: string;
      container: string;
    };
    customSheetSchema?: {
      data: {
        items: {
          x: number;
          y: number;
          width: number;
          height: number;
          image: string;
        }[];
      };
      _id: string;
      container: string;
    }
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  type CurrentContainer = {
    _id: string;
    isOpen: string;
    sheets: number;
    sheetsIds: StickerSheet[];
    state: string;
    serverTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  