import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasProfile: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, hasProfile }) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'wizard', label: hasProfile ? 'Profil Usaha' : 'Mulai Cek' },
    { id: 'peta', label: 'Peta Legalitas' },
    { id: 'kesiapan', label: 'Cek Kesiapan' },
    { id: 'roadmap', label: 'Roadmap & Direktori' },
    { id: 'kit', label: 'Kit Dokumen' },
    { id: 'tanya', label: 'Tanya Aturan' },
    { id: 'pantau', label: 'Pantau Progres' },
  ];

  return (
    <header className="border-b border-[#E5E7EB] bg-[#FAFAF7] sticky top-0 z-40 no-print">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('beranda')}
            className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded p-0.5"
            aria-label="Kembali ke beranda Jalur Legal"
          >
            <div className="font-bold text-lg text-[#1C1917] tracking-tight leading-tight">
              Jalur Legal
            </div>
            <div className="text-xs text-[#6B6F6C] font-normal tracking-normal">
              UMKM Indonesia
            </div>
          </button>
          
          <div className="sm:hidden inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#E6F2F0] text-[#0F766E]">
            Uji Coba Babel
          </div>
        </div>

        <div className="hidden sm:inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-[#E6F2F0] text-[#0F766E]">
          Uji Coba Wilayah Bangka Belitung
        </div>
      </div>

      {/* Horizontal Scroll Navigation */}
      <nav aria-label="Navigasi Utama" className="max-w-4xl mx-auto px-4 border-t border-[#E5E7EB] overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-sm rounded font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  isActive
                    ? 'bg-[#0F766E] text-white'
                    : 'text-[#6B6F6C] hover:text-[#1C1917] hover:bg-[#E6F2F0]/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
