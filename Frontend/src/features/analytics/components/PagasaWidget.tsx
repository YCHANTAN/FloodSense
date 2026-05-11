import React from 'react';
import { PagasaData } from '../services/analyticsApi';
import { CloudRain, AlertTriangle, Waves, Thermometer } from 'lucide-react';

interface PagasaWidgetProps {
  data: PagasaData;
}

const PagasaWidget: React.FC<PagasaWidgetProps> = ({ data }) => {
  return (
    <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CloudRain className="text-cyan-400" /> PAGASA Monitoring
        </h2>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
          {data.location}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Thermometer size={14} /> Temp
          </div>
          <div className="text-2xl font-bold text-white">{data.weather.temperature}°C</div>
          <div className="text-[10px] text-slate-500">{data.weather.condition}</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Waves size={14} /> Tide
          </div>
          <div className="text-sm font-bold text-white">High: {data.tide_info?.high_tide}</div>
          <div className="text-[10px] text-slate-500">Low: {data.tide_info?.low_tide}</div>
        </div>
      </div>

      {data.flood_warnings.length > 0 ? (
        <div className="space-y-3">
          {data.flood_warnings.map((warning, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border ${
                warning.level === 'Red' ? 'bg-red-500/10 border-red-500/20 text-red-200' :
                warning.level === 'Orange' ? 'bg-orange-500/10 border-orange-500/20 text-orange-200' :
                'bg-yellow-500/10 border-yellow-500/20 text-yellow-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase mb-1">{warning.level} Warning</div>
                  <div className="text-sm leading-tight mb-2">{warning.message}</div>
                  <div className="text-[10px] opacity-60">Issued: {new Date(warning.issued_at).toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
          <p className="text-emerald-400 text-sm font-medium">No Active Flood Warnings</p>
        </div>
      )}
    </div>
  );
};

export default PagasaWidget;
