
import React, { useMemo, useState } from 'react';
import { FeedData, FilterState } from '../types.ts';
import Filters from './Filters.tsx';
import DataTable from './DataTable.tsx';
import Charts from './Charts.tsx';

interface DashboardProps {
  data: FeedData[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  loading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ data, filters, setFilters, loading }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const filteredData = useMemo(() => {
    if (!data) return [];
    let result = [...data];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(item => 
        (item.toko?.toString().toLowerCase() || '').includes(search) || 
        (item.lokasi?.toString().toLowerCase() || '').includes(search) ||
        (item.merek?.toString().toLowerCase() || '').includes(search) ||
        (item.jenis?.toString().toLowerCase() || '').includes(search) ||
        (item.npp?.toString().toLowerCase() || '').includes(search)
      );
    }

    if (filters.lokasi) result = result.filter(item => item.lokasi === filters.lokasi);
    if (filters.merek) result = result.filter(item => item.merek === filters.merek);
    if (filters.hasil) result = result.filter(item => item.hasil === filters.hasil);
    if (filters.jamur) result = result.filter(item => item.jamur === filters.jamur);

    result.sort((a, b) => {
      const dateA = a.tanggal ? new Date(a.tanggal).getTime() : 0;
      const dateB = b.tanggal ? new Date(b.tanggal).getTime() : 0;
      const comparison = dateA - dateB;
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [data, filters]);

  const uniqueLocations = useMemo(() => 
    Array.from(new Set(data.map(d => d.lokasi).filter(Boolean))).sort()
  , [data]);
  
  const uniqueBrands = useMemo(() => 
    Array.from(new Set(data.map(d => d.merek).filter(Boolean))).sort()
  , [data]);

  const handleExportCSV = () => {
    const headers = ["Tanggal", "Toko", "Lokasi", "Jenis", "Merek", "NPP", "Batch/Exp", "Fisik", "Jamur", "Kadar Air", "Nutrisi", "Kemasan", "Palet", "Hasil", "Harga"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(item => [
        item.tanggal || '', 
        `"${item.toko || ''}"`, 
        `"${item.lokasi || ''}"`, 
        `"${item.jenis || ''}"`, 
        `"${item.merek || ''}"`, 
        `"${item.npp || ''}"`, 
        `"${item.batch || ''}"`, 
        `"${item.kondisiFisik || ''}"`, 
        item.jamur || '', 
        item.kadarAir || '', 
        `"${item.nutrisi || ''}"`,
        `"${item.kemasan || ''}"`, 
        item.palet || '', 
        item.hasil || '', 
        item.harga || 0
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `DataPakan_Kasongan_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b dark:border-gray-700">
        <button 
          onClick={() => { setActiveTab('list'); setPage(1); }}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'list' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <i className="fas fa-list mr-2"></i> Daftar Kualitas
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'stats' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <i className="fas fa-chart-line mr-2"></i> Statistik Kualitas
        </button>
      </div>

      {activeTab === 'list' ? (
        <>
          <Filters 
            filters={filters} 
            setFilters={setFilters} 
            locations={uniqueLocations} 
            brands={uniqueBrands} 
            onExport={handleExportCSV}
          />
          <DataTable 
            data={filteredData} 
            loading={loading} 
            page={page} 
            setPage={setPage} 
            itemsPerPage={itemsPerPage} 
          />
        </>
      ) : (
        <Charts data={filteredData} />
      )}
    </div>
  );
};

export default Dashboard;
