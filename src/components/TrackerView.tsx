import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Share2, 
  Check, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Copy
} from 'lucide-react';
import { UserProfile, ProgressItem } from '../types';
import { analyzeLegalMap, TERAKHIR_DIVERIFIKASI, BATAS_AKHIR_WAJIB_HALAL_UMK } from '../data/rules';
import { BABEL_DISTRICTS } from '../data/babel_directory';

interface TrackerViewProps {
  profile: UserProfile | null;
  onBackToMap: () => void;
}

const STORAGE_KEY_PROGRESS = 'jalur_legal_progress_v1';

export const TrackerView: React.FC<TrackerViewProps> = ({
  profile,
  onBackToMap
}) => {
  const district = profile ? BABEL_DISTRICTS[profile.regency] : BABEL_DISTRICTS.bangka;

  // Initial progress items
  const [progressItems, setProgressItems] = useState<ProgressItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch {}

    return [
      {
        licenseId: 'NIB',
        status: profile?.hasNIB === 'ya' ? 'selesai' : 'sedang_diurus',
        catatan: profile?.hasNIB === 'ya' ? 'NIB sudah terbit di OSS RBA.' : 'Siapkan KTP dan nomor telepon aktif untuk daftar oss.go.id.',
        tanggalPengingat: '2026-11-15',
        terakhirDiperbarui: '2026-11-07'
      },
      {
        licenseId: 'PIRT',
        status: profile?.hasPIRT === 'ya' ? 'selesai' : 'belum',
        catatan: profile?.hasPIRT === 'ya' ? 'SPP-IRT aktif.' : 'Daftar jadwal PKP di Dinkes kabupaten/kota. Penuhi komitmen sarana 3 bulan setelah nomor keluar.',
        tanggalPengingat: '2026-12-01',
        terakhirDiperbarui: '2026-11-07'
      },
      {
        licenseId: 'HALAL',
        status: profile?.hasHalal === 'ya' ? 'selesai' : 'belum',
        catatan: profile?.hasHalal === 'ya' ? 'Sertifikat Halal resmi BPJPH sudah terbit.' : 'Jalur Self-Declare gratis dengan pendamping P3H. Batas penahapan UMK: 17 Oktober 2028.',
        tanggalPengingat: '2026-12-20',
        terakhirDiperbarui: '2026-11-07'
      }
    ];
  });

  const [copiedWA, setCopiedWA] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progressItems));
    } catch (e) {
      console.warn('Failed to save progress', e);
    }
  }, [progressItems]);

  const updateStatus = (licenseId: 'NIB' | 'PIRT' | 'HALAL', newStatus: 'belum' | 'sedang_diurus' | 'selesai') => {
    setProgressItems(prev => prev.map(item => {
      if (item.licenseId === licenseId) {
        return {
          ...item,
          status: newStatus,
          terakhirDiperbarui: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  const updateDate = (licenseId: 'NIB' | 'PIRT' | 'HALAL', newDate: string) => {
    setProgressItems(prev => prev.map(item => {
      if (item.licenseId === licenseId) {
        return { ...item, tanggalPengingat: newDate };
      }
      return item;
    }));
  };

  const updateNote = (licenseId: 'NIB' | 'PIRT' | 'HALAL', note: string) => {
    setProgressItems(prev => prev.map(item => {
      if (item.licenseId === licenseId) {
        return { ...item, catatan: note };
      }
      return item;
    }));
  };

  // Generate WhatsApp text summary
  const generateWhatsAppSummary = () => {
    const regencyName = district?.nama || 'Kepulauan Bangka Belitung';
    const lines = [
      `*RINGKASAN PENGURUSAN LEGALITAS USAHA PANGAN*`,
      `Aplikasi: Jalur Legal UMKM Indonesia (Uji Coba Bangka Belitung)`,
      `Wilayah: ${regencyName}`,
      `Nama Produk: ${profile?.primaryProductName || 'Olahan Pangan Rumahan'}`,
      `Skala: ${profile?.scale === 'mikro' ? 'Usaha Mikro' : 'Usaha Kecil'}`,
      ``,
      `*STATUS DOKUMEN PERIZINAN:*`
    ];

    progressItems.forEach((p, idx) => {
      const statusLabel = p.status === 'selesai' ? 'SELESAI' : p.status === 'sedang_diurus' ? 'SEDANG DIURUS' : 'BELUM DIMULAI';
      lines.push(`${idx + 1}. *${p.licenseId}*: ${statusLabel}`);
      lines.push(`   - Target/Pengingat: ${p.tanggalPengingat || '-'}`);
      lines.push(`   - Catatan: ${p.catatan}`);
    });

    lines.push(``);
    lines.push(`*Catatan Penting:*`);
    lines.push(`- Batas penahapan wajib halal UMK: ${BATAS_AKHIR_WAJIB_HALAL_UMK}`);
    lines.push(`- Terakhir diverifikasi: ${TERAKHIR_DIVERIFIKASI}`);
    lines.push(`- Pengajuan resmi melalui oss.go.id, sppirt.pom.go.id, dan ptsp.halal.go.id`);

    return lines.join('\n');
  };

  const handleCopyWhatsApp = async () => {
    const text = generateWhatsAppSummary();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedWA(true);
      setTimeout(() => setCopiedWA(false), 2500);
    } catch (e) {
      console.warn(e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const mapResult = profile ? analyzeLegalMap(profile) : null;

  return (
    <div className="max-w-[640px] mx-auto py-8 px-4 text-left">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 no-print">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#0F766E]">Langkah 8</span>
          <h1 className="text-2xl font-bold text-[#1C1917] mt-0.5">Pantau Progres & Ringkasan</h1>
          <p className="text-sm text-[#6B6F6C] mt-1">
            Catat status pengurusan tiap izin dan bagikan ringkasan ke pendamping atau keluarga.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="h-10 px-3 bg-white hover:bg-gray-100 border border-[#E5E7EB] text-[#1C1917] rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Cetak Tampilan Satu Halaman"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Halaman</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Summary Action Bar */}
      <div className="mb-6 p-4 rounded-lg bg-[#E6F2F0] border border-[#0F766E]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 no-print">
        <div>
          <div className="font-semibold text-sm text-[#0F766E]">Bagikan Ringkasan ke Pendamping P3H / WhatsApp</div>
          <p className="text-xs text-[#1C1917]/80 mt-0.5">
            Salin teks berformat rapi untuk dikirimkan melalui pesan WhatsApp.
          </p>
        </div>

        <button
          onClick={handleCopyWhatsApp}
          className="h-10 px-4 bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          {copiedWA ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedWA ? 'Tersalin untuk WhatsApp!' : 'Salin ringkasan untuk WhatsApp'}</span>
        </button>
      </div>

      {/* Progress Cards */}
      <div className="space-y-4 mb-8">
        {progressItems.map((item) => {
          return (
            <div key={item.licenseId} className="p-4 border border-[#E5E7EB] rounded-lg bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-base text-[#1C1917]">
                    {item.licenseId === 'NIB' && '1. NIB (Nomor Induk Berusaha)'}
                    {item.licenseId === 'PIRT' && '2. SPP-IRT (Izin Edar BPOM)'}
                    {item.licenseId === 'HALAL' && '3. Sertifikat Halal BPJPH'}
                  </h3>
                  <span className="text-[11px] text-[#6B6F6C]">
                    Terakhir diperbarui: {item.terakhirDiperbarui}
                  </span>
                </div>

                {/* Status Switcher */}
                <div className="flex rounded-lg border border-[#E5E7EB] overflow-hidden no-print">
                  {[
                    { id: 'belum', label: 'Belum' },
                    { id: 'sedang_diurus', label: 'Sedang Diurus' },
                    { id: 'selesai', label: 'Selesai' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => updateStatus(item.licenseId, s.id as any)}
                      className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                        item.status === s.id
                          ? s.id === 'selesai'
                            ? 'bg-[#0F766E] text-white font-semibold'
                            : s.id === 'sedang_diurus'
                            ? 'bg-amber-600 text-white font-semibold'
                            : 'bg-gray-200 text-[#1C1917] font-semibold'
                          : 'bg-white text-[#6B6F6C] hover:bg-gray-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Print only status badge */}
                <span className="hidden print-only font-bold text-xs uppercase px-2 py-0.5 border border-black">
                  STATUS: {item.status.toUpperCase()}
                </span>
              </div>

              {/* Reminder Date and Notes */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#6B6F6C] shrink-0" />
                  <span className="text-[#6B6F6C]">Tanggal Target / Pengingat:</span>
                  <input
                    type="date"
                    value={item.tanggalPengingat}
                    onChange={(e) => updateDate(item.licenseId, e.target.value)}
                    className="h-8 px-2 border border-[#E5E7EB] rounded text-xs bg-white text-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B6F6C] mb-1 font-medium">Catatan / Langkah Selanjutnya:</label>
                  <textarea
                    rows={2}
                    value={item.catatan}
                    onChange={(e) => updateNote(item.licenseId, e.target.value)}
                    className="w-full p-2 border border-[#E5E7EB] rounded text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Print-friendly One Page Summary Block */}
      <div className="p-5 border border-[#E5E7EB] rounded-lg bg-white mb-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
          <div className="font-bold text-sm text-[#1C1917]">Lembar Ringkasan Cetak Satu Halaman</div>
          <span className="text-xs text-[#0F766E] font-medium">Jalur Legal UMKM</span>
        </div>

        <div className="text-xs text-[#1C1917] space-y-2 leading-relaxed">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#E5E7EB]">
            <div><strong>Wilayah Pengurusan:</strong> {district?.nama}</div>
            <div><strong>Skala Usaha:</strong> {profile?.scale === 'mikro' ? 'Mikro' : 'Kecil'}</div>
            <div><strong>Tempat Produksi:</strong> {profile?.productionPlace === 'rumah' ? 'Rumah Tinggal' : 'Workshop Terpisah'}</div>
            <div><strong>Tenggat Wajib Halal:</strong> {BATAS_AKHIR_WAJIB_HALAL_UMK}</div>
          </div>

          <div className="pt-1">
            <strong>Kontak Dinas Terkait di {district?.nama}:</strong>
            <ul className="list-disc pl-4 text-[#6B6F6C] mt-1 space-y-0.5">
              <li>Dinas Kesehatan: {district?.dinkes.alamat} (Telp: {district?.dinkes.telepon})</li>
              <li>DPMPTSP: {district?.dpmptsp.alamat} (Telp: {district?.dpmptsp.telepon})</li>
              <li>Dinas Koperasi & UKM: {district?.dinkop.alamat} (Telp: {district?.dinkop.telepon})</li>
            </ul>
          </div>

          <div className="pt-2 text-[11px] text-[#6B6F6C] border-t border-[#E5E7EB]">
            Terakhir diverifikasi: {TERAKHIR_DIVERIFIKASI}. Panduan ini bukan keputusan perizinan resmi.
          </div>
        </div>
      </div>

      {/* Return to Map button */}
      <div className="no-print pt-2 border-t border-[#E5E7EB]">
        <button
          onClick={onBackToMap}
          className="w-full h-12 bg-white hover:bg-[#FAFAF7] text-[#1C1917] border border-[#E5E7EB] text-sm font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Kembali ke Peta Legalitas</span>
        </button>
      </div>
    </div>
  );
};
