import React, { useEffect, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@/app/store';
import { setViewport, setActiveReports, setSelectedReport } from '../mapSlice';
import { fetchActiveReports } from '../services/mapApi';
import RouteSearch from './RouteSearch';
import { User, Plus } from 'lucide-react';
import Button from '@/components/Button/Button';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

const getHazardColor = (depth: number) => {
  if (depth >= 60) return '#e11d48'; // Brickwood Crimson
  if (depth >= 30) return '#ea580c'; // Burnt Copper
  if (depth >= 10) return '#fbbf24'; // Sharp Amber
  return '#14b8a6'; // Desaturated Teal (Safe/Low)
};

const LiveMap: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { viewport, activeReports } = useSelector((state: RootState) => state.map);

  const loadReports = useCallback(async () => {
    try {
      const reports = await fetchActiveReports();
      dispatch(setActiveReports(reports));
    } catch (error) {
      console.error('Failed to load reports:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadReports();
    const interval = setInterval(loadReports, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [loadReports]);

  return (
    <div className="relative h-screen w-screen bg-[#0f172a]">
      {/* Search Overlay */}
      <RouteSearch />

      <Map
        {...viewport}
        onMove={(evt) => dispatch(setViewport(evt.viewState))}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="bottom-right" />

        {activeReports.map((report) => (
          <Marker
            key={report.id}
            latitude={report.latitude}
            longitude={report.longitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              dispatch(setSelectedReport(report));
            }}
          >
            <div 
              className="cursor-pointer transition-transform hover:scale-110"
              title={`${report.waterDepthCm}cm depth`}
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 21L4.5 13.5C3.5 12.5 3 11.3 3 10C3 7.2 5.2 5 8 5C9.3 5 10.5 5.5 11.4 6.4L12 7L12.6 6.4C13.5 5.5 14.7 5 16 5C18.8 5 21 7.2 21 10C21 11.3 20.5 12.5 19.5 13.5L12 21Z" 
                  fill={getHazardColor(report.waterDepthCm)}
                  stroke="white"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="10" r="3" fill="white" opacity="0.3" />
              </svg>
              <div className="mt-1 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-[10px] font-bold text-white text-center border border-white/10">
                {report.waterDepthCm}cm
              </div>
            </div>
          </Marker>
        ))}
      </Map>

      {/* Action Buttons - Thumb Zone */}
      <div className="absolute bottom-8 left-0 right-0 px-6 flex items-center justify-between pointer-events-none">
        <Button 
          variant="secondary" 
          className="p-4 rounded-2xl pointer-events-auto"
          onClick={() => navigate('/profile')}
        >
          <User size={24} />
        </Button>

        <Button 
          className="h-16 w-16 rounded-2xl shadow-[#06b6d4]/40 shadow-2xl pointer-events-auto"
          onClick={() => navigate('/report')}
        >
          <Plus size={32} />
        </Button>
      </div>
    </div>
  );
};

export default LiveMap;
