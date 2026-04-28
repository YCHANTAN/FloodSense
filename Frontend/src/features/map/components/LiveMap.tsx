import React, { useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@/app/store';
import { setViewport, setActiveReports, setSelectedReport } from '../mapSlice';
import { fetchActiveReports } from '../services/mapApi';
import RouteSearch from './RouteSearch';
import { User, Plus } from 'lucide-react';
import Button from '@/components/Button/Button';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const getHazardColor = (depth: number) => {
  if (depth >= 60) return '#e11d48'; // Brickwood Crimson
  if (depth >= 30) return '#ea580c'; // Burnt Copper
  if (depth >= 10) return '#fbbf24'; // Sharp Amber
  return '#14b8a6'; // Desaturated Teal (Safe/Low)
};

// Component to sync map movement with Redux
const MapEvents = () => {
  const dispatch = useDispatch();
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      dispatch(setViewport({
        latitude: center.lat,
        longitude: center.lng,
        zoom: zoom
      }));
    },
  });
  return null;
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

  // Custom SVG icon for reports
  const createReportIcon = (depth: number) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="cursor-pointer transition-transform hover:scale-110 flex flex-col items-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21L4.5 13.5C3.5 12.5 3 11.3 3 10C3 7.2 5.2 5 8 5C9.3 5 10.5 5.5 11.4 6.4L12 7L12.6 6.4C13.5 5.5 14.7 5 16 5C18.8 5 21 7.2 21 10C21 11.3 20.5 12.5 19.5 13.5L12 21Z" 
                  fill="${getHazardColor(depth)}" stroke="white" stroke-width="1.5"/>
            <circle cx="12" cy="10" r="3" fill="white" fill-opacity="0.3" />
          </svg>
          <div class="mt-1 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-[10px] font-bold text-white text-center border border-white/10">
            ${depth}cm
          </div>
        </div>
      `,
      iconSize: [32, 48],
      iconAnchor: [16, 32]
    });
  };

  return (
    <div className="relative h-screen w-screen bg-[#0f172a]">
      {/* Search Overlay */}
      <RouteSearch />

      <MapContainer
        center={[viewport.latitude, viewport.longitude]}
        zoom={viewport.zoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', zIndex: 0 }}
        zoomControl={false} // We can put it in a custom position or omit
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapEvents />

        {activeReports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={createReportIcon(report.waterDepthCm)}
            eventHandlers={{
              click: () => {
                dispatch(setSelectedReport(report));
              },
            }}
          >
            <Popup>
              <div className="text-deep-slate">
                <p className="font-bold">Water Depth: {report.waterDepthCm}cm</p>
                <p className="text-xs text-cool-gray">{new Date(report.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Action Buttons - Thumb Zone */}
      <div className="absolute bottom-8 left-0 right-0 px-6 flex items-center justify-between pointer-events-none z-10">
        <Button 
          variant="secondary" 
          className="p-4 rounded-2xl pointer-events-auto shadow-xl"
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
