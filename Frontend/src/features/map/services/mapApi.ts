import api from '@/services/api';

export interface ReportResponse {
  id: string;
  latitude: number;
  longitude: number;
  waterDepthCm: number;
  timestamp: string;
  imageUrl?: string;
}

export const fetchActiveReports = async (): Promise<ReportResponse[]> => {
  const response = await api.get<ReportResponse[]>('/api/reports');
  return response.data;
};
