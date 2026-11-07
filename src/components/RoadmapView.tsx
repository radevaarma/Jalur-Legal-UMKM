import React, { useState } from 'react';
import { ExternalLink, Building2, MapPin, Phone, FileCheck, ArrowRight } from 'lucide-react';
import { UserProfile, RegencyBabel } from '../types';
import { BABEL_DISTRICTS } from '../data/babel_directory';

interface RoadmapViewProps {
  profile: UserProfile;
  onProceedToKit: () => void;
  onProceedToTracker: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  profile,
  onProceedToKit,
  onProceedToTracker
}) => {
  const [selectedRegency, setSelectedRegency] = useState<RegencyBabel>(profile.regency || 'bangka');
  const district = BABEL_DISTRICTS[selectedRegency] || BABEL_DISTRICTS.bangka;

  const isNonFood = profile.productType === 'non_pangan';
  const hasNib = profile.hasNIB === 'ya';
  const hasPirt = profile.hasPIRT === 'ya';

  return (
    <div className="max-w-[640px] mx-auto py-8 px-4 text-left">
      <div className="mb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F766E]">Langkah 5</span>
        <h1 className="text-2xl font-bold text-[#1C1917] mt-0.5">Roadmap Langkah & Direktori Babel</h1>
        <p className="text-sm text-[#6B6F6C] mt-1">
          Ikuti langkah berurutan di bawah ini. Buka portal resmi pemerintah saat Anda siap mengajukan.
        </p>
      </div>

      {/* Sequential Roadmap Steps */}
      <div className="space-y-4 mb-10">
        {/* Step 1: NIB */}
        <div className={`p-4 sm:p-5 rounded-lg border bg-white ${hasNib ? 'border-[#0F766E]/30 bg-[#E6F2F0]/20' : 'border-[#E5E7EB]'}`}>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
              hasNib ? 'bg-[#0F766E] text-white' : 'bg-[#E6F2F0] text-[#0F766E]'
            }`}>
              1
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-base text-[#1C1917]">
                  Langkah 1: Terbitkan NIB di OSS RBA
                </h3>
                {hasNib && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#E6F2F0] text-[#0F766E]">
                    Sudah Anda Miliki
                  </span>
                )}
              </div>
              <p className="text-sm text-[#6B6F6C] mt-1 leading-relaxed">
                NIB (Nomor Induk Berusaha) wajib diurus pertama kali. Daftarkan usaha Anda dengan KTP dan pilih KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) industri makanan rumahan Anda (misal KBLI 10794 untuk industri kerupuk/kemplang).
              </p>
              
              <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-[#6B6F6C]">
                  Portal Resmi: <strong>oss.go.id</strong> (Gratis, terbit instan)
                </div>
                <a
                  href="https://oss.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:underline"
                >
                  <span>Buka Portal OSS</span>
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: PIRT (Skip if non-food) */}
        {!isNonFood && (
          <div className={`p-4 sm:p-5 rounded-lg border bg-white ${hasPirt ? 'border-[#0F766E]/30 bg-[#E6F2F0]/20' : 'border-[#E5E7EB]'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
                hasPirt ? 'bg-[#0F766E] text-white' : 'bg-[#E6F2F0] text-[#0F766E]'
              }`}>
                2
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-base text-[#1C1917]">
                    Langkah 2: Ikuti PKP di Dinkes & Ajukan SPP-IRT di BPOM
                  </h3>
                  {hasPirt && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#E6F2F0] text-[#0F766E]">
                      Sudah Anda Miliki
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B6F6C] mt-1 leading-relaxed">
                  Setelah punya NIB, daftarkan akun di portal SPP-IRT BPOM. Hubungi Dinas Kesehatan {district.nama} untuk jadwal Penyuluhan Keamanan Pangan (PKP). Nomor SPP-IRT otomatis terbit, lalu Anda punya waktu 3 bulan untuk verifikasi kebersihan dapur/sarana.
                </p>

                <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-[#6B6F6C]">
                    Portal Resmi: <strong>sppirt.pom.go.id</strong>
                  </div>
                  <a
                    href="https://sppirt.pom.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:underline"
                  >
                    <span>Buka Portal SPP-IRT</span>
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Halal (Skip if non-food) */}
        {!isNonFood && (
          <div className="p-4 sm:p-5 rounded-lg border border-[#E5E7EB] bg-white">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E6F2F0] text-[#0F766E] flex items-center justify-center shrink-0 font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-base text-[#1C1917]">
                    Langkah 3: Ajukan Sertifikat Halal di SIHALAL BPJPH
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                    Batas UMK: 17 Okt 2028
                  </span>
                </div>
                <p className="text-sm text-[#6B6F6C] mt-1 leading-relaxed">
                  Gunakan akun SIHALAL di ptsp.halal.go.id. Untuk kemplang dan kerupuk olahan rumahan di Bangka Belitung, hubungi P3H (Pendamping Halal) dari Kemenag atau ormas Islam setempat untuk verifikasi bahan gratis melalui program Sehati.
                </p>

                <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-[#6B6F6C]">
                    Portal Resmi: <strong>ptsp.halal.go.id</strong> / <strong>bpjph.halal.go.id</strong>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://ptsp.halal.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:underline"
                    >
                      <span>SIHALAL PTSP</span>
                      <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* District Directory Babel Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1C1917]">
              Direktori Instansi Resmi di Bangka Belitung
            </h2>
            <p className="text-xs text-[#6B6F6C]">
              Pilih kabupaten/kota Anda untuk melihat alamat kantor Dinas terkait.
            </p>
          </div>

          <label className="sr-only" htmlFor="regency-select">Pilih Kabupaten/Kota</label>
          <select
            id="regency-select"
            value={selectedRegency}
            onChange={(e) => setSelectedRegency(e.target.value as RegencyBabel)}
            className="h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#1C1917] font-medium focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          >
            <option value="bangka">Kabupaten Bangka</option>
            <option value="bangka_barat">Kabupaten Bangka Barat</option>
            <option value="bangka_tengah">Kabupaten Bangka Tengah</option>
            <option value="bangka_selatan">Kabupaten Bangka Selatan</option>
            <option value="belitung">Kabupaten Belitung</option>
            <option value="belitung_timur">Kabupaten Belitung Timur</option>
            <option value="pangkalpinang">Kota Pangkalpinang</option>
            <option value="luar_babel">Di Luar Babel</option>
          </select>
        </div>

        <div className="space-y-3">
          {/* 1. Dinkes */}
          <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
            <div className="flex items-start gap-2.5 mb-2">
              <Building2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-bold text-sm text-[#1C1917]">{district.dinkes.nama}</h3>
                <span className="text-xs text-[#0F766E] font-medium">Urusan: Sertifikat PKP & Rekomendasi PIRT</span>
              </div>
            </div>
            <div className="text-xs text-[#6B6F6C] space-y-1 pl-6">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" />
                <span>{district.dinkes.alamat}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                <span>Telepon: {district.dinkes.telepon}</span>
              </div>
            </div>
          </div>

          {/* 2. DPMPTSP */}
          <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
            <div className="flex items-start gap-2.5 mb-2">
              <Building2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-bold text-sm text-[#1C1917]">{district.dpmptsp.nama}</h3>
                <span className="text-xs text-[#0F766E] font-medium">Urusan: Bimbingan NIB & Layanan OSS RBA</span>
              </div>
            </div>
            <div className="text-xs text-[#6B6F6C] space-y-1 pl-6">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" />
                <span>{district.dpmptsp.alamat}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                <span>Telepon: {district.dpmptsp.telepon}</span>
              </div>
            </div>
          </div>

          {/* 3. Dinkop */}
          <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
            <div className="flex items-start gap-2.5 mb-2">
              <Building2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-bold text-sm text-[#1C1917]">{district.dinkop.nama}</h3>
                <span className="text-xs text-[#0F766E] font-medium">Urusan: Fasilitasi Halal Sehati & Pembinaan UMKM</span>
              </div>
            </div>
            <div className="text-xs text-[#6B6F6C] space-y-1 pl-6">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" />
                <span>{district.dinkop.alamat}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                <span>Telepon: {district.dinkop.telepon}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
        <button
          onClick={onProceedToKit}
          className="h-12 px-6 bg-[#0F766E] hover:bg-[#0D655E] text-white text-base font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150"
        >
          <span>Lanjut ke Kit Dokumen (Daftar Bahan & Label)</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <button
          onClick={onProceedToTracker}
          className="h-12 px-5 bg-white hover:bg-[#FAFAF7] text-[#1C1917] border border-[#E5E7EB] text-base font-medium rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150"
        >
          <span>Buka Pantau Progres & Cetak</span>
        </button>
      </div>
    </div>
  );
};
