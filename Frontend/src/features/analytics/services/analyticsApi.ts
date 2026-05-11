import api from '@/services/api';

export interface PagasaData {
  location: string;
  timestamp: string;
  weather: {
    condition: string;
    temperature: number;
    rainfall_24h?: string;
  };
  flood_warnings: {
    level: string;
    area: string;
    message: string;
    issued_at: string;
  }[];
  tide_info?: {
    high_tide: string;
    low_tide: string;
  };
}

export interface Hotspot {
  latitude: number;
  longitude: number;
  intensity: number;
  avgDepth: number;
}

export interface Trend {
  date: string;
  count: number;
  avgDepth: number;
}

export interface AnalyticsResponse {
  pagasa: PagasaData;
  hotspots: Hotspot[];
  trends: Trend[];
  summary: {
    totalReports: number;
    averageDepth: number;
    maxDepth: number;
  };
}

export const fetchAnalyticsData = async (city: string = 'Cebu City'): Promise<AnalyticsResponse> => {
  const response = await api.get<AnalyticsResponse>(`/api/analytics?city=${encodeURIComponent(city)}`);
  return response.data;
};
