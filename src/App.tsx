import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { WizardView } from './components/WizardView';
import { LegalMapView } from './components/LegalMapView';
import { ReadinessView } from './components/ReadinessView';
import { RoadmapView } from './components/RoadmapView';
import { DocumentKitView } from './components/DocumentKitView';
import { AskRulesView } from './components/AskRulesView';
import { TrackerView } from './components/TrackerView';
import { UserProfile } from './types';
import { TERAKHIR_DIVERIFIKASI, BATAS_AKHIR_WAJIB_HALAL_UMK } from './data/rules';

const STORAGE_KEY_PROFILE = 'jalur_legal_profile_v1';

// Default example profile for fast exploratory testing / demo
const DEFAULT_DEMO_PROFILE: UserProfile = {
  productType: 'makanan_kering',
  regency: 'bangka',
  scale: 'mikro',
  productionPlace: 'rumah',
  hasNIB: 'belum',
  hasPIRT: 'belum',
  hasHalal: 'belum',
  hasAnimalIngredients: 'ya',
  hasAdditives: 'tidak',
  productCount: '1_5',
  businessName: 'Dapur Kemplang Berkah',
  businessAddress: 'Sungailiat, Kabupaten Bangka, Kepulauan Bangka Belitung',
  primaryProductName: 'Kemplang Panggang Ikan Tenggiri Asli Bangka'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  // Handle autostart query parameter for testing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      if (!profile) {
        setProfile(DEFAULT_DEMO_PROFILE);
      }
      setActiveTab('peta');
    }
  }, []);

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
    setActiveTab('peta');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1C1917] flex flex-col font-sans">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        hasProfile={!!profile} 
      />

      <main className="flex-1 w-full pb-16">
        {activeTab === 'beranda' && (
          <HomeView
            onStart={() => handleTabChange('wizard')}
            hasProfile={!!profile}
            profile={profile}
            onViewMap={() => handleTabChange('peta')}
          />
        )}

        {activeTab === 'wizard' && (
          <WizardView
            initialProfile={profile}
            onComplete={handleProfileComplete}
            onCancel={() => handleTabChange('beranda')}
          />
        )}

        {activeTab === 'peta' && (
          <LegalMapView
            profile={profile || DEFAULT_DEMO_PROFILE}
            onProceedToReadiness={() => handleTabChange('kesiapan')}
            onProceedToRoadmap={() => handleTabChange('roadmap')}
            onChangeProfile={() => handleTabChange('wizard')}
          />
        )}

        {activeTab === 'kesiapan' && (
          <ReadinessView
            profile={profile || DEFAULT_DEMO_PROFILE}
            onProceedToRoadmap={() => handleTabChange('roadmap')}
            onProceedToKit={() => handleTabChange('kit')}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            profile={profile || DEFAULT_DEMO_PROFILE}
            onProceedToKit={() => handleTabChange('kit')}
            onProceedToTracker={() => handleTabChange('pantau')}
          />
        )}

        {activeTab === 'kit' && (
          <DocumentKitView
            profile={profile || DEFAULT_DEMO_PROFILE}
            onProceedToChat={() => handleTabChange('tanya')}
            onProceedToTracker={() => handleTabChange('pantau')}
          />
        )}

        {activeTab === 'tanya' && (
          <AskRulesView
            profile={profile}
            onProceedToTracker={() => handleTabChange('pantau')}
          />
        )}

        {activeTab === 'pantau' && (
          <TrackerView
            profile={profile}
            onBackToMap={() => handleTabChange('peta')}
          />
        )}
      </main>

      {/* Public Service Footer */}
      <footer className="border-t border-[#E5E7EB] bg-[#FAFAF7] py-6 px-4 text-xs text-[#6B6F6C] no-print">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
          <div>
            <div className="font-bold text-[#1C1917]">Jalur Legal UMKM Indonesia</div>
            <div>Tahap uji coba wilayah: Kepulauan Bangka Belitung. Terakhir diverifikasi: {TERAKHIR_DIVERIFIKASI}.</div>
          </div>
          <div className="text-left sm:text-right text-[11px]">
            <div>Batas penahapan wajib halal UMK: <strong>{BATAS_AKHIR_WAJIB_HALAL_UMK}</strong></div>
            <div className="text-[#0F766E]">Portal resmi: oss.go.id • sppirt.pom.go.id • bpjph.halal.go.id</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
