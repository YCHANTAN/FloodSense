export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface Report {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  waterDepthCm: number;
  imageUrl?: string;
  timestamp: Date;
}
