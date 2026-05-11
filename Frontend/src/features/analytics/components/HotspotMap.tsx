import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { Hotspot } from '../services/analyticsApi';
import 'leaflet/dist/leaflet.css';

interface HotspotMapProps {
  hotspots: Hotspot[];
}

const HotspotMap: React.FC<HotspotMapProps> = ({ hotspots }) => {
  const getIntensityColor = (intensity: number) => {
    if (intensity > 10) return '#ef4444'; // Red
    if (intensity > 5) return '#f97316'; // Orange
    return '#eab308'; // Yellow
  };

  return (
    <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
      <MapContainer
        center={[10.3157, 123.8854]} // Cebu City
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {hotspots.map((spot, idx) => (
          <Circle
            key={idx}
            center={[spot.latitude, spot.longitude]}
            radius={150} // 150 meters radius
            pathOptions={{
              fillColor: getIntensityColor(spot.intensity),
              fillOpacity: Math.min(0.2 + (spot.intensity * 0.1), 0.7),
              color: 'transparent',
            }}
          >
            <Popup>
              <div className="text-slate-900 p-1">
                <div className="font-bold text-sm">Flood Hotspot</div>
                <div className="text-xs">Reports: {spot.intensity}</div>
                <div className="text-xs">Avg Depth: {spot.avgDepth.toFixed(1)}cm</div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      
      {/* Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-[10px] text-white space-y-2">
        <div className="font-bold uppercase tracking-wider opacity-60">Intensity</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div> <span>High (10+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div> <span>Medium (5-10)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div> <span>Low (1-5)</span>
        </div>
      </div>
    </div>
  );
};

export default HotspotMap;
