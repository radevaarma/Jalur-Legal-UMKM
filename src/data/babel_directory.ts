import { DistrictContact, RegencyBabel } from '../types';

export const BABEL_DISTRICTS: Record<RegencyBabel, DistrictContact> = {
  bangka: {
    id: 'bangka',
    nama: 'Kabupaten Bangka',
    ibuKota: 'Sungailiat',
    dinkes: {
      nama: 'Dinas Kesehatan Kabupaten Bangka',
      alamat: 'Jl. Jenderal Sudirman No. 1, Sungailiat, Kab. Bangka, Kepulauan Bangka Belitung',
      telepon: 'Belum diisi',
      layanan: 'Penyuluhan Keamanan Pangan (PKP), Rekomendasi Penerbitan SPP-IRT, dan Uji Higiene Sarana'
    },
    dpmptsp: {
      nama: 'DPMPTSP Kabupaten Bangka',
      alamat: 'Kawasan Perkantoran Pemkab Bangka, Jl. Jenderal Sudirman, Sungailiat',
      telepon: 'Belum diisi',
      layanan: 'Layanan Pendampingan OSS RBA & Penerbitan NIB Perseorangan'
    },
    dinkop: {
      nama: 'Dinas Tenaga Kerja, Perindustrian, Perdagangan dan Koperasi UKM Kab. Bangka',
      alamat: 'Jl. Jenderal Sudirman, Sungailiat, Kab. Bangka',
      telepon: 'Belum diisi',
      layanan: 'Fasilitasi Kurasi Produk UMKM, Sertifikasi Halal Gratis (Sehati), Pelatihan Kemasan'
    }
  },
  bangka_barat: {
    id: 'bangka_barat',
    nama: 'Kabupaten Bangka Barat',
    ibuKota: 'Muntok (Mentok)',
    dinkes: {
      nama: 'Dinas Kesehatan Kabupaten Bangka Barat',
      alamat: 'Komplek Perkantoran Terpadu Pemkab Bangka Barat, Daya Baru, Pal 4 Mentok',
      telepon: 'Belum diisi',
      layanan: 'Penyelenggaraan PKP Kolektif, Inspeksi Sanitasi Tempat Pengolahan Pangan'
    },
    dpmptsp: {
      nama: 'DPMPTSP dan Tenaga Kerja Kabupaten Bangka Barat',
      alamat: 'Komplek Perkantoran Pemkab Bangka Barat, Daya Baru, Mentok',
      telepon: 'Belum diisi',
      layanan: 'Gerai Layanan Perizinan Berusaha OSS & Legalitas Usaha Mikro'
    },
    dinkop: {
      nama: 'Dinas Koperasi, Usaha Kecil Menengah dan Perindustrian Kab. Bangka Barat',
      alamat: 'Komplek Perkantoran Pemkab Bangka Barat, Mentok',
      telepon: 'Belum diisi',
      layanan: 'Bimbingan Usaha Sentra Kemplang/Kerupuk & Pendampingan P3H Halal'
    }
  },
  bangka_tengah: {
    id: 'bangka_tengah',
    nama: 'Kabupaten Bangka Tengah',
    ibuKota: 'Koba',
    dinkes: {
      nama: 'Dinas Kesehatan Kabupaten Bangka Tengah',
      alamat: 'Kompleks Perkantoran Pemerintah Kabupaten Bangka Tengah, Koba',
      telepon: 'Belum diisi',
      layanan: 'Penyuluhan Keamanan Pangan (PKP) Berkala & Konsultasi Label PIRT'
    },
    dpmptsp: {
      nama: 'DPMPTK Kabupaten Bangka Tengah',
      alamat: 'Kompleks Perkantoran Pemkab Bangka Tengah, Jl. Titik Nol, Koba',
      telepon: 'Belum diisi',
      layanan: 'Helpdesk OSS RBA Mandiri & Cetak Sertifikat Standar Usaha'
    },
    dinkop: {
      nama: 'Dinas Perindustrian, Perdagangan, Koperasi dan UKM Kab. Bangka Tengah',
      alamat: 'Kompleks Perkantoran Pemkab Bangka Tengah, Koba',
      telepon: 'Belum diisi',
      layanan: 'Pendampingan Legalitas Usaha Pangan Lokal & Program Sehati BPJPH'
    }
  },
  bangka_selatan: {
    id: 'bangka_selatan',
    nama: 'Kabupaten Bangka Selatan',
    ibuKota: 'Toboali',
    dinkes: {
      nama: 'Dinas Kesehatan, Pengendalian Penduduk dan KB Kab. Bangka Selatan',
      alamat: 'Kompleks Perkantoran Terpadu Gunung Namak, Toboali',
      telepon: 'Belum diisi',
      layanan: 'Pelatihan Keamanan Pangan Olahan Terasi/Kemplang & Verifikasi Sarana'
    },
    dpmptsp: {
      nama: 'DPMPTSP Kabupaten Bangka Selatan',
      alamat: 'Kompleks Perkantoran Terpadu Gunung Namak, Toboali',
      telepon: 'Belum diisi',
      layanan: 'Layanan Berbantuan Perizinan OSS untuk Usaha Mikro Rumahan'
    },
    dinkop: {
      nama: 'Dinas Koperasi, UKM, Perindustrian dan Perdagangan Kab. Bangka Selatan',
      alamat: 'Kompleks Perkantoran Terpadu Gunung Namak, Toboali',
      telepon: 'Belum diisi',
      layanan: 'Fasilitasi Sertifikasi Halal UMK Pesisir & Bantuan Kemasan Pangan'
    }
  },
  belitung: {
    id: 'belitung',
    nama: 'Kabupaten Belitung',
    ibuKota: 'Tanjungpandan',
    dinkes: {
      nama: 'Dinas Kesehatan Kabupaten Belitung',
      alamat: 'Jl. Jenderal Sudirman Km. 4.5, Tanjungpandan, Belitung',
      telepon: 'Belum diisi',
      layanan: 'Penyuluhan Keamanan Pangan (PKP) untuk Pengrajin Kerupuk/Oleh-oleh'
    },
    dpmptsp: {
      nama: 'DPMPTSP Kabupaten Belitung',
      alamat: 'Jl. Jenderal Sudirman, Tanjungpandan, Belitung',
      telepon: 'Belum diisi',
      layanan: 'Pelayanan Perizinan Terpadu OSS RBA & Konsultasi KBLI Pangan'
    },
    dinkop: {
      nama: 'Dinas Koperasi, UKM, Perdagangan dan Tenaga Kerja Kab. Belitung',
      alamat: 'Jl. Depati Rahat, Tanjungpandan, Belitung',
      telepon: 'Belum diisi',
      layanan: 'Pemberdayaan UMKM Pariwisata, Pendampingan P3H Halal Belitung'
    }
  },
  belitung_timur: {
    id: 'belitung_timur',
    nama: 'Kabupaten Belitung Timur',
    ibuKota: 'Manggar',
    dinkes: {
      nama: 'Dinas Kesehatan Kabupaten Belitung Timur',
      alamat: 'Komplek Perkantoran Terpadu Mangawan, Manggar, Belitung Timur',
      telepon: 'Belum diisi',
      layanan: 'Pelatihan Keamanan Pangan Olahan Rumahan & Audit Higiene SPP-IRT'
    },
    dpmptsp: {
      nama: 'DPMPTSPKUKM Kabupaten Belitung Timur',
      alamat: 'Komplek Perkantoran Terpadu Mangawan, Manggar, Belitung Timur',
      telepon: 'Belum diisi',
      layanan: 'Penerbitan NIB OSS RBA & Sinkronisasi Data Pelaku Usaha Mikro'
    },
    dinkop: {
      nama: 'Bidang Koperasi dan UKM DPMPTSPKUKM Kab. Belitung Timur',
      alamat: 'Komplek Perkantoran Terpadu Mangawan, Manggar',
      telepon: 'Belum diisi',
      layanan: 'Klinik UMKM Belitung Timur & Fasilitasi Sertifikasi Halal Gratis'
    }
  },
  pangkalpinang: {
    id: 'pangkalpinang',
    nama: 'Kota Pangkalpinang',
    ibuKota: 'Pangkalpinang',
    dinkes: {
      nama: 'Dinas Kesehatan Kota Pangkalpinang',
      alamat: 'Jl. Rasa Kunda, Girimaya, Kota Pangkalpinang, Kepulauan Bangka Belitung',
      telepon: 'Belum diisi',
      layanan: 'Sertifikasi PKP Dinkes Kota, Verifikasi Komitmen SPP-IRT BPOM'
    },
    dpmptsp: {
      nama: 'DPMPTSP Kota Pangkalpinang',
      alamat: 'Kawasan Perkantoran Walikota Pangkalpinang, Jl. Basuki Rachmat',
      telepon: 'Belum diisi',
      layanan: 'Mal Pelayanan Publik (MPP) Pangkalpinang & Pendampingan NIB OSS'
    },
    dinkop: {
      nama: 'Dinas Koperasi, UMKM dan Perdagangan Kota Pangkalpinang',
      alamat: 'Jl. Merdeka No. 4, Pangkalpinang',
      telepon: 'Belum diisi',
      layanan: 'Pusat Layanan Usaha Terpadu (PLUT) UMKM & Sentra Pendamping Halal'
    }
  },
  luar_babel: {
    id: 'luar_babel',
    nama: 'Di Luar Bangka Belitung',
    ibuKota: 'Wilayah Lain di Indonesia',
    dinkes: {
      nama: 'Dinas Kesehatan Kabupaten/Kota Setempat',
      alamat: 'Kantor Dinas Kesehatan di domisili tempat usaha Anda',
      telepon: 'Belum diisi',
      layanan: 'Layanan Penyuluhan Keamanan Pangan (PKP) dan Pemeriksaan Sarana PIRT'
    },
    dpmptsp: {
      nama: 'DPMPTSP / Mal Pelayanan Publik (MPP) Setempat',
      alamat: 'Kantor DPMPTSP atau MPP di kabupaten/kota domisili Anda',
      telepon: 'Belum diisi',
      layanan: 'Bantuan Pendaftaran NIB OSS RBA Mandiri'
    },
    dinkop: {
      nama: 'Dinas Koperasi & UKM Setempat',
      alamat: 'Kantor Dinas Koperasi dan UKM setempat',
      telepon: 'Belum diisi',
      layanan: 'Informasi Kuota Sertifikasi Halal Gratis (Sehati) & Pembinaan Usaha'
    }
  }
};
