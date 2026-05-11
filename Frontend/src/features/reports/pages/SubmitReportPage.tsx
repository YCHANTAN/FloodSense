import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, AlertTriangle, ArrowLeft, Locate, MousePointer2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGeolocation } from '@/hooks/useGeolocation';
import ImageDropzone from '../components/ImageDropzone';
import { submitReport } from '../services/reportApi';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

// Custom Marker Icon (consistent with LiveMap)
const createMarkerIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="flex flex-col items-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" 
                fill="#06b6d4" stroke="white" stroke-width="1.5"/>
          <circle cx="12" cy="10" r="3" fill="white" fill-opacity="0.3" />
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
};

const LocationPicker = ({ position, onPositionChange }: { position: [number, number], onPositionChange: (pos: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker position={position} icon={createMarkerIcon()} />
  ) : null;
};

const SubmitReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { location: gpsLocation, error: geoError, loading: geoLoading } = useGeolocation();
  const [reportLocation, setReportLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [useManualLocation, setUseManualLocation] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ depth: number } | null>(null);

  // Sync with GPS location initially or when requested
  useEffect(() => {
    if (gpsLocation && !useManualLocation) {
      setReportLocation({ lat: gpsLocation.lat, lng: gpsLocation.lng });
    }
  }, [gpsLocation, useManualLocation]);

  const handleSubmit = async () => {
    if (!selectedImage || !reportLocation) return;

    setIsSubmitting(true);
    try {
      const response = await submitReport({
        image: selectedImage,
        latitude: reportLocation.lat,
        longitude: reportLocation.lng,
      });
      setResult({ depth: response.estimatedDepthCm });
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-inter p-4 pb-24 relative">
      {/* Back Button - Fixed Location */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          variant="secondary" 
          className="p-3 rounded-xl shadow-lg bg-[#1e293b]/80 backdrop-blur-md border border-white/10"
          onClick={() => navigate('/map')}
        >
          <ArrowLeft size={20} className="text-white" />
        </Button>
      </div>

      {/* Header - Aligned beside the absolute button */}
      <div className="flex items-center mb-10 pt-7 pl-20 px-2">
        <h1 className="text-2xl font-poppins font-bold truncate">Submit Report</h1>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Step 1: Location Selection */}
        <section className="bg-[#1e293b] p-5 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#06b6d4]/20 rounded-lg">
                <MapPin className="text-[#06b6d4]" size={20} />
              </div>
              <h2 className="text-lg font-poppins font-semibold">Location</h2>
            </div>
            
            <div className="flex bg-slate-800 p-1 rounded-xl">
              <button 
                onClick={() => setUseManualLocation(false)}
                className={`p-2 rounded-lg transition-all ${!useManualLocation ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                title="Use My Location"
              >
                <Locate size={18} />
              </button>
              <button 
                onClick={() => setUseManualLocation(true)}
                className={`p-2 rounded-lg transition-all ${useManualLocation ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                title="Pin on Map"
              >
                <MousePointer2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {useManualLocation ? (
              <div className="h-48 w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                <MapContainer
                  center={reportLocation ? [reportLocation.lat, reportLocation.lng] : [10.3157, 123.8854]}
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  <LocationPicker 
                    position={reportLocation ? [reportLocation.lat, reportLocation.lng] : [10.3157, 123.8854]} 
                    onPositionChange={(pos) => setReportLocation({ lat: pos[0], lng: pos[1] })}
                  />
                </MapContainer>
              </div>
            ) : (
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                {geoLoading ? (
                  <div className="flex items-center space-x-3 text-slate-400">
                    <div className="h-4 w-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    <span className="text-sm">Fetching GPS location...</span>
                  </div>
                ) : geoError ? (
                  <div className="flex items-start space-x-3 text-amber-400">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">GPS Error</p>
                      <p className="text-xs opacity-80">{geoError}</p>
                      <button 
                        onClick={() => setUseManualLocation(true)}
                        className="mt-2 text-xs text-cyan-400 underline"
                      >
                        Try manual pin instead
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Current Coordinates</p>
                    <p className="text-sm font-mono text-cyan-400">
                      {reportLocation?.lat.toFixed(6)}, {reportLocation?.lng.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {useManualLocation && (
              <p className="text-[10px] text-slate-500 italic text-center">
                Tap the map to precisely place the flood marker
              </p>
            )}
          </div>
        </section>

        {/* Step 2: Photo */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-poppins font-semibold">Upload Evidence</h2>
            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Step 2 of 2</span>
          </div>
          <ImageDropzone onImageSelect={setSelectedImage} selectedImage={selectedImage} />
        </section>

        {/* Actions - Sticky Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 z-50">
          <div className="max-w-md mx-auto">
            <Button
              className="w-full h-14 text-lg rounded-2xl shadow-xl shadow-cyan-500/20"
              disabled={!selectedImage || !reportLocation || (geoLoading && !useManualLocation)}
              isLoading={isSubmitting}
              onClick={handleSubmit}
            >
              Analyze Flood Depth
            </Button>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      <Modal
        isOpen={!!result}
        onClose={() => navigate('/')}
        title="AI Analysis Complete"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="text-6xl font-poppins font-black text-[#06b6d4]">
              {result?.depth}cm
            </div>
            <div className="text-slate-400 text-sm mt-1">Estimated Depth</div>
          </div>

          {/* Visual Anchor */}
          <div className="w-full max-w-[200px] aspect-[1/2] relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
             {/* Simple SVG Leg representation */}
             <svg viewBox="0 0 100 200" className="w-full h-full">
                <path d="M40 20 L60 20 L65 180 L35 180 Z" fill="#334155" />
                <rect 
                  x="0" 
                  y={200 - (result?.depth || 0)} 
                  width="100" 
                  height={result?.depth || 0} 
                  fill="#06b6d4" 
                  fillOpacity="0.4"
                />
                <line 
                  x1="0" 
                  y1={200 - (result?.depth || 0)} 
                  x2="100" 
                  y2={200 - (result?.depth || 0)} 
                  stroke="#06b6d4" 
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
             </svg>
             <div className="absolute inset-x-0 bottom-2 text-[10px] text-slate-500 font-bold uppercase">Ground Level</div>
          </div>

          <p className="text-slate-300 text-sm italic">
            This estimation is crowd-sourced and powered by AI. Use caution when navigating.
          </p>

          <Button className="w-full" onClick={() => navigate('/')}>
            Back to Map
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SubmitReportPage;
