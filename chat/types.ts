
export type Message = {
  id: string;
  sender: 'user' | 'system' | 'kevin';
  text: string;
  timestamp: Date;
};

export interface ITKnowledgeBase {
  company: string;
  employees: {
    name: string;
    role: string;
    laptop: string;
    issue?: string;
  }[];
  infrastructure: {
    serverRoomCode: string;
    wifiPassword: string;
    mainPrinterIP: string;
    backupStatus: string;
  };
  schedules: {
    maintenance: string;
    tapeRotation: string;
  };
}
