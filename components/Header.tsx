
import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  // Menggunakan format link Google Drive yang lebih stabil untuk embedding gambar
  const logoUrl = "https://lh3.googleusercontent.com/d/1MBxX9s1OtNvcIGVwAjvCGTcJCSjajPvM";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 ring-2 ring-primary-500/20 shadow-inner">
            <img 
              src={logoUrl} 
              alt="FeedCheck Pro Logo" 
              className="w-full h-full object-cover transition-opacity duration-300"
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Jika masih gagal, gunakan avatar generator sebagai cadangan terakhir
                if (!target.src.includes('ui-avatars')) {
                   target.src = 'https://ui-avatars.com/api/?name=Feed+Check&background=16a34a&color=fff';
                }
              }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary-700 to-green-500 bg-clip-text text-transparent leading-none">
              CekPakan Kasongan
            </h1>
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-0.5">
              FeedCheck Pro
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-600"
            title={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
          >
            <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-primary-600'} text-lg`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
