import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Map as MapIcon, Info } from 'lucide-react';
import Button from '@/components/Button/Button';
import { fetchAnalyticsData, AnalyticsResponse } from '../services/analyticsApi';
import PagasaWidget from '../components/PagasaWidget';
import TrendCharts from '../components/TrendCharts';
import HotspotMap from '../components/HotspotMap';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchAnalyticsData('Cebu City');
        setData(result);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Analyzing Data...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 pb-24 lg:p-12 relative">
      {/* Back Button - Fixed Location (same as Map) */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          variant="secondary" 
          className="p-3 rounded-xl shadow-lg bg-[#1e293b]/80 backdrop-blur-md border border-white/10"
          onClick={() => navigate('/map')}
        >
          <ArrowLeft size={20} className="text-white" />
        </Button>
      </div>

      {/* Header with Title aligned beside button */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pt-16 md:pt-10 px-2">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
              <LayoutDashboard className="text-cyan-400 w-8 h-8 md:w-10 md:h-10" /> Analytics Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">Real-time flood insights for Cebu City</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex flex-col items-center">
            <span className="text-[10px] uppercase text-slate-500 font-bold">Total Reports</span>
            <span className="text-xl font-black text-cyan-400">{data.summary.totalReports}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex flex-col items-center">
            <span className="text-[10px] uppercase text-slate-500 font-bold">Avg Depth</span>
            <span className="text-xl font-black text-cyan-400">{data.summary.averageDepth.toFixed(0)}cm</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: PAGASA & Charts */}
        <div className="lg:col-span-4 space-y-8">
          <PagasaWidget data={data.pagasa} />
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 flex items-start gap-4">
            <Info size={24} className="text-cyan-400 shrink-0" />
            <p className="text-sm text-cyan-100/80 leading-relaxed">
              Data is aggregated from community reports and local sensors. Focus on hotspots to plan your commute safely.
            </p>
          </div>
        </div>

        {/* Right Column: Map & Trends */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 p-8-custom shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-6 px-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapIcon className="text-cyan-400" /> Flood Hotspots
              </h2>
              <span className="text-xs text-slate-400">Heat-intensity based on reports</span>
            </div>
            <HotspotMap hotspots={data.hotspots} />
          </div>

          <TrendCharts data={data.trends} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
