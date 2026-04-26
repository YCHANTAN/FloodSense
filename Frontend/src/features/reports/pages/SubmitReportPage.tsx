import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, AlertTriangle, ChevronLeft } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import ImageDropzone from '../components/ImageDropzone';
import { submitReport } from '../services/reportApi';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

const SubmitReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { location, error: geoError, loading: geoLoading } = useGeolocation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ depth: number } | null>(null);

  const handleSubmit = async () => {
    if (!selectedImage || !location) return;

    setIsSubmitting(true);
    try {
      const response = await submitReport({
        image: selectedImage,
        latitude: location.lat,
        longitude: location.lng,
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
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-inter p-4 pb-24">
      {/* Header */}
      <div className="flex items-center mb-8 pt-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors mr-2"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-poppins font-bold">Submit Report</h1>
      </div>

      <div className="max-w-md mx-auto space-y-8">
        {/* Step 1: Location */}
        <section className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-[#06b6d4]/20 rounded-lg">
              <MapPin className="text-[#06b6d4]" size={20} />
            </div>
            <h2 className="text-lg font-poppins font-semibold">Current Location</h2>
          </div>
          
          {geoLoading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
          ) : geoError ? (
            <div className="flex items-center space-x-2 text-[#fbbf24]">
              <AlertTriangle size={16} />
              <p className="text-sm">{geoError}</p>
            </div>
          ) : (
            <p className="text-slate-400 text-sm">
              Coordinates: <span className="text-slate-200">{location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}</span>
            </p>
          )}
        </section>

        {/* Step 2: Photo */}
        <section className="space-y-4">
          <h2 className="text-lg font-poppins font-semibold px-2">Upload Evidence</h2>
          <ImageDropzone onImageSelect={setSelectedImage} selectedImage={selectedImage} />
        </section>

        {/* Actions - Sticky Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800">
          <Button
            className="w-full h-14 text-lg"
            disabled={!selectedImage || !location || geoLoading}
            isLoading={isSubmitting}
            onClick={handleSubmit}
          >
            Analyze Flood Depth
          </Button>
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
