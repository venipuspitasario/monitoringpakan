
import React from 'react';
import { FeedData } from '../types';

interface DataTableProps {
  data: FeedData[];
  loading: boolean;
  page: number;
  setPage: (p: number) => void;
  itemsPerPage: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading, page, setPage, itemsPerPage }) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Fungsi untuk mewarnai label nutrisi secara spesifik
  const renderColoredNutrisi = (text: string) => {
    if (!text) return '-';
    
    // Pecah string berdasarkan label yang diinginkan
    const parts = text.split(/(PK|LK|SK|ABU|Ca|P)/g);
    
    return parts.map((part, i) => {
      switch (part) {
        case 'PK': return <span key={i} className="font-bold text-green-600 dark:text-green-400">PK</span>;
        case 'LK': return <span key={i} className="font-bold text-blue-600 dark:text-blue-400">LK</span>;
        case 'SK': return <span key={i} className="font-bold text-red-600 dark:text-red-400">SK</span>;
        case 'ABU': return <span key={i} className="font-bold text-yellow-500 dark:text-yellow-400">ABU</span>;
        case 'Ca': return <span key={i} className="font-bold text-orange-500">Ca</span>;
        case 'P': return <span key={i} className="font-bold text-cyan-600 dark:text-cyan-400">P</span>;
        default: return <span key={i}>{part}</span>;
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Layak':
        return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase dark:bg-green-900/30 dark:text-green-400">Layak</span>;
      case 'Tidak Layak':
        return <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase dark:bg-red-900/30 dark:text-red-400">Tidak Layak</span>;
      default:
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase dark:bg-yellow-900/30 dark:text-yellow-400">Tindak Lanjut</span>;
    }
  };

  const formatCurrency = (value: number | string) => {
    const num = Number(value);
    if (isNaN(num)) return value;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatNPP = (npp: string) => {
    if (!npp) return '-';
    if (npp.includes('T') && npp.includes('-')) {
      return npp.split('T')[0];
    }
    return npp;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white dark:bg-gray-800 h-16 rounded-lg shadow-sm"></div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
        <i className="fas fa-search-minus text-5xl text-gray-300 mb-4"></i>
        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">Data Tidak Ditemukan</h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1550px]">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Tgl Input</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Toko</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Jenis Pakan</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Lokasi</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Merek</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">NPP</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Kedaluwarsa</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Kemasan</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Jamur</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider whitespace-nowrap">Kadar Air</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Nutrisi</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Hasil</th>
                <th className="px-4 py-4 font-semibold text-[11px] text-gray-500 uppercase tracking-wider">Harga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{item.tanggal}</td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-900 dark:text-white uppercase min-w-[140px]">{item.toko}</td>
                  <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300 min-w-[120px]">{item.jenis}</td>
                  <td className="px-4 py-3 text-xs text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">{item.lokasi}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{item.merek}</td>
                  <td className="px-4 py-3 text-[10px] font-mono text-gray-500 whitespace-nowrap">{formatNPP(item.npp)}</td>
                  <td className="px-4 py-3 text-[11px] text-gray-600 dark:text-gray-400 min-w-[150px] whitespace-normal leading-relaxed">
                    {item.batch}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{item.kemasan}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className={item.jamur === 'Ya' ? 'text-red-500 font-bold' : 'text-green-500'}>{item.jamur}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono">{item.kadarAir}%</td>
                  <td className="px-4 py-3 text-[11px] text-gray-700 dark:text-gray-300 whitespace-normal min-w-[220px] leading-relaxed">
                    {/* Hapus div box, tampilkan teks berwarna langsung */}
                    <div className="italic py-1">
                      {renderColoredNutrisi(item.nutrisi)}
                    </div>
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(item.hasil)}</td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">{formatCurrency(item.harga)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentData.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded">{item.tanggal}</span>
              <div className="flex flex-col items-end space-y-1">
                {getStatusBadge(item.hasil)}
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{formatCurrency(item.harga)}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white uppercase text-sm leading-tight">{item.toko}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800">{item.lokasi}</span>
                {item.npp && <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded uppercase">NPP: {formatNPP(item.npp)}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t dark:border-gray-700">
              {/* Kolom Kiri: Nutrisi & Kadar Air (Stacked Vertically) */}
              <div className="flex flex-col space-y-3">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase mb-0.5">Kandungan Nutrisi</div>
                  <div className="text-[11px] leading-relaxed italic text-gray-700 dark:text-gray-300">
                    {renderColoredNutrisi(item.nutrisi)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase mb-0.5">Kandungan Air</div>
                  <div className="text-xs font-mono font-bold text-gray-900 dark:text-white">{item.kadarAir}%</div>
                </div>
              </div>

              {/* Kolom Kanan: Jenis & Kedaluwarsa */}
              <div className="flex flex-col space-y-3">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase mb-0.5">Jenis / Merek</div>
                  <div className="text-xs font-semibold">{item.jenis}</div>
                  <div className="text-[10px] text-gray-500">{item.merek}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase mb-0.5">Kedaluwarsa</div>
                  <div className="text-xs whitespace-normal">{item.batch}</div>
                </div>
              </div>

              {/* Baris Terakhir: Kondisi */}
              <div className="col-span-2 pt-1">
                <div className="text-[10px] text-gray-400 uppercase mb-0.5">Kondisi Kemasan & Jamur</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                   {item.kemasan} • <span className={item.jamur === 'Ya' ? 'text-red-500 font-bold' : 'text-green-500'}>Jamur: {item.jamur}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-4">
          <button 
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-2 w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50 text-gray-500 transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="text-sm font-medium px-4 text-gray-600 dark:text-gray-400">Hal {page} / {totalPages}</span>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="p-2 w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50 text-gray-500 transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
