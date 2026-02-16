
import React, { useState, useEffect } from 'react';
import { FeedData, FilterState } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import Header from './components/Header.tsx';
import { fetchFeedData } from './services/api.ts';

const App: React.FC = () => {
  const [data, setData] = useState<FeedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    lokasi: '',
    merek: '',
    hasil: '',
    jamur: '',
    sortField: 'tanggal',
    sortOrder: 'desc',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchFeedData();
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Error loading data:", err);
        setError('Gagal memuat data dari API. Mencoba menggunakan data cadangan.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen flex flex-col">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 flex items-center shadow-sm rounded-r-md">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {error}
          </div>
        )}
        <Dashboard 
          data={data} 
          filters={filters} 
          setFilters={setFilters} 
          loading={loading} 
        />
      </main>
      <footer className="bg-white dark:bg-gray-800 py-6 border-t dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()}{' '}
          <a 
            href="https://wa.me/6282223082964" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary-600 transition-colors duration-200 underline decoration-dotted underline-offset-4"
          >
            VeniPuspitasari CekPakan
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
