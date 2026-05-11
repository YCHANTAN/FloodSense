import React, { useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@/app/store';
import { setViewport, setActiveReports, setSelectedReport } from '../mapSlice';
import { fetchActiveReports } from '../services/mapApi';
import RouteSearch from './RouteSearch';
import { User, Plus, ArrowLeft, LayoutDashboard } from 'lucide-react';
import Button from '@/components/Button/Button';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
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
            <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" 
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
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          variant="secondary" 
          className="p-3 rounded-xl shadow-lg bg-[#1e293b]/80 backdrop-blur-md border border-white/10"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} className="text-white" />
        </Button>
      </div>

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
            <Popup className="custom-popup">
              <div className="p-1 min-w-[150px]">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Flood Report</h3>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Water Depth:</span>
                    <span className="font-semibold text-slate-900">{report.waterDepthCm}cm</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Reported at:</span>
                    <span className="text-slate-900">{new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                
                {report.imageUrl && (
                  <Button 
                    variant="primary" 
                    className="w-full py-2 text-xs font-bold rounded-lg shadow-md pointer-events-auto"
                    onClick={() => window.open(report.imageUrl, '_blank')}
                  >
                    View Images
                  </Button>
                )}
                {!report.imageUrl && (
                  <p className="text-[10px] text-slate-400 italic text-center">No images available</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Action Buttons - Thumb Zone */}
      <div className="absolute bottom-8 left-0 right-0 px-6 flex items-center justify-between pointer-events-none z-10">
        <div className="flex gap-3 pointer-events-auto">
          <Button 
            variant="secondary" 
            className="p-4 rounded-2xl shadow-xl"
            onClick={() => navigate('/profile')}
          >
            <User size={24} />
          </Button>

          <Button 
            variant="secondary" 
            className="p-4 rounded-2xl shadow-xl bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
            onClick={() => navigate('/dashboard')}
          >
            <LayoutDashboard size={24} />
          </Button>
        </div>

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
