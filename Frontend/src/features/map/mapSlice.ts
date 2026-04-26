import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface Report {
  id: string;
  latitude: number;
  longitude: number;
  waterDepthCm: number;
  timestamp: string;
  imageUrl?: string;
}

interface MapState {
  viewport: Viewport;
  activeReports: Report[];
  selectedReport: Report | null;
}

const initialState: MapState = {
  viewport: {
    latitude: 10.3157,
    longitude: 123.8854,
    zoom: 13,
  },
  activeReports: [
    {
      id: '1',
      latitude: 10.3100,
      longitude: 123.8900,
      waterDepthCm: 15,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      latitude: 10.3200,
      longitude: 123.8800,
      waterDepthCm: 45,
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      latitude: 10.3150,
      longitude: 123.9000,
      waterDepthCm: 72,
      timestamp: new Date().toISOString(),
    }
  ],
  selectedReport: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setViewport: (state, action: PayloadAction<Viewport>) => {
      state.viewport = action.payload;
    },
    setActiveReports: (state, action: PayloadAction<Report[]>) => {
      state.activeReports = action.payload;
    },
    setSelectedReport: (state, action: PayloadAction<Report | null>) => {
      state.selectedReport = action.payload;
    },
  },
});

export const { setViewport, setActiveReports, setSelectedReport } = mapSlice.actions;
export default mapSlice.reducer;
