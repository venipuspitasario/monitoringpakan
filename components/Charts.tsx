
import React, { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { FeedData } from '../types';

interface ChartsProps {
  data: FeedData[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  const qualityStats = useMemo(() => {
    const stats: Record<string, number> = { 'Layak': 0, 'Tidak Layak': 0, 'Tindak Lanjut': 0 };
    data.forEach(item => {
      if (item && item.hasil) {
        stats[item.hasil] = (stats[item.hasil] || 0) + 1;
      }
    });
    return Object.keys(stats).map(key => ({ name: key, value: stats[key] }));
  }, [data]);

  const topBrandDistribution = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // 1. Count frequency of each brand
    const brandCounts: Record<string, number> = {};
    data.forEach(item => {
      if (item && item.merek) {
        brandCounts[item.merek] = (brandCounts[item.merek] || 0) + 1;
      }
    });

    // 2. Get top 5 brands by frequency
    const top5Brands = Object.keys(brandCounts)
      .sort((a, b) => brandCounts[b] - brandCounts[a])
      .slice(0, 5);

    // 3. Calculate distribution for these top 5
    return top5Brands.map(brand => {
      const brandItems = data.filter(d => d.merek === brand);
      return {
        name: brand,
        'Layak': brandItems.filter(d => d.hasil === 'Layak').length,
        'Tindak Lanjut': brandItems.filter(d => d.hasil === 'Tindak Lanjut').length,
        'Tidak Layak': brandItems.filter(d => d.hasil === 'Tidak Layak').length,
      };
    });
  }, [data]);

  const COLORS = ['#16a34a', '#dc2626', '#f59e0b']; // Layak (Green), Tidak Layak (Red), Tindak Lanjut (Orange)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart: Overall Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <i className="fas fa-chart-pie text-primary-600 mr-2"></i>
            Distribusi Kualitas Pakan (Keseluruhan)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#16a34a" /> {/* Layak */}
                  <Cell fill="#dc2626" /> {/* Tidak Layak */}
                  <Cell fill="#f59e0b" /> {/* Tindak Lanjut */}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Quality by Top 5 Brands */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <i className="fas fa-chart-bar text-blue-500 mr-2"></i>
            Kualitas 5 Merek Terpopuler
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topBrandDistribution}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                  }}
                />
                <Legend />
                <Bar dataKey="Layak" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Tindak Lanjut" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Tidak Layak" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
        <h3 className="text-lg font-bold mb-2">Ringkasan Data</h3>
        <p className="text-gray-500 text-sm mb-4 italic">Menampilkan distribusi kelayakan pakan dari total {data.length} pemeriksaan.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
            <div className="text-green-600 dark:text-green-400 text-xs font-bold uppercase">Layak</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{qualityStats.find(s => s.name === 'Layak')?.value || 0}</div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
            <div className="text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase">Tindak Lanjut</div>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{qualityStats.find(s => s.name === 'Tindak Lanjut')?.value || 0}</div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
            <div className="text-red-600 dark:text-red-400 text-xs font-bold uppercase">Tidak Layak</div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">{qualityStats.find(s => s.name === 'Tidak Layak')?.value || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
