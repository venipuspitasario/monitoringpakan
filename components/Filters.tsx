
import React from 'react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  locations: string[];
  brands: string[];
  onExport: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, locations, brands, onExport }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleSortOrder = () => {
    setFilters(prev => ({ ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Cari toko, merek, pakan..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>

        <select
          name="lokasi"
          value={filters.lokasi}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="">Semua Lokasi</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <select
          name="merek"
          value={filters.merek}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="">Semua Merek</option>
          {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
        </select>

        <select
          name="hasil"
          value={filters.hasil}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="">Semua Status</option>
          <option value="Layak">Layak</option>
          <option value="Tindak Lanjut">Perlu Tindak Lanjut</option>
          <option value="Tidak Layak">Tidak Layak</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border dark:border-gray-600">
            <span className="px-3 py-1.5 text-sm text-gray-500 border-r dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
              Urutkan Tanggal
            </span>
            <button 
              onClick={toggleSortOrder}
              className="px-3 py-1.5 text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              title="Balik Urutan"
            >
              <i className={`fas ${filters.sortOrder === 'asc' ? 'fa-sort-amount-up' : 'fa-sort-amount-down'}`}></i>
            </button>
          </div>

          <select
            name="jamur"
            value={filters.jamur}
            onChange={handleChange}
            className="text-sm bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg border dark:border-gray-600 outline-none"
          >
            <option value="">Semua Jamur</option>
            <option value="Ya">Ada Jamur</option>
            <option value="Tidak">Bebas Jamur</option>
          </select>
        </div>

        <button 
          onClick={onExport}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <i className="fas fa-file-export"></i>
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
};

export default Filters;
