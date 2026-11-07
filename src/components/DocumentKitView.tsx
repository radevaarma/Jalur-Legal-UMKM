import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserProfile, IngredientItem, LabelPackagingDraft } from '../types';

interface DocumentKitViewProps {
  profile: UserProfile;
  onProceedToChat: () => void;
  onProceedToTracker: () => void;
}

const DEFAULT_KEMPLANG_INGREDIENTS: IngredientItem[] = [
  {
    id: 'ing-1',
    nama: 'Ikan tenggiri giling',
    fungsi: 'Bahan baku utama',
    merekPemasok: 'Nelayan lokal Bangka',
    buktiHalal: 'ada',
    isAnimalOrAdditive: true,
    keteranganHalal: 'Ikan laut segar (bahan alami halal tanpa sembelihan)'
  },
  {
    id: 'ing-2',
    nama: 'Tepung tapioka',
    fungsi: 'Pengikat tekstur renyah',
    merekPemasok: 'Tepung Sagu Tani Bangka',
    buktiHalal: 'ada',
    isAnimalOrAdditive: false,
    keteranganHalal: 'Sudah bersertifikat halal BPJPH'
  },
  {
    id: 'ing-3',
    nama: 'Garam beryodium',
    fungsi: 'Pemberi rasa gurih & pengawet alami',
    merekPemasok: 'Garam Cap Kapal',
    buktiHalal: 'ada',
    isAnimalOrAdditive: false,
    keteranganHalal: 'Bahan mineral alami bersertifikat'
  },
  {
    id: 'ing-4',
    nama: 'Bawang putih segar',
    fungsi: 'Bumbu penyedap aroma',
    merekPemasok: 'Pasar Tradisional Sungailiat',
    buktiHalal: 'ada',
    isAnimalOrAdditive: false,
    keteranganHalal: 'Bahan nabati murni (positif list)'
  },
  {
    id: 'ing-5',
    nama: 'Gula pasir',
    fungsi: 'Penyeimbang rasa',
    merekPemasok: 'Gulaku',
    buktiHalal: 'ada',
    isAnimalOrAdditive: false,
    keteranganHalal: 'Bersertifikat halal resmi'
  },
  {
    id: 'ing-6',
    nama: 'Minyak kelapa sawit',
    fungsi: 'Media penggorengan',
    merekPemasok: 'Minyak Goreng SunCo',
    buktiHalal: 'ada',
    isAnimalOrAdditive: false,
    keteranganHalal: 'Bersertifikat halal resmi'
  }
];

export const DocumentKitView: React.FC<DocumentKitViewProps> = ({
  profile,
  onProceedToChat,
  onProceedToTracker
}) => {
  const [subTab, setSubTab] = useState<'bahan' | 'label' | 'salin'>('bahan');

  // 1. Ingredients state
  const [ingredients, setIngredients] = useState<IngredientItem[]>(DEFAULT_KEMPLANG_INGREDIENTS);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientFunction, setNewIngredientFunction] = useState('');
  const [newIngredientBrand, setNewIngredientBrand] = useState('');
  const [newIngredientHalal, setNewIngredientHalal] = useState<'ada' | 'tidak_ada' | 'tidak_tahu'>('ada');

  // 2. Label draft form state
  const [labelProductName, setLabelProductName] = useState(profile.primaryProductName || 'Kemplang Panggang Ikan Tenggiri Asli Bangka');
  const [labelVariant, setLabelVariant] = useState('Gurih Original');
  const [labelNetto, setLabelNetto] = useState('250 gram');
  const [labelBusinessName, setLabelBusinessName] = useState(profile.businessName || 'Dapur Kemplang Berkah');
  const [labelBusinessAddress, setLabelBusinessAddress] = useState(
    profile.businessAddress || 'Sungailiat, Kabupaten Bangka, Kepulauan Bangka Belitung'
  );
  const [isGeneratingLabel, setIsGeneratingLabel] = useState(false);
  const [labelResult, setLabelResult] = useState<LabelPackagingDraft | null>(null);

  // 3. Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  // Helper check for animal or additive
  const checkIsAnimalOrAdditive = (name: string) => {
    const lower = name.toLowerCase();
    const animalTerms = ['ikan', 'tenggiri', 'udang', 'cumi', 'kepiting', 'daging', 'ayam', 'sapi', 'telur', 'susu', 'terasi', 'gelatin', 'lemak'];
    const additiveTerms = ['pewarna', 'perisa', 'pengawet', 'msg', 'penyedap', 'natrium', 'benzoat', 'sakarin', 'baking', 'emulsifier', 'tartrazin', 'pengembang'];
    return animalTerms.some(t => lower.includes(t)) || additiveTerms.some(t => lower.includes(t));
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredientName.trim()) return;

    const isAnimalOrAdd = checkIsAnimalOrAdditive(newIngredientName);
    const item: IngredientItem = {
      id: 'ing-' + Date.now(),
      nama: newIngredientName.trim(),
      fungsi: newIngredientFunction.trim() || 'Bahan pelengkap',
      merekPemasok: newIngredientBrand.trim() || 'Pasar lokal',
      buktiHalal: newIngredientHalal,
      isAnimalOrAdditive: isAnimalOrAdd,
      keteranganHalal: isAnimalOrAdd 
        ? 'Perlu dipastikan sertifikat halal atau keterangan asal usul' 
        : 'Bahan umum'
    };

    setIngredients(prev => [...prev, item]);
    setNewIngredientName('');
    setNewIngredientFunction('');
    setNewIngredientBrand('');
    setNewIngredientHalal('ada');
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients(prev => prev.filter(i => i.id !== id));
  };

  const handleResetKemplang = () => {
    setIngredients(DEFAULT_KEMPLANG_INGREDIENTS);
  };

  const handleGenerateLabel = async () => {
    setIsGeneratingLabel(true);
    try {
      const response = await fetch('/api/gemini/label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namaProduk: labelProductName,
          varian: labelVariant,
          bahan: ingredients.map(i => i.nama),
          beratBersih: labelNetto,
          namaProdusen: labelBusinessName,
          alamatProdusen: labelBusinessAddress
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menyusun label');
      }

      const data = await response.json();
      setLabelResult(data);
    } catch (err) {
      console.error(err);
      // Fallback local
      setLabelResult({
        namaProduk: labelProductName,
        varian: labelVariant,
        komposisi: ingredients.map(i => i.nama),
        beratBersih: labelNetto,
        namaProdusen: labelBusinessName,
        alamatProdusen: labelBusinessAddress,
        pirtNotice: 'P-IRT No. [Diisi setelah terbit dari Dinkes/BPOM]',
        halalNotice: 'Logo Halal Indonesia [Diisi setelah nomor sertifikat terbit]',
        kodeProduksiDanKedaluwarsa: 'Baik digunakan sebelum: DD/MM/YYYY | Kode Produksi: 01A',
        petunjukPenyimpanan: 'Simpan di tempat kering dan sejuk, hindarkan dari sinar matahari langsung.',
        peringatanAlergen: 'Mengandung alergen ikan laut/seafood.',
        catatanEdukasi: [
          'Komposisi diurutkan dari bahan terbanyak.',
          'Pencantuman nomor izin PIRT dan logo Halal hanya boleh dicetak setelah izin resmi terbit.',
          'Format nama dan alamat produsen wajib jelas.'
        ]
      });
    } finally {
      setIsGeneratingLabel(false);
    }
  };

  return (
    <div className="max-w-[640px] mx-auto py-8 px-4 text-left">
      <div className="mb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F766E]">Langkah 6</span>
        <h1 className="text-2xl font-bold text-[#1C1917] mt-0.5">Kit Dokumen Siap Pakai</h1>
        <p className="text-sm text-[#6B6F6C] mt-1">
          Tiga alat bantu praktis untuk menyiapkan dokumen bahan, draf kemasan label BPOM, dan lembar data salin untuk portal resmi.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-[#E5E7EB] mb-6">
        <button
          onClick={() => setSubTab('bahan')}
          className={`py-2.5 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            subTab === 'bahan'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#6B6F6C] hover:text-[#1C1917]'
          }`}
        >
          1. Tabel Daftar Bahan
        </button>
        <button
          onClick={() => setSubTab('label')}
          className={`py-2.5 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            subTab === 'label'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#6B6F6C] hover:text-[#1C1917]'
          }`}
        >
          2. Draf Label Kemasan
        </button>
        <button
          onClick={() => setSubTab('salin')}
          className={`py-2.5 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            subTab === 'salin'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#6B6F6C] hover:text-[#1C1917]'
          }`}
        >
          3. Lembar Siap Salin
        </button>
      </div>

      {/* SUBTAB 1: DAFTAR BAHAN */}
      {subTab === 'bahan' && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="font-bold text-base text-[#1C1917]">Daftar Bahan & Verifikasi Halal</h2>
              <p className="text-xs text-[#6B6F6C]">
                Bahan hewani dan bahan tambahan pangan otomatis ditandai sebagai "Perlu bukti halal".
              </p>
            </div>
            <button
              onClick={handleResetKemplang}
              className="text-xs font-medium text-[#0F766E] hover:underline self-start sm:self-center cursor-pointer"
            >
              Isi Contoh Kemplang Ikan
            </button>
          </div>

          {/* Ingredients Table */}
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#FAFAF7] border-b border-[#E5E7EB] text-[#1C1917]">
                  <tr>
                    <th className="p-3 font-semibold">Nama Bahan</th>
                    <th className="p-3 font-semibold">Fungsi</th>
                    <th className="p-3 font-semibold">Merek / Pemasok</th>
                    <th className="p-3 font-semibold">Bukti Halal</th>
                    <th className="p-3 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {ingredients.map((ing) => (
                    <tr key={ing.id} className="hover:bg-[#FAFAF7]/50">
                      <td className="p-3 font-medium text-[#1C1917]">
                        <div>{ing.nama}</div>
                        {ing.isAnimalOrAdditive && (
                          <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            Perlu bukti halal
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-[#6B6F6C]">{ing.fungsi}</td>
                      <td className="p-3 text-[#6B6F6C]">{ing.merekPemasok}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                          ing.buktiHalal === 'ada' 
                            ? 'bg-[#E6F2F0] text-[#0F766E]' 
                            : ing.buktiHalal === 'tidak_ada'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {ing.buktiHalal === 'ada' ? 'Ada' : ing.buktiHalal === 'tidak_ada' ? 'Tidak Ada' : 'Tidak Tahu'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteIngredient(ing.id)}
                          className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                          aria-label={`Hapus ${ing.nama}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {ingredients.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-[#6B6F6C]">
                        Belum ada bahan. Tambahkan bahan di bawah atau klik "Isi Contoh Kemplang Ikan".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Tambah Bahan */}
          <form onSubmit={handleAddIngredient} className="p-4 border border-[#E5E7EB] rounded-lg bg-white mb-6">
            <h3 className="font-bold text-sm text-[#1C1917] mb-3">Tambah Bahan Baru</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">Nama Bahan</label>
                <input
                  type="text"
                  placeholder="Misal: Ikan tenggiri, tapioka, garam"
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">Fungsi Bahan</label>
                <input
                  type="text"
                  placeholder="Misal: Bahan utama, perasa, pengikat"
                  value={newIngredientFunction}
                  onChange={(e) => setNewIngredientFunction(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">Merek atau Pemasok</label>
                <input
                  type="text"
                  placeholder="Misal: Nelayan Koba, Toko Bahan Kue"
                  value={newIngredientBrand}
                  onChange={(e) => setNewIngredientBrand(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">Status Bukti Halal</label>
                <select
                  value={newIngredientHalal}
                  onChange={(e) => setNewIngredientHalal(e.target.value as any)}
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                >
                  <option value="ada">Ada (sertifikat / alami non-kritis)</option>
                  <option value="tidak_ada">Tidak ada / Belum punya</option>
                  <option value="tidak_tahu">Tidak tahu / Ragu</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="h-10 px-4 bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah ke Tabel Bahan</span>
            </button>
          </form>

          <button
            onClick={() => setSubTab('label')}
            className="w-full h-12 bg-[#0F766E] hover:bg-[#0D655E] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Lanjut Susun Draf Label dengan Bahan Ini</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SUBTAB 2: DRAF LABEL KEMASAN */}
      {subTab === 'label' && (
        <div>
          <div className="mb-4">
            <h2 className="font-bold text-base text-[#1C1917]">Penyusun Draf Label Pangan Sesuai Standar BPOM</h2>
            <p className="text-xs text-[#6B6F6C]">
              Isi data produk di bawah. Sistem akan menyusun urutan komposisi, tempat nomor PIRT dan logo Halal, serta peringatan alergen sesuai ketentuan Dinas Kesehatan & BPOM.
            </p>
          </div>

          {/* Form Data Label */}
          <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white mb-6 space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#1C1917] mb-1">Nama Produk</label>
              <input
                type="text"
                value={labelProductName}
                onChange={(e) => setLabelProductName(e.target.value)}
                placeholder="Contoh: Kemplang Panggang Ikan Tenggiri"
                className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">Varian Rasa / Jenis</label>
                <input
                  type="text"
                  value={labelVariant}
                  onChange={(e) => setLabelVariant(e.target.value)}
                  placeholder="Contoh: Original, Pedas Manis"
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">Berat Bersih (Netto)</label>
                <input
                  type="text"
                  value={labelNetto}
                  onChange={(e) => setLabelNetto(e.target.value)}
                  placeholder="Contoh: 250 gram, 500 gram"
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">Nama Usaha / Produsen</label>
                <input
                  type="text"
                  value={labelBusinessName}
                  onChange={(e) => setLabelBusinessName(e.target.value)}
                  placeholder="Contoh: Dapur Kemplang Berkah"
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">Alamat Tempat Produksi</label>
                <input
                  type="text"
                  value={labelBusinessAddress}
                  onChange={(e) => setLabelBusinessAddress(e.target.value)}
                  placeholder="Contoh: Sungailiat, Kab. Bangka, Babel"
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-[#6B6F6C]">
                Bahan yang akan digunakan dari Tabel Bahan ({ingredients.length} bahan): 
                <strong className="text-[#1C1917] ml-1">{ingredients.map(i => i.nama).join(', ') || 'Belum ada bahan'}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={handleGenerateLabel}
              disabled={isGeneratingLabel}
              className="h-12 w-full bg-[#0F766E] hover:bg-[#0D655E] disabled:bg-gray-400 text-white font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {isGeneratingLabel ? (
                <span>Sedang menyusun struktur label...</span>
              ) : (
                <>
                  <span>Susun Draf Label Kemasan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Pratinjau Label Kemasan */}
          {labelResult && (
            <div className="p-5 border-2 border-[#1C1917] rounded-lg bg-white mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  Pratinjau Desain Label Pangan
                </span>
                <button
                  onClick={() => {
                    const text = `
${labelResult.namaProduk} (${labelResult.varian})
Berat Bersih: ${labelResult.beratBersih}
Komposisi: ${labelResult.komposisi.join(', ')}
${labelResult.peringatanAlergen ? labelResult.peringatanAlergen + '\n' : ''}
${labelResult.pirtNotice}
${labelResult.halalNotice}
${labelResult.kodeProduksiDanKedaluwarsa}
Petunjuk Penyimpanan: ${labelResult.petunjukPenyimpanan}
Diproduksi Oleh: ${labelResult.namaProdusen}, ${labelResult.alamatProdusen}
                    `.trim();
                    copyToClipboard(text, 'label-full');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:underline cursor-pointer"
                >
                  {copiedKey === 'label-full' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'label-full' ? 'Tersalin!' : 'Salin Teks Label'}</span>
                </button>
              </div>

              {/* Label Packaging Mock View */}
              <div className="p-4 bg-[#FAFAF7] border border-dashed border-[#6B6F6C] rounded text-left space-y-3">
                <div className="text-center pb-2 border-b border-[#E5E7EB]">
                  <div className="font-bold text-lg text-[#1C1917] tracking-tight">{labelResult.namaProduk}</div>
                  <div className="text-xs text-[#6B6F6C] font-medium">{labelResult.varian}</div>
                  <div className="text-xs font-bold text-[#1C1917] mt-1">Berat Bersih / Netto: {labelResult.beratBersih}</div>
                </div>

                <div className="text-xs text-[#1C1917] space-y-1">
                  <div>
                    <span className="font-semibold">Komposisi (Urut dari terbanyak): </span>
                    <span>{labelResult.komposisi.join(', ')}</span>
                  </div>

                  {labelResult.peringatanAlergen && (
                    <div className="p-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded font-semibold text-[11px]">
                      {labelResult.peringatanAlergen}
                    </div>
                  )}

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#6B6F6C]">
                    <div className="p-2 border border-[#E5E7EB] rounded bg-white font-medium text-[#1C1917]">
                      {labelResult.pirtNotice}
                    </div>
                    <div className="p-2 border border-[#E5E7EB] rounded bg-white font-medium text-[#1C1917]">
                      {labelResult.halalNotice}
                    </div>
                  </div>

                  <div className="pt-1 text-[11px] text-[#6B6F6C]">
                    <div>{labelResult.kodeProduksiDanKedaluwarsa}</div>
                    <div>Petunjuk Penyimpanan: {labelResult.petunjukPenyimpanan}</div>
                  </div>

                  <div className="pt-2 text-center text-xs text-[#1C1917] font-semibold">
                    Diproduksi oleh: {labelResult.namaProdusen} - {labelResult.alamatProdusen}
                  </div>
                </div>
              </div>

              {/* Catatan Edukasi */}
              {labelResult.catatanEdukasi && labelResult.catatanEdukasi.length > 0 && (
                <div className="mt-4 p-3 bg-[#E6F2F0]/40 rounded border border-[#0F766E]/20 text-xs text-[#1C1917] space-y-1">
                  <div className="font-semibold text-[#0F766E]">Catatan Edukasi untuk Pengajuan Dinkes:</div>
                  <ul className="list-disc pl-4 space-y-0.5 text-[#6B6F6C]">
                    {labelResult.catatanEdukasi.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: LEMBAR SIAP SALIN */}
      {subTab === 'salin' && (
        <div>
          <div className="mb-4">
            <h2 className="font-bold text-base text-[#1C1917]">Lembar Data Siap Salin untuk Form Pendaftaran</h2>
            <p className="text-xs text-[#6B6F6C]">
              Klik tombol "Salin" di tiap baris untuk menempelkan data ke portal OSS RBA, SPP-IRT BPOM, atau SIHALAL BPJPH.
            </p>
          </div>

          <div className="space-y-6">
            {/* 1. Portal OSS */}
            <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5E7EB]">
                <h3 className="font-bold text-sm text-[#1C1917]">1. Data untuk Portal OSS (oss.go.id)</h3>
                <span className="text-xs text-[#0F766E] font-medium">Pembuatan NIB</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  {
                    label: 'KBLI Utama',
                    value: profile.productType === 'makanan_kering' 
                      ? '10794 - Industri Kerupuk, Keripik, Peyek dan Sejenisnya'
                      : profile.productType === 'minuman'
                      ? '11090 - Industri Minuman Ringan Lainnya'
                      : profile.productType === 'makanan_basah'
                      ? '10799 - Industri Produk Makanan Lainnya'
                      : '32909 - Industri Kerajinan Lainnya',
                    key: 'oss-kbli'
                  },
                  {
                    label: 'Skala Usaha',
                    value: profile.scale === 'mikro' ? 'Usaha Mikro (Modal <= Rp 1 Miliar)' : 'Usaha Kecil (Modal Rp 1-5 Miliar)',
                    key: 'oss-skala'
                  },
                  {
                    label: 'Tingkat Risiko Perizinan',
                    value: 'Risiko Rendah (Perizinan tunggal otomatis terbit NIB)',
                    key: 'oss-risiko'
                  },
                  {
                    label: 'Lokasi Tempat Usaha',
                    value: profile.productionPlace === 'rumah' ? 'Dapur Tempat Tinggal' : 'Workshop Terpisah',
                    key: 'oss-lokasi'
                  }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-3 p-2 rounded bg-[#FAFAF7] border border-[#E5E7EB]">
                    <div>
                      <span className="font-semibold text-[#1C1917] block">{item.label}</span>
                      <span className="text-[#6B6F6C]">{item.value}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value, item.key)}
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-[#E5E7EB] rounded font-medium text-[#0F766E] flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedKey === item.key ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === item.key ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Portal SPP-IRT */}
            <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5E7EB]">
                <h3 className="font-bold text-sm text-[#1C1917]">2. Data untuk Portal SPP-IRT (sppirt.pom.go.id)</h3>
                <span className="text-xs text-[#0F766E] font-medium">Izin Edar Dinkes</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  {
                    label: 'Jenis Pangan',
                    value: 'Kerupuk, Keripik, dan Sejenisnya (atau Olahan Kering)',
                    key: 'pirt-jenis'
                  },
                  {
                    label: 'Jenis Kemasan Primer',
                    value: 'Plastik Polietilen (PE) / Polipropilen (PP) rapat kedap udara',
                    key: 'pirt-kemasan'
                  },
                  {
                    label: 'Masa Simpan / Kedaluwarsa',
                    value: 'Lebih dari 7 hari pada suhu ruang (rekomendasi 3-6 bulan)',
                    key: 'pirt-simpan'
                  },
                  {
                    label: 'Metode Pengolahan',
                    value: 'Pemanggangan / Penggorengan semi-manual skala rumah tangga',
                    key: 'pirt-proses'
                  }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-3 p-2 rounded bg-[#FAFAF7] border border-[#E5E7EB]">
                    <div>
                      <span className="font-semibold text-[#1C1917] block">{item.label}</span>
                      <span className="text-[#6B6F6C]">{item.value}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value, item.key)}
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-[#E5E7EB] rounded font-medium text-[#0F766E] flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedKey === item.key ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === item.key ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Portal SIHALAL */}
            <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5E7EB]">
                <h3 className="font-bold text-sm text-[#1C1917]">3. Data untuk Portal SIHALAL (ptsp.halal.go.id)</h3>
                <span className="text-xs text-[#0F766E] font-medium">Sertifikasi Halal BPJPH</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  {
                    label: 'Jalur Pengajuan',
                    value: 'Pernyataan Pelaku Usaha (Self-Declare Sehati)',
                    key: 'halal-jalur'
                  },
                  {
                    label: 'Status Bahan Baku',
                    value: 'Tidak berisiko / sudah bersertifikat halal dan bahan alami',
                    key: 'halal-bahan'
                  },
                  {
                    label: 'Wilayah Pendampingan',
                    value: 'Provinsi Kepulauan Bangka Belitung',
                    key: 'halal-wilayah'
                  }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-3 p-2 rounded bg-[#FAFAF7] border border-[#E5E7EB]">
                    <div>
                      <span className="font-semibold text-[#1C1917] block">{item.label}</span>
                      <span className="text-[#6B6F6C]">{item.value}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value, item.key)}
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-[#E5E7EB] rounded font-medium text-[#0F766E] flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedKey === item.key ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === item.key ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
        <button
          onClick={onProceedToChat}
          className="h-12 px-6 bg-[#0F766E] hover:bg-[#0D655E] text-white text-base font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Tanya Aturan Resmi Perizinan</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onProceedToTracker}
          className="h-12 px-5 bg-white hover:bg-[#FAFAF7] text-[#1C1917] border border-[#E5E7EB] text-base font-medium rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Buka Pantau Progres & Cetak</span>
        </button>
      </div>
    </div>
  );
};
