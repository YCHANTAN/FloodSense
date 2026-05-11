import { IReportRepository, IPagasaService } from './interfaces';

export class AnalyticsUseCase {
  constructor(
    private reportRepository: IReportRepository,
    private pagasaService: IPagasaService
  ) {}

  async getDashboardData(city: string = 'Cebu City') {
    const reports = await this.reportRepository.findAll();
    const pagasaData = await this.pagasaService.getLatestBulletins(city);

    // Filter reports for the city if needed (for now assume all for simplicity or filter by bounding box)
    // For Cebu City roughly: lat 10.2 to 10.4, lng 123.8 to 124.0
    const cebuReports = reports.filter(r => 
      r.latitude >= 10.2 && r.latitude <= 10.4 && 
      r.longitude >= 123.8 && r.longitude <= 124.0
    );

    const hotspots = this.calculateHotspots(cebuReports);
    const trends = this.calculateTrends(cebuReports);

    return {
      pagasa: pagasaData,
      hotspots,
      trends,
      summary: {
        totalReports: cebuReports.length,
        averageDepth: cebuReports.length > 0 
          ? cebuReports.reduce((acc, r) => acc + r.waterDepthCm, 0) / cebuReports.length 
          : 0,
        maxDepth: cebuReports.length > 0 
          ? Math.max(...cebuReports.map(r => r.waterDepthCm)) 
          : 0,
      }
    };
  }

  private calculateHotspots(reports: any[]) {
    const grid: Record<string, { lat: number, lng: number, count: number, totalDepth: number }> = {};
    
    reports.forEach(r => {
      // Group by ~110m grid
      const latKey = r.latitude.toFixed(3);
      const lngKey = r.longitude.toFixed(3);
      const key = `${latKey},${lngKey}`;
      
      if (!grid[key]) {
        grid[key] = { lat: parseFloat(latKey), lng: parseFloat(lngKey), count: 0, totalDepth: 0 };
      }
      grid[key].count++;
      grid[key].totalDepth += r.waterDepthCm;
    });

    return Object.values(grid).map(h => ({
      latitude: h.lat,
      longitude: h.lng,
      intensity: h.count,
      avgDepth: h.totalDepth / h.count
    }));
  }

  private calculateTrends(reports: any[]) {
    const daily: Record<string, { date: string, count: number, avgDepth: number, totalDepth: number }> = {};
    
    // Last 7 days
    reports.forEach(r => {
      const date = new Date(r.timestamp).toISOString().split('T')[0];
      if (!daily[date]) {
        daily[date] = { date, count: 0, avgDepth: 0, totalDepth: 0 };
      }
      daily[date].count++;
      daily[date].totalDepth += r.waterDepthCm;
    });

    return Object.values(daily)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(d => ({
        date: d.date,
        count: d.count,
        avgDepth: d.totalDepth / d.count
      }));
  }
}
