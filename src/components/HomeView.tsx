import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, HelpCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface HomeViewProps {
  onStart: () => void;
  hasProfile: boolean;
  profile: UserProfile | null;
  onViewMap: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onStart, 
  hasProfile, 
  onViewMap 
}) => {
  return (
    <div className="max-w-[640px] mx-auto py-8 px-4 text-left">
      {/* Pilot Scope Banner */}
      <div className="mb-6 p-3 bg-[#E6F2F0] border border-[#0F766E]/20 rounded-lg text-sm text-[#0F766E] flex items-center justify-between">
        <span className="font-medium">Tahap uji coba wilayah: Kepulauan Bangka Belitung</span>
        <span className="text-xs text-[#0F766E]/80">Fokus Pangan Olahan</span>
      </div>

      {/* Main Hero Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight mb-3">
        Urus legalitas usaha pangan Anda, mulai dari langkah yang benar.
      </h1>

      <p className="text-base sm:text-lg text-[#6B6F6C] leading-relaxed mb-8">
        Jawab beberapa pertanyaan. Anda akan tahu izin apa yang dibutuhkan, urutannya, dan dokumen apa yang perlu disiapkan.
      </p>

      {/* Primary Action Button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button
          onClick={onStart}
          className="h-12 px-6 bg-[#0F766E] hover:bg-[#0D655E] text-white text-base font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2"
        >
          <span>{hasProfile ? 'Ubah profil usaha' : 'Mulai cek (sekitar 5 menit)'}</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {hasProfile && (
          <button
            onClick={onViewMap}
            className="h-12 px-5 bg-white hover:bg-[#E6F2F0]/40 text-[#0F766E] border border-[#0F766E]/30 text-base font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150"
          >
            <span>Buka Peta Legalitas Anda</span>
          </button>
        )}
      </div>

      {/* Official Disclaimer Note */}
      <p className="text-sm text-[#6B6F6C] leading-relaxed mb-10 pb-6 border-b border-[#E5E7EB]">
        Panduan ini bukan keputusan perizinan. Pengajuan resmi tetap lewat OSS, SPP-IRT, dan BPJPH.
      </p>

      {/* Three Core Licenses Explained in 1 sentence */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-[#1C1917] mb-4">
          Tiga izin utama yang dipandu di aplikasi ini:
        </h2>

        <div className="space-y-4">
          <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-[#E6F2F0] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-bold text-[#1C1917] text-base mb-1">
                  NIB (Nomor Induk Berusaha)
                </h3>
                <p className="text-sm text-[#6B6F6C] leading-relaxed">
                  Identitas resmi dan izin dasar berusaha untuk semua jenis usaha di Indonesia, diterbitkan gratis melalui portal OSS RBA.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-[#E6F2F0] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-bold text-[#1C1917] text-base mb-1">
                  SPP-IRT (Sertifikat Pangan Industri Rumah Tangga)
                </h3>
                <p className="text-sm text-[#6B6F6C] leading-relaxed">
                  Izin edar produk olahan pangan yang diproduksi skala rumahan dengan masa simpan lebih dari 7 hari di suhu ruang.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-[#E6F2F0] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-bold text-[#1C1917] text-base mb-1">
                  Sertifikat Halal
                </h3>
                <p className="text-sm text-[#6B6F6C] leading-relaxed">
                  Jaminan resmi kehalalan produk pangan dari BPJPH, dengan fasilitas gratis jalur Self-Declare didampingi P3H bagi pelaku usaha mikro-kecil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Verification Footnote */}
      <div className="p-4 border border-[#E5E7EB] rounded-lg bg-[#FAFAF7] text-xs text-[#6B6F6C] space-y-1">
        <div className="font-semibold text-[#1C1917]">Penyusun Aturan:</div>
        <p>Berdasarkan Peraturan Pemerintah No. 5/2021 (OSS), Peraturan BPOM No. 22/2018 (PIRT), dan Keputusan Kepala BPJPH Kemenag.</p>
        <p className="text-[#0F766E] pt-1">Batas akhir penahapan wajib halal UMK: 17 Oktober 2028 (verifikasi di bpjph.halal.go.id).</p>
      </div>
    </div>
  );
};
