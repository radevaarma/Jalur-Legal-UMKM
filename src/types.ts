export type ProductType = 
  | 'makanan_kering' 
  | 'makanan_basah' 
  | 'minuman' 
  | 'non_pangan';

export type RegencyBabel = 
  | 'bangka' 
  | 'bangka_barat' 
  | 'bangka_tengah' 
  | 'bangka_selatan' 
  | 'belitung' 
  | 'belitung_timur' 
  | 'pangkalpinang' 
  | 'luar_babel';

export type BusinessScale = 'mikro' | 'kecil';
export type ProductionPlace = 'rumah' | 'tempat_khusus';
export type OwnershipStatus = 'ya' | 'belum' | 'tidak_tahu';
export type AnimalIngredientStatus = 'ya' | 'tidak';
export type AdditiveStatus = 'ya' | 'tidak';
export type ProductCountRange = '1_5' | '6_10' | 'lebih_dari_10';

export interface UserProfile {
  productType: ProductType;
  regency: RegencyBabel;
  scale: BusinessScale;
  productionPlace: ProductionPlace;
  hasNIB: OwnershipStatus;
  hasPIRT: OwnershipStatus;
  hasHalal: OwnershipStatus;
  hasAnimalIngredients: AnimalIngredientStatus;
  hasAdditives: AdditiveStatus;
  productCount: ProductCountRange;
  // Optional business name and address for draft kits
  businessName?: string;
  businessAddress?: string;
  primaryProductName?: string;
}

export interface RuleItem {
  id: string;
  kategori: 'NIB' | 'PIRT' | 'HALAL' | 'UMUM';
  judul: string;
  teks_aturan: string;
  ringkasan: string;
  sumber_url: string;
  sumber_nama: string;
  terakhir_diverifikasi: string;
}

export interface LicenseStatusInfo {
  id: 'NIB' | 'PIRT' | 'HALAL';
  nama: string;
  namaLengkap: string;
  singkatanPenjelasan: string;
  status: 'wajib' | 'dibutuhkan' | 'sudah_ada' | 'tidak_perlu' | 'perlu_reguler';
  statusLabel: string;
  alasan: string;
  penjelasanKenapa: string;
  portalNama: string;
  portalUrl: string;
  biaya: string;
  waktuEstimasi: string;
  prasyarat: string[];
}

export interface LegalMapResult {
  isNonFood: boolean;
  notes: string[];
  licenses: LicenseStatusInfo[];
  halalPath: 'self_declare' | 'reguler' | 'tidak_perlu';
  halalPathReason: string;
  deadlineHalal: string;
}

export interface ReadinessItem {
  id: string;
  licenseId: 'NIB' | 'PIRT' | 'HALAL';
  teks: string;
  penjelasan: string;
  isMandatoryPrerequisite: boolean; // Must be met before proceeding
  completed: boolean;
}

export interface DistrictContact {
  id: RegencyBabel;
  nama: string;
  ibuKota: string;
  dinkes: {
    nama: string;
    alamat: string;
    telepon: string;
    layanan: string;
  };
  dpmptsp: {
    nama: string;
    alamat: string;
    telepon: string;
    layanan: string;
  };
  dinkop: {
    nama: string;
    alamat: string;
    telepon: string;
    layanan: string;
  };
}

export interface IngredientItem {
  id: string;
  nama: string;
  fungsi: string;
  merekPemasok: string;
  buktiHalal: 'ada' | 'tidak_ada' | 'tidak_tahu';
  isAnimalOrAdditive: boolean;
  keteranganHalal: string;
}

export interface LabelPackagingDraft {
  namaProduk: string;
  varian: string;
  komposisi: string[];
  beratBersih: string;
  namaProdusen: string;
  alamatProdusen: string;
  pirtNotice: string;
  halalNotice: string;
  kodeProduksiDanKedaluwarsa: string;
  petunjukPenyimpanan: string;
  peringatanAlergen?: string;
  catatanEdukasi: string[];
}

export interface ProgressItem {
  licenseId: 'NIB' | 'PIRT' | 'HALAL';
  status: 'belum' | 'sedang_diurus' | 'selesai';
  catatan: string;
  tanggalPengingat: string;
  terakhirDiperbarui: string;
}
