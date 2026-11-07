import { 
  UserProfile, 
  LegalMapResult, 
  LicenseStatusInfo, 
  ReadinessItem, 
  RuleItem 
} from '../types';

export const TERAKHIR_DIVERIFIKASI = '1 November 2026';
export const BATAS_AKHIR_WAJIB_HALAL_UMK = '17 Oktober 2028';

export const RULE_BASE: RuleItem[] = [
  {
    id: 'rule-nib-01',
    kategori: 'NIB',
    judul: 'NIB Wajib untuk Seluruh Skala Usaha',
    teks_aturan: 'Nomor Induk Berusaha (NIB) adalah bukti registrasi/pendaftaran pelaku usaha untuk melakukan kegiatan usaha sekaligus identitas legalitas tunggal. NIB menjadi prasyarat mutlak sebelum mengurus SPP-IRT di BPOM dan Sertifikat Halal di BPJPH.',
    ringkasan: 'NIB dibutuhkan oleh semua jenis usaha dan menjadi gerbang utama pengurusan izin lain.',
    sumber_nama: 'Peraturan Pemerintah No. 5 Tahun 2021 tentang Penyelenggaraan Perizinan Berusaha Berbasis Risiko (OSS RBA)',
    sumber_url: 'https://oss.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  },
  {
    id: 'rule-nib-02',
    kategori: 'NIB',
    judul: 'NIB Usaha Mikro dan Kecil Terbit Otomatis & Gratis',
    teks_aturan: 'Bagi pelaku Usaha Mikro dan Kecil (UMK) dengan risiko rendah, penerbitan NIB diproses secara otomatis melalui sistem OSS tanpa dipungut biaya retribusi pemerintah.',
    ringkasan: 'NIB untuk skala mikro/kecil tidak berbayar dan dapat terbit dalam hitungan menit lewat portal OSS.',
    sumber_nama: 'Kementerian Investasi / BKPM - Panduan OSS RBA',
    sumber_url: 'https://oss.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  },
  {
    id: 'rule-pirt-01',
    kategori: 'PIRT',
    judul: 'Kriteria Pangan Industri Rumah Tangga (PIRT)',
    teks_aturan: 'Sertifikat Produksi Pangan Industri Rumah Tangga (SPP-IRT) diberikan kepada pangan olahan yang diproduksi di tempat tinggal dengan peralatan manual hingga semi-otomatis, memiliki daya simpan lebih dari 7 hari pada suhu ruang, dan kemasan tersendiri.',
    ringkasan: 'PIRT khusus olahan pangan rumahan berisiko rendah yang tahan lebih dari 7 hari di suhu kamar.',
    sumber_nama: 'Peraturan BPOM No. 22 Tahun 2018 tentang Pedoman Pemberian Sertifikat Produksi Pangan Industri Rumah Tangga',
    sumber_url: 'https://sppirt.pom.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  },
  {
    id: 'rule-pirt-02',
    kategori: 'PIRT',
    judul: 'Prasyarat & Komitmen SPP-IRT',
    teks_aturan: 'Penerbitan SPP-IRT diintegrasikan lewat sistem OSS dan aplikasi SPP-IRT BPOM. Pemohon wajib mengikuti Penyuluhan Keamanan Pangan (PKP) dari Dinas Kesehatan setempat dan memenuhi komitmen pemeriksaan sarana dalam waktu 3 bulan setelah nomor terbit. SPP-IRT berlaku selama 5 tahun.',
    ringkasan: 'Wajib sertifikat PKP Dinkes dan pemenuhan komitmen sarana maksimal 3 bulan pasca terbit.',
    sumber_nama: 'Badan Pengawas Obat dan Makanan (BPOM RI)',
    sumber_url: 'https://sppirt.pom.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  },
  {
    id: 'rule-pirt-03',
    kategori: 'PIRT',
    judul: 'Pangan yang Dikecualikan dari PIRT (Wajib BPOM MD)',
    teks_aturan: 'PIRT tidak dapat diberikan untuk: susu dan olahan susu, daging/unggas/ikan olahan yang disterilkan secara komersial (kaleng), makanan beku berbasis daging yang butuh cold-chain khusus, air minum dalam kemasan (AMDK), dan makanan pendamping ASI (MP-ASI). Produk ini wajib izin edar BPOM MD.',
    ringkasan: 'Produk risiko tinggi (susu, daging kaleng steril, AMDK, MP-ASI) harus langsung ke BPOM MD.',
    sumber_nama: 'Peraturan BPOM No. 22 Tahun 2018 Lampiran II',
    sumber_url: 'https://sppirt.pom.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  },
  {
    id: 'rule-halal-01',
    kategori: 'HALAL',
    judul: 'Kewajiban Sertifikasi Halal Produk Makanan & Minuman',
    teks_aturan: 'Berdasarkan regulasi jaminan produk halal, seluruh produk makanan dan minuman yang beredar di Indonesia wajib bersertifikat halal. Pemerintah telah menetapkan penyesuaian masa penahapan kewajiban halal bagi pelaku Usaha Mikro dan Kecil (UMK) hingga 17 Oktober 2028.',
    ringkasan: 'Semua makanan dan minuman wajib halal, dengan tenggat penahapan UMK sampai 17 Oktober 2028.',
    sumber_nama: 'Badan Penyelenggara Jaminan Produk Halal (BPJPH Kemenag RI)',
    sumber_url: 'https://bpjph.halal.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  },
  {
    id: 'rule-halal-02',
    kategori: 'HALAL',
    judul: 'Syarat Jalur Halal Self-Declare (Bebas Biaya)',
    teks_aturan: 'Jalur pernyataan pelaku usaha (Self-Declare) diperuntukkan bagi UMK dengan kriteria: memiliki NIB UMK, proses produksi sederhana, bahan baku tidak berisiko (telah bersertifikat halal atau terdaftar bahan tidak kritis), maksimal 10 nama produk, dan wajib melalui pendampingan oleh Pendamping Proses Produk Halal (P3H).',
    ringkasan: 'Self-declare gratis untuk UMK dengan bahan terbukti halal, proses sederhana, maksimal 10 nama produk, didampingi P3H.',
    sumber_nama: 'Keputusan Kepala BPJPH No. 150 Tahun 2022 tentang Pedoman Sertifikasi Halal Self-Declare',
    sumber_url: 'https://ptsp.halal.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  },
  {
    id: 'rule-halal-03',
    kategori: 'HALAL',
    judul: 'Kapan Harus Memilih Jalur Halal Reguler?',
    teks_aturan: 'Jika produk menggunakan bahan hewani olahan tanpa sertifikat halal yang jelas, bahan impor berisiko, proses produksi rumit berteknologi tinggi, atau varian melebihi 10 produk, maka pengajuan diarahkan ke jalur reguler melalui pemeriksaan Lembaga Pemeriksa Halal (LPH) terakreditasi.',
    ringkasan: 'Gunakan jalur reguler (audit LPH) jika bahan hewani kritis/impor belum bersertifikat atau produk >10 varian.',
    sumber_nama: 'BPJPH Kemenag RI - Layanan SIHALAL Reguler',
    sumber_url: 'https://ptsp.halal.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  },
  {
    id: 'rule-umum-01',
    kategori: 'UMUM',
    judul: 'Urutan Legalitas Ideal untuk Usaha Pangan Rumahan',
    teks_aturan: 'Urutan terstruktur: (1) Buat NIB di oss.go.id sebagai dasar hukum usaha; (2) Daftar akun SPP-IRT di sppirt.pom.go.id dan ikuti PKP Dinkes; (3) Ajukan Sertifikasi Halal di ptsp.halal.go.id (SIHALAL) dengan memasukkan NIB dan nomor izin edar.',
    ringkasan: 'Langkah baku: NIB terlebih dahulu, disusul izin edar PIRT dan sertifikat halal.',
    sumber_nama: 'Kompilasi Regulasi UMKM Pangan Indonesia',
    sumber_url: 'https://oss.go.id',
    terakhir_diverifikasi: TERAKHIR_DIVERIFIKASI
  }
];

export function analyzeLegalMap(profile: UserProfile): LegalMapResult {
  const isNonFood = profile.productType === 'non_pangan';

  if (isNonFood) {
    const nibStatus: LicenseStatusInfo = {
      id: 'NIB',
      nama: 'NIB (Nomor Induk Berusaha)',
      namaLengkap: 'Nomor Induk Berusaha',
      singkatanPenjelasan: 'NIB adalah identitas resmi dan legalitas dasar untuk segala jenis usaha di Indonesia.',
      status: profile.hasNIB === 'ya' ? 'sudah_ada' : 'wajib',
      statusLabel: profile.hasNIB === 'ya' ? 'Sudah Dimiliki' : 'Wajib Diurus',
      alasan: 'Semua pelaku usaha di Indonesia wajib memiliki NIB sebagai dasar perizinan berusaha.',
      penjelasanKenapa: 'NIB diterbitkan secara elektronik melalui portal OSS RBA. Dengan NIB, usaha Anda diakui negara secara hukum dan berhak atas perlindungan usaha serta akses perbankan.',
      portalNama: 'OSS Indonesia (oss.go.id)',
      portalUrl: 'https://oss.go.id',
      biaya: 'Gratis (skala mikro dan kecil)',
      waktuEstimasi: '10–30 menit online',
      prasyarat: ['KTP pemilik usaha', 'Nomor WhatsApp & email aktif', 'Alamat lokasi usaha']
    };

    const pirtStatus: LicenseStatusInfo = {
      id: 'PIRT',
      nama: 'PIRT (Pangan Industri Rumah Tangga)',
      namaLengkap: 'Sertifikat Produksi Pangan Industri Rumah Tangga',
      singkatanPenjelasan: 'PIRT adalah izin edar khusus untuk produk pangan olahan skala rumahan.',
      status: 'tidak_perlu',
      statusLabel: 'Tidak Perlu',
      alasan: 'PIRT hanya diperuntukkan bagi produk pangan olahan, bukan produk kerajinan atau non-pangan.',
      penjelasanKenapa: 'Usaha kerajinan, jasa, atau produk non-pangan tidak memerlukan izin edar Dinas Kesehatan/BPOM.',
      portalNama: 'Portal SPP-IRT BPOM',
      portalUrl: 'https://sppirt.pom.go.id',
      biaya: 'Tidak berlaku',
      waktuEstimasi: '-',
      prasyarat: []
    };

    const halalStatus: LicenseStatusInfo = {
      id: 'HALAL',
      nama: 'Sertifikat Halal',
      namaLengkap: 'Sertifikat Halal Resmi BPJPH Kemenag',
      singkatanPenjelasan: 'Sertifikat halal adalah jaminan kehalalan produk yang diterbitkan BPJPH.',
      status: 'tidak_perlu',
      statusLabel: 'Belum Tersedia',
      alasan: 'Jalur non-pangan belum tersedia di versi ini.',
      penjelasanKenapa: 'Saat ini panduan aplikasi Jalur Legal difokuskan untuk produk pangan olahan. Untuk barang gunaan non-pangan tertentu, konsultasikan langsung ke Satgas Halal Kemenag.',
      portalNama: 'SIHALAL BPJPH',
      portalUrl: 'https://ptsp.halal.go.id',
      biaya: 'Tidak berlaku',
      waktuEstimasi: '-',
      prasyarat: []
    };

    return {
      isNonFood: true,
      notes: [
        'Produk Anda terdeteksi non-pangan (kerajinan/barang lain). Anda hanya memerlukan NIB sebagai legalitas dasar berusaha.',
        'Jalur non-pangan belum tersedia di versi ini.'
      ],
      licenses: [nibStatus, pirtStatus, halalStatus],
      halalPath: 'tidak_perlu',
      halalPathReason: 'Jalur non-pangan belum tersedia di versi ini.',
      deadlineHalal: '-'
    };
  }

  // --- Food Products ---
  const licenses: LicenseStatusInfo[] = [];

  // 1. NIB
  const hasNib = profile.hasNIB === 'ya';
  licenses.push({
    id: 'NIB',
    nama: 'NIB (Nomor Induk Berusaha)',
    namaLengkap: 'Nomor Induk Berusaha',
    singkatanPenjelasan: 'NIB adalah identitas resmi dan legalitas dasar untuk segala jenis usaha di Indonesia.',
    status: hasNib ? 'sudah_ada' : 'wajib',
    statusLabel: hasNib ? 'Sudah Dimiliki' : 'Wajib Langkah Pertama',
    alasan: hasNib 
      ? 'Anda sudah memiliki NIB, dasar perizinan sudah terpenuhi.' 
      : 'NIB adalah syarat wajib pertama sebelum Anda bisa mendaftar PIRT dan sertifikat halal.',
    penjelasanKenapa: 'Tanpa NIB, sistem perizinan pemerintah (SPP-IRT BPOM dan SIHALAL BPJPH) menolak pendaftaran akun. NIB untuk UMK diterbitkan gratis tanpa dipungut biaya retribusi.',
    portalNama: 'OSS Indonesia (oss.go.id)',
    portalUrl: 'https://oss.go.id',
    biaya: 'Gratis (skala mikro & kecil)',
    waktuEstimasi: '10–30 menit online',
    prasyarat: ['KTP pemilik usaha', 'Email & nomor WhatsApp aktif', 'Alamat lokasi usaha']
  });

  // 2. PIRT
  const hasPirt = profile.hasPIRT === 'ya';
  let pirtReason = '';
  if (hasPirt) {
    pirtReason = 'Anda sudah memiliki SPP-IRT untuk edar produk pangan olahan.';
  } else if (profile.productType === 'makanan_kering') {
    pirtReason = 'Wajib untuk makanan kering olahan rumahan (seperti kerupuk kemplang, getas, kripik) dengan daya simpan lebih dari 7 hari.';
  } else if (profile.productType === 'minuman') {
    pirtReason = 'Dibutuhkan untuk minuman serbuk/sirup olahan rumahan yang tidak bertekanan dan daya simpan stabil.';
  } else {
    pirtReason = 'Dibutuhkan untuk pangan olahan dalam kemasan yang memenuhi kriteria PIRT BPOM.';
  }

  licenses.push({
    id: 'PIRT',
    nama: 'PIRT (Pangan Industri Rumah Tangga)',
    namaLengkap: 'Sertifikat Produksi Pangan Industri Rumah Tangga (SPP-IRT)',
    singkatanPenjelasan: 'PIRT adalah izin edar pangan olahan yang diproduksi skala rumahan dengan daya simpan lebih dari 7 hari.',
    status: hasPirt ? 'sudah_ada' : 'dibutuhkan',
    statusLabel: hasPirt ? 'Sudah Dimiliki' : 'Dibutuhkan',
    alasan: pirtReason,
    penjelasanKenapa: 'SPP-IRT membuktikan produk Anda memenuhi standar higienitas dan sanitasi pangan. Konsumen lebih percaya dan produk legal dijual di toko, warung, maupun swalayan lokal. Masa berlaku SPP-IRT adalah 5 tahun.',
    portalNama: 'SPP-IRT BPOM (sppirt.pom.go.id)',
    portalUrl: 'https://sppirt.pom.go.id',
    biaya: 'Gratis perizinan OSS; penyuluhan PKP Dinkes umumnya gratis/biaya operasional daerah',
    waktuEstimasi: '1–7 hari (nomor SPP-IRT otomatis, komitmen sarana 3 bulan)',
    prasyarat: ['NIB aktif', 'Sertifikat PKP (Penyuluhan Keamanan Pangan) dari Dinkes', 'Draf label kemasan sesuai ketentuan BPOM']
  });

  // 3. Halal
  const hasHalal = profile.hasHalal === 'ya';
  
  // Halal Path Evaluation
  // Scenario:
  // - Self-declare requires:
  //   - Scale is mikro or kecil
  //   - Simple process
  //   - Materials guaranteed halal (no dubious imported animal ingredients)
  //   - Product count <= 10
  const isAnimalComplex = profile.hasAnimalIngredients === 'ya';
  const isOver10 = profile.productCount === 'lebih_dari_10';
  
  let halalPath: 'self_declare' | 'reguler' = 'self_declare';
  let halalPathReason = '';

  if (isOver10) {
    halalPath = 'reguler';
    halalPathReason = 'Jumlah varian produk Anda melebihi batas kuota self-declare (maksimal 10 nama produk). Anda diarahkan ke jalur reguler atau pisahkan pengajuan 10 produk utama terlebih dahulu.';
  } else if (isAnimalComplex) {
    // If animal ingredients present (e.g., ikan tenggiri lokal vs daging olahan impor)
    halalPathReason = 'Produk Anda mengandung bahan hewani (seperti ikan tenggiri pada kemplang). Jika ikan segar/hasil tangkapan laut, jalur self-declare tetap bisa diajukan dengan pendampingan P3H. Bila menggunakan bahan olahan daging impor atau bahan turunan non-sertifikat, Anda diarahkan ke jalur reguler.';
    halalPath = 'self_declare'; // Eligible for Bangka Belitung fish kemplang with P3H guidance!
  } else {
    halalPath = 'self_declare';
    halalPathReason = 'Produk Anda berbahan nabati/sederhana dan memiliki jumlah varian di bawah 10 produk. Anda memenuhi syarat fasilitas gratis Jalur Self-Declare BPJPH.';
  }

  licenses.push({
    id: 'HALAL',
    nama: 'Sertifikat Halal',
    namaLengkap: 'Sertifikat Halal Resmi BPJPH Kementerian Agama',
    singkatanPenjelasan: 'Sertifikat halal adalah jaminan kehalalan produk yang diterbitkan oleh Badan Penyelenggara Jaminan Produk Halal (BPJPH).',
    status: hasHalal ? 'sudah_ada' : (halalPath === 'self_declare' ? 'dibutuhkan' : 'perlu_reguler'),
    statusLabel: hasHalal ? 'Sudah Dimiliki' : (halalPath === 'self_declare' ? 'Dibutuhkan (Self-Declare)' : 'Dibutuhkan (Jalur Reguler)'),
    alasan: hasHalal 
      ? 'Anda sudah memiliki Sertifikat Halal resmi.'
      : `Wajib untuk seluruh olahan makanan dan minuman. Anda memenuhi rekomendasi ${halalPath === 'self_declare' ? 'Jalur Self-Declare (Gratis dengan P3H)' : 'Jalur Reguler (Audit LPH)'}.`,
    penjelasanKenapa: 'Undang-Undang mengamanatkan kewajiban sertifikasi halal untuk semua produk pangan. Pelaku UMK di Bangka Belitung diberi waktu penahapan hingga 17 Oktober 2028, namun pembeli modern dan toko oleh-oleh umumnya sudah mensyaratkan logo halal resmi.',
    portalNama: 'SIHALAL PTSP Kemenag (ptsp.halal.go.id)',
    portalUrl: 'https://ptsp.halal.go.id',
    biaya: halalPath === 'self_declare' ? 'Gratis (program Sehati BPJPH)' : 'Berbayar tarif LPH resmi',
    waktuEstimasi: halalPath === 'self_declare' ? '12–21 hari kerja' : '21–30 hari kerja',
    prasyarat: [
      'NIB aktif',
      'Izin PIRT atau komitmen izin edar',
      'Daftar bahan & dokumen bukti halal bahan',
      'Didampingi P3H (Pendamping Proses Produk Halal)'
    ]
  });

  const notes = [
    'Panduan ini disusun berdasarkan regulasi OSS RBA, Peraturan BPOM No. 22/2018, dan Keputusan Kepala BPJPH.',
    `Batas akhir penahapan wajib halal UMK: ${BATAS_AKHIR_WAJIB_HALAL_UMK} (verifikasi pembaruan berkala di bpjph.halal.go.id).`
  ];

  return {
    isNonFood: false,
    notes,
    licenses,
    halalPath,
    halalPathReason,
    deadlineHalal: BATAS_AKHIR_WAJIB_HALAL_UMK
  };
}

export function getReadinessChecklist(profile: UserProfile, completedIds: string[] = []): ReadinessItem[] {
  const items: ReadinessItem[] = [];

  // Non-food only has NIB items
  if (profile.productType === 'non_pangan') {
    items.push({
      id: 'chk-nib-01',
      licenseId: 'NIB',
      teks: 'KTP elektronik dan nomor WhatsApp/Email aktif',
      penjelasan: 'Diperlukan untuk mendaftar akun hak akses OSS RBA.',
      isMandatoryPrerequisite: true,
      completed: completedIds.includes('chk-nib-01')
    });
    items.push({
      id: 'chk-nib-02',
      licenseId: 'NIB',
      teks: 'Alamat tempat usaha dan perkiraan modal awal',
      penjelasan: 'Data lokasi usaha dibutuhkan untuk menentukan zonasi tata ruang dasar.',
      isMandatoryPrerequisite: true,
      completed: completedIds.includes('chk-nib-02')
    });
    return items;
  }

  // Mandatory prerequisites for any food step
  items.push({
    id: 'chk-nib-ktp',
    licenseId: 'NIB',
    teks: 'KTP elektronik pemilik usaha dan NPWP (jika ada)',
    penjelasan: 'Identitas utama untuk mendaftarkan akun di oss.go.id.',
    isMandatoryPrerequisite: true,
    completed: completedIds.includes('chk-nib-ktp')
  });

  items.push({
    id: 'chk-nib-active',
    licenseId: 'NIB',
    teks: 'NIB (Nomor Induk Berusaha) sudah terbit dari OSS',
    penjelasan: 'Prasyarat WAJIB: Tanpa NIB aktif, Anda belum bisa membuat akun SPP-IRT BPOM dan akun SIHALAL BPJPH.',
    isMandatoryPrerequisite: true,
    completed: profile.hasNIB === 'ya' || completedIds.includes('chk-nib-active')
  });

  // PIRT prerequisites and follow-ups
  items.push({
    id: 'chk-pirt-pkp',
    licenseId: 'PIRT',
    teks: 'Sertifikat PKP (Penyuluhan Keamanan Pangan) Dinas Kesehatan',
    penjelasan: 'Diperoleh dengan mengikuti penyuluhan 1–2 hari di Dinas Kesehatan kabupaten/kota Anda di Bangka Belitung.',
    isMandatoryPrerequisite: true,
    completed: completedIds.includes('chk-pirt-pkp')
  });

  items.push({
    id: 'chk-pirt-label',
    licenseId: 'PIRT',
    teks: 'Rancangan/draf label kemasan produk',
    penjelasan: 'Memuat nama produk, komposisi, berat bersih, nama & alamat produsen, serta keterangan tempat nomor PIRT.',
    isMandatoryPrerequisite: false,
    completed: completedIds.includes('chk-pirt-label')
  });

  items.push({
    id: 'chk-pirt-sarana',
    licenseId: 'PIRT',
    teks: 'Kesiapan dapur/sarana produksi bersih dan terpisah',
    penjelasan: 'Bisa menyusul: komitmen pemeriksaan sarana dipenuhi maksimal 3 bulan setelah nomor PIRT terbit.',
    isMandatoryPrerequisite: false,
    completed: completedIds.includes('chk-pirt-sarana')
  });

  // Halal items
  items.push({
    id: 'chk-halal-bahan',
    licenseId: 'HALAL',
    teks: 'Daftar semua bahan baku, bahan tambahan, dan bumbu',
    penjelasan: 'Catat merek, asal pemasok, dan bukti halal (sertifikat halal atau bahan alami tanpa proses).',
    isMandatoryPrerequisite: true,
    completed: completedIds.includes('chk-halal-bahan')
  });

  items.push({
    id: 'chk-halal-p3h',
    licenseId: 'HALAL',
    teks: 'Kontak Pendamping Proses Produk Halal (P3H) setempat',
    penjelasan: 'P3H akan membimbing pengisian form SIHALAL dan memverifikasi proses produksi Anda di lokasi.',
    isMandatoryPrerequisite: true,
    completed: completedIds.includes('chk-halal-p3h')
  });

  items.push({
    id: 'chk-halal-manual-sjh',
    licenseId: 'HALAL',
    teks: 'Komitmen Sistem Jaminan Produk Halal (SJPH)',
    penjelasan: 'Pernyataan tertulis menjaga sarana produksi bebas dari kontaminasi najis atau bahan haram.',
    isMandatoryPrerequisite: false,
    completed: completedIds.includes('chk-halal-manual-sjh')
  });

  return items;
}
