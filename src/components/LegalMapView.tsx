import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';
import { analyzeLegalMap, TERAKHIR_DIVERIFIKASI } from '../data/rules';
import { BABEL_DISTRICTS } from '../data/babel_directory';

interface LegalMapViewProps {
  profile: UserProfile;
  onProceedToReadiness: () => void;
  onProceedToRoadmap: () => void;
  onChangeProfile: () => void;
}

export const LegalMapView: React.FC<LegalMapViewProps> = ({
  profile,
  onProceedToReadiness,
  onProceedToRoadmap,
  onChangeProfile
}) => {
  const mapResult = analyzeLegalMap(profile);
  const district = BABEL_DISTRICTS[profile.regency] || BABEL_DISTRICTS.bangka;
  const [expandedWhy, setExpandedWhy] = useState<Record<string, boolean>>({});

  const toggleWhy = (id: string) => {
    setExpandedWhy(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sudah_ada':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-[#E6F2F0] text-[#0F766E]">
            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            Sudah Dimiliki
          </span>
        );
      case 'wajib':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-[#B42318]/10 text-[#B42318]">
            <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
            Wajib Langkah Pertama
          </span>
        );
      case 'dibutuhkan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-[#0F766E]/10 text-[#0F766E]">
            Dibutuhkan
          </span>
        );
      case 'perlu_reguler':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-[#B45309]/10 text-[#B45309]">
            Jalur Reguler (Audit LPH)
          </span>
        );
      case 'tidak_perlu':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-[#E5E7EB] text-[#6B6F6C]">
            Tidak Perlu
          </span>
        );
    }
  };

  return (
    <div className="max-w-[640px] mx-auto py-8 px-4 text-left">
      {/* Header Profile Summary */}
      <div className="mb-6 pb-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F766E]">Hasil Analisis</span>
          <h1 className="text-2xl font-bold text-[#1C1917] mt-0.5">Peta Legalitas Usaha Anda</h1>
          <p className="text-sm text-[#6B6F6C] mt-1">
            Wilayah usaha: <span className="font-semibold text-[#1C1917]">{district.nama}</span> | 
            Skala: <span className="font-semibold text-[#1C1917]">{profile.scale === 'mikro' ? 'Mikro' : 'Kecil'}</span>
          </p>
        </div>

        <button
          onClick={onChangeProfile}
          className="text-xs font-medium text-[#0F766E] hover:underline cursor-pointer self-start sm:self-center"
        >
          Ubah Jawaban Profil
        </button>
      </div>

      {/* Non-food notice if applicable */}
      {mapResult.isNonFood && (
        <div className="mb-6 p-4 rounded-lg bg-[#E6F2F0] border border-[#0F766E]/20 text-[#1C1917]">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <div className="font-semibold text-sm">Produk Anda terdeteksi Non-Pangan (Kerajinan/Jasa)</div>
              <p className="text-sm text-[#6B6F6C] mt-1">
                Catatan: Jalur non-pangan belum tersedia di versi ini. Anda hanya membutuhkan NIB (Nomor Induk Berusaha) sebagai dasar legalitas formal usaha Anda.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Halal Recommendation Banner */}
      {!mapResult.isNonFood && (
        <div className="mb-6 p-4 rounded-lg bg-white border border-[#E5E7EB]">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">Rekomendasi Jalur Halal</span>
            <span className="text-xs text-[#6B6F6C]">Batas: {mapResult.deadlineHalal}</span>
          </div>
          <div className="font-semibold text-base text-[#1C1917] mb-1">
            {mapResult.halalPath === 'self_declare' 
              ? 'Fasilitas Gratis: Jalur Self-Declare dengan Pendamping P3H' 
              : 'Jalur Halal Reguler (Pemeriksaan Auditor LPH)'}
          </div>
          <p className="text-sm text-[#6B6F6C] leading-relaxed">
            {mapResult.halalPathReason}
          </p>
          <div className="mt-2 text-xs text-[#0F766E]">
            * Catatan penahapan UMK sampai 17 Oktober 2028. Cek pembaruan di <a href="https://bpjph.halal.go.id" target="_blank" rel="noopener noreferrer" className="underline font-medium">bpjph.halal.go.id</a>.
          </div>
        </div>
      )}

      {/* Cards for NIB, PIRT, and Halal */}
      <div className="space-y-4 mb-8">
        {mapResult.licenses.map((lic) => {
          const isExpanded = !!expandedWhy[lic.id];

          return (
            <div 
              key={lic.id} 
              className={`border rounded-lg bg-white transition-all duration-150 ${
                lic.status === 'wajib' 
                  ? 'border-[#0F766E]/40' 
                  : 'border-[#E5E7EB]'
              }`}
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg text-[#1C1917]">
                    {lic.nama}
                  </h3>
                  {getStatusBadge(lic.status)}
                </div>

                {/* 1 Sentence Reason */}
                <p className="text-sm text-[#1C1917] leading-relaxed mb-3">
                  {lic.alasan}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B6F6C] py-2 border-y border-[#E5E7EB]/60 mb-3">
                  <div>
                    <span className="font-semibold text-[#1C1917]">Portal Resmi: </span>
                    <a 
                      href={lic.portalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0F766E] hover:underline inline-flex items-center gap-1"
                    >
                      {lic.portalNama}
                      <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-[#1C1917]">Biaya Pemerintah: </span>
                    <span>{lic.biaya}</span>
                  </div>
                </div>

                {/* Kenapa Saya Perlu Ini Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleWhy(lic.id)}
                    className="text-sm font-medium text-[#0F766E] hover:text-[#0D655E] flex items-center gap-1.5 cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
                    <span>Kenapa saya perlu ini?</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 ml-0.5" strokeWidth={1.5} />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-0.5" strokeWidth={1.5} />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-3.5 bg-[#FAFAF7] rounded border border-[#E5E7EB] text-sm text-[#1C1917] leading-relaxed space-y-2">
                      <p>{lic.penjelasanKenapa}</p>
                      {lic.prasyarat.length > 0 && (
                        <div className="pt-2 border-t border-[#E5E7EB]">
                          <span className="font-semibold text-xs text-[#6B6F6C] block mb-1">Syarat yang perlu disiapkan:</span>
                          <ul className="list-disc pl-4 text-xs text-[#6B6F6C] space-y-0.5">
                            {lic.prasyarat.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification & Official Check Notice */}
      <div className="p-3.5 bg-[#FAFAF7] border border-[#E5E7EB] rounded-lg text-xs text-[#6B6F6C] mb-8 space-y-1">
        <div className="flex items-center justify-between">
          <span>Terakhir diverifikasi: <strong className="text-[#1C1917]">{TERAKHIR_DIVERIFIKASI}</strong></span>
          <span className="text-[#0F766E] font-medium">Cek ulang di sumber resmi</span>
        </div>
        <p className="pt-1">
          Regulasi: PP 5/2021 (OSS RBA), PerBPOM 22/2018 (PIRT), Keputusan Kepala BPJPH (Jaminan Produk Halal).
        </p>
      </div>

      {/* Bottom Action Flow */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onProceedToReadiness}
          className="h-12 px-6 bg-[#0F766E] hover:bg-[#0D655E] text-white text-base font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          <span>Lanjut ke Cek Kesiapan Syarat</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <button
          onClick={onProceedToRoadmap}
          className="h-12 px-5 bg-white hover:bg-[#FAFAF7] text-[#1C1917] border border-[#E5E7EB] text-base font-medium rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150"
        >
          <span>Lihat Roadmap & Kontak Babel</span>
        </button>
      </div>
    </div>
  );
};
