type Container = {
    _id: string;
    isOpen: "open" | "closed";
    sheets: number;
    state: "filling" | "ready"; // Add more states as needed
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
  



  