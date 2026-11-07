import React, { useState } from 'react';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { 
  UserProfile, 
  ProductType, 
  RegencyBabel, 
  BusinessScale, 
  ProductionPlace, 
  OwnershipStatus, 
  AnimalIngredientStatus, 
  AdditiveStatus, 
  ProductCountRange 
} from '../types';

interface WizardViewProps {
  initialProfile: UserProfile | null;
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

export const WizardView: React.FC<WizardViewProps> = ({ 
  initialProfile, 
  onComplete, 
  onCancel 
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 10;

  // Form State
  const [productType, setProductType] = useState<ProductType>(initialProfile?.productType || 'makanan_kering');
  const [regency, setRegency] = useState<RegencyBabel>(initialProfile?.regency || 'bangka');
  const [scale, setScale] = useState<BusinessScale>(initialProfile?.scale || 'mikro');
  const [productionPlace, setProductionPlace] = useState<ProductionPlace>(initialProfile?.productionPlace || 'rumah');
  const [hasNIB, setHasNIB] = useState<OwnershipStatus>(initialProfile?.hasNIB || 'belum');
  const [hasPIRT, setHasPIRT] = useState<OwnershipStatus>(initialProfile?.hasPIRT || 'belum');
  const [hasHalal, setHasHalal] = useState<OwnershipStatus>(initialProfile?.hasHalal || 'belum');
  const [hasAnimalIngredients, setHasAnimalIngredients] = useState<AnimalIngredientStatus>(initialProfile?.hasAnimalIngredients || 'ya');
  const [hasAdditives, setHasAdditives] = useState<AdditiveStatus>(initialProfile?.hasAdditives || 'tidak');
  const [productCount, setProductCount] = useState<ProductCountRange>(initialProfile?.productCount || '1_5');

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const finalProfile: UserProfile = {
        productType,
        regency,
        scale,
        productionPlace,
        hasNIB,
        hasPIRT,
        hasHalal,
        hasAnimalIngredients,
        hasAdditives,
        productCount,
        businessName: initialProfile?.businessName || '',
        businessAddress: initialProfile?.businessAddress || '',
        primaryProductName: initialProfile?.primaryProductName || ''
      };
      onComplete(finalProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onCancel();
    }
  };

  return (
    <div className="max-w-[640px] mx-auto py-8 px-4 text-left">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-[#6B6F6C] mb-2">
          <span>Langkah {step} dari {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% selesai</span>
        </div>
        <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#0F766E] h-full transition-all duration-150"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Screen Content per Step */}
      <div className="transition-opacity duration-150 min-h-[340px]">
        {step === 1 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Apa jenis produk yang Anda buat?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              Pilih kategori yang paling sesuai dengan produk utama usaha Anda saat ini.
            </p>
            <div className="space-y-3">
              {[
                { 
                  id: 'makanan_kering', 
                  title: 'Makanan kering', 
                  desc: 'Kerupuk kemplang, getas, kripik pisang, kue kering, dsb. (tahan > 7 hari di suhu ruang)' 
                },
                { 
                  id: 'makanan_basah', 
                  title: 'Makanan basah / cepat basi', 
                  desc: 'Lempah kuning siap saji, pempek basah, kue basah (tahan < 7 hari)' 
                },
                { 
                  id: 'minuman', 
                  title: 'Minuman', 
                  desc: 'Sirup jeruk kunci, serbuk jahe, teh herbal kemasan' 
                },
                { 
                  id: 'non_pangan', 
                  title: 'Kerajinan atau bukan pangan', 
                  desc: 'Kain tenun cual, suvenir, kerajinan timah atau lidi nipah' 
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProductType(item.id as ProductType)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    productType === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    productType === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {productType === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Di kabupaten atau kota mana lokasi usaha Anda?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              Aplikasi akan mencocokkan kontak Dinas Kesehatan dan DPMPTSP di daerah Anda.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'bangka', label: 'Kabupaten Bangka (Sungailiat)' },
                { id: 'bangka_barat', label: 'Kabupaten Bangka Barat (Muntok)' },
                { id: 'bangka_tengah', label: 'Kabupaten Bangka Tengah (Koba)' },
                { id: 'bangka_selatan', label: 'Kabupaten Bangka Selatan (Toboali)' },
                { id: 'belitung', label: 'Kabupaten Belitung (Tanjungpandan)' },
                { id: 'belitung_timur', label: 'Kabupaten Belitung Timur (Manggar)' },
                { id: 'pangkalpinang', label: 'Kota Pangkalpinang' },
                { id: 'luar_babel', label: 'Di luar Kepulauan Bangka Belitung' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRegency(item.id as RegencyBabel)}
                  className={`text-left p-3.5 rounded-lg border cursor-pointer transition-all duration-150 flex items-center justify-between gap-2 ${
                    regency === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <span className="font-medium text-sm sm:text-base text-[#1C1917]">{item.label}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    regency === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {regency === item.id && <Check className="w-3 h-3" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Berapa perkiraan skala usaha Anda?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              Skala modal menentukan jalur fasilitas sertifikasi gratis dari pemerintah.
            </p>
            <div className="space-y-3">
              {[
                { 
                  id: 'mikro', 
                  title: 'Usaha Mikro', 
                  desc: 'Modal usaha di bawah Rp 1 miliar (tidak termasuk tanah & bangunan tempat usaha). Sebagian besar usaha rumahan masuk kategori ini.' 
                },
                { 
                  id: 'kecil', 
                  title: 'Usaha Kecil', 
                  desc: 'Modal usaha lebih dari Rp 1 miliar sampai dengan Rp 5 miliar.' 
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setScale(item.id as BusinessScale)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    scale === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    scale === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {scale === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Di mana tempat Anda memproduksi produk ini?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              PIRT dirancang untuk produksi di tempat tinggal, sedangkan pabrik terpisah diarahkan ke izin BPOM MD.
            </p>
            <div className="space-y-3">
              {[
                { 
                  id: 'rumah', 
                  title: 'Di rumah / tempat tinggal sendiri', 
                  desc: 'Memakai dapur rumah atau ruang tambahan di lingkungan tempat tinggal.' 
                },
                { 
                  id: 'tempat_khusus', 
                  title: 'Tempat khusus / workshop / pabrik terpisah', 
                  desc: 'Bangunan terpisah khusus pengolahan pangan yang terpisah dari rumah tinggal.' 
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProductionPlace(item.id as ProductionPlace)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    productionPlace === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    productionPlace === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {productionPlace === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Apakah Anda sudah memiliki NIB?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              NIB (Nomor Induk Berusaha) adalah identitas resmi pelaku usaha yang diterbitkan oleh sistem OSS.
            </p>
            <div className="space-y-3">
              {[
                { id: 'ya', title: 'Sudah punya', desc: 'Saya sudah mendaftar dan memegang lembar NIB dari OSS.' },
                { id: 'belum', title: 'Belum punya', desc: 'Saya belum pernah mendaftar NIB di OSS.' },
                { id: 'tidak_tahu', title: 'Tidak tahu / ragu', desc: 'Saya pernah mengurus surat usaha di desa/kelurahan tapi tidak yakin NIB.' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHasNIB(item.id as OwnershipStatus)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    hasNIB === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    hasNIB === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {hasNIB === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Apakah Anda sudah memiliki izin PIRT?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              PIRT (Sertifikat Produksi Pangan Industri Rumah Tangga) adalah nomor izin edar pangan dari Dinas Kesehatan/BPOM.
            </p>
            <div className="space-y-3">
              {[
                { id: 'ya', title: 'Sudah punya', desc: 'Produk saya sudah memiliki nomor P-IRT yang masih berlaku.' },
                { id: 'belum', title: 'Belum punya', desc: 'Saya belum memiliki izin P-IRT untuk produk ini.' },
                { id: 'tidak_tahu', title: 'Tidak tahu / kedaluwarsa', desc: 'Pernah punya nomor lama atau belum tahu statusnya.' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHasPIRT(item.id as OwnershipStatus)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    hasPIRT === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    hasPIRT === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {hasPIRT === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Apakah produk Anda sudah bersertifikat halal?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              Sertifikat halal resmi diterbitkan oleh BPJPH Kementerian Agama (dengan logo Halal Indonesia ungu).
            </p>
            <div className="space-y-3">
              {[
                { id: 'ya', title: 'Sudah punya', desc: 'Sudah terbit sertifikat halal resmi berlogo Halal Indonesia.' },
                { id: 'belum', title: 'Belum punya', desc: 'Belum pernah mengurus sertifikat halal.' },
                { id: 'tidak_tahu', title: 'Sedang proses / tidak tahu', desc: 'Pernah didata atau sedang menunggu pengumuman.' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHasHalal(item.id as OwnershipStatus)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    hasHalal === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    hasHalal === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {hasHalal === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Apakah produk Anda menggunakan bahan hewani?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              Bahan hewani seperti ikan tenggiri, cumi, udang, daging sapi/ayam, telur, atau susu.
            </p>
            <div className="space-y-3">
              {[
                { 
                  id: 'ya', 
                  title: 'Ya, ada bahan hewani', 
                  desc: 'Contoh: ikan tenggiri untuk kemplang, udang ebi, terasi, telur, atau daging.' 
                },
                { 
                  id: 'tidak', 
                  title: 'Tidak ada, murni bahan nabati', 
                  desc: 'Hanya menggunakan bahan tumbuhan seperti singkong, pisang, kelapa, cabai, kacang.' 
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHasAnimalIngredients(item.id as AnimalIngredientStatus)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    hasAnimalIngredients === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    hasAnimalIngredients === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {hasAnimalIngredients === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 9 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Apakah Anda memakai bahan tambahan (pewarna, perisa, pengawet)?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              Bahan Tambahan Pangan (BTP) perlu dicantumkan pada draf label dan dibuktikan kehalalannya.
            </p>
            <div className="space-y-3">
              {[
                { 
                  id: 'tidak', 
                  title: 'Tidak, hanya bumbu alami', 
                  desc: 'Hanya garam, gula, bawang putih, lada, tanpa pengawet sintetis.' 
                },
                { 
                  id: 'ya', 
                  title: 'Ya, ada bahan tambahan pangan', 
                  desc: 'Menggunakan pewarna makanan, penyedap rasa kemasan (MSG), perisa, atau pengawet.' 
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHasAdditives(item.id as AdditiveStatus)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    hasAdditives === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    hasAdditives === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {hasAdditives === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 10 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">
              Berapa jumlah nama produk atau varian yang ingin didaftarkan?
            </h2>
            <p className="text-sm text-[#6B6F6C] mb-6">
              Jalur halal gratis (Self-Declare) membatasi maksimal 10 nama produk per pengajuan.
            </p>
            <div className="space-y-3">
              {[
                { 
                  id: '1_5', 
                  title: '1 sampai 5 produk', 
                  desc: 'Contoh: Kemplang Panggang Asli, Kemplang Goreng Tenggiri (sangat ideal untuk tahap awal).' 
                },
                { 
                  id: '6_10', 
                  title: '6 sampai 10 produk', 
                  desc: 'Masih masuk kuota batas maksimal program gratis Halal Self-Declare.' 
                },
                { 
                  id: 'lebih_dari_10', 
                  title: 'Lebih dari 10 produk', 
                  desc: 'Perlu dipilah menjadi prioritas atau menggunakan jalur reguler berbayar.' 
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProductCount(item.id as ProductCountRange)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 ${
                    productCount === item.id 
                      ? 'border-[#0F766E] bg-[#E6F2F0]/40' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#6B6F6C]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base text-[#1C1917]">{item.title}</div>
                    <div className="text-sm text-[#6B6F6C] mt-0.5">{item.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    productCount === item.id ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-[#E5E7EB]'
                  }`}>
                    {productCount === item.id && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="h-12 px-4 rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#FAFAF7] text-[#1C1917] text-sm font-medium flex items-center gap-2 cursor-pointer transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>{step === 1 ? 'Kembali ke Beranda' : 'Sebelumnya'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="h-12 px-6 rounded-lg bg-[#0F766E] hover:bg-[#0D655E] text-white text-base font-semibold flex items-center gap-2 cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          <span>{step === totalSteps ? 'Simpan & Lihat Peta Legalitas' : 'Lanjut'}</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-4 text-center">
        <span className="text-xs text-[#6B6F6C]">
          Kami tidak pernah meminta NIK KTP, password, atau nomor rahasia Anda.
        </span>
      </div>
    </div>
  );
};
