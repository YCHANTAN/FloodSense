import api from '@/services/api';

interface ReportPayload {
  image: File;
  latitude: number;
  longitude: number;
}

interface ReportResponse {
  id: string;
  estimatedDepthCm: number;
  status: 'success' | 'failure';
  message?: string;
}

export const submitReport = async (payload: ReportPayload): Promise<ReportResponse> => {
  const formData = new FormData();
  formData.append('image', payload.image);
  formData.append('latitude', payload.latitude.toString());
  formData.append('longitude', payload.longitude.toString());

  const response = await api.post<ReportResponse>('/api/reports', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
