import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { RULE_BASE, TERAKHIR_DIVERIFIKASI, BATAS_AKHIR_WAJIB_HALAL_UMK } from './src/data/rules.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI client with required User-Agent
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback label generator when Gemini API is unavailable
function generateLocalLabelDraft(params: {
  namaProduk: string;
  varian?: string;
  bahan: string[];
  beratBersih: string;
  namaProdusen: string;
  alamatProdusen: string;
}) {
  const { namaProduk, varian, bahan, beratBersih, namaProdusen, alamatProdusen } = params;
  
  // Clean ingredients
  const cleanedIngredients = bahan.length > 0 
    ? bahan 
    : ['Ikan tenggiri segar', 'Tepung tapioka', 'Garam', 'Gula pasir', 'Bawang putih', 'Minyak nabati'];
    
  const hasFishOrSeafood = cleanedIngredients.some(b => 
    /ikan|tenggiri|udang|kepiting|cumi/i.test(b)
  );
  
  return {
    namaProduk: namaProduk || 'Kemplang Panggang Khas Bangka',
    varian: varian || 'Original',
    komposisi: cleanedIngredients,
    beratBersih: beratBersih || '250 gram',
    namaProdusen: namaProdusen || 'UMKM Berkah Mandiri',
    alamatProdusen: alamatProdusen || 'Sungailiat, Kabupaten Bangka, Kepulauan Bangka Belitung',
    pirtNotice: 'P-IRT No. [Nomor otomatis dicetak setelah terbit dari Dinkes/BPOM]',
    halalNotice: 'Logo Halal Indonesia [Nomor ID Ketetapan dicetak setelah sertifikat terbit]',
    kodeProduksiDanKedaluwarsa: 'Baik digunakan sebelum: DD/MM/YYYY | Kode Produksi: [Tercetak di kemasan]',
    petunjukPenyimpanan: 'Simpan di tempat yang sejuk, kering, dan tertutup rapat. Hindari paparan sinar matahari langsung.',
    peringatanAlergen: hasFishOrSeafood ? 'Informasi Alergen: Mengandung alergen bahan olahan laut/ikan.' : undefined,
    catatanEdukasi: [
      'Urutan komposisi wajib disusun dari bahan dengan takaran/bobot terbanyak ke paling sedikit.',
      'Nama produk tidak boleh menggunakan kata yang menyesatkan atau klaim obat/kesehatan tanpa izin khusus BPOM.',
      'Sertakan informasi berat bersih (Netto) yang jelas dan mudah dibaca pada bagian depan kemasan.'
    ]
  };
}

// POST /api/gemini/label - generate compliant food label draft
app.post('/api/gemini/label', async (req: Request, res: Response) => {
  try {
    const { namaProduk, varian, bahan, beratBersih, namaProdusen, alamatProdusen } = req.body;

    if (!aiClient) {
      const localResult = generateLocalLabelDraft({
        namaProduk,
        varian,
        bahan: Array.isArray(bahan) ? bahan : [],
        beratBersih,
        namaProdusen,
        alamatProdusen
      });
      return res.json(localResult);
    }

    const promptText = `
Anda adalah konsultan perizinan pangan olahan UMKM Indonesia berpedoman pada standar label BPOM RI dan Peraturan BPOM No. 22 Tahun 2018 (serta No. 31 Tahun 2018 tentang Label Pangan Olahan).
Berdasarkan data produk berikut:
- Nama Produk: ${namaProduk || 'Kerupuk Kemplang Ikan'}
- Varian: ${varian || 'Original'}
- Daftar Bahan Baku: ${Array.isArray(bahan) ? bahan.join(', ') : 'Ikan tenggiri, tapioka, garam, air, minyak'}
- Berat Bersih: ${beratBersih || '250 g'}
- Nama Produsen/Usaha: ${namaProdusen || 'Dapur Rumahan Barokah'}
- Alamat/Lokasi: ${alamatProdusen || 'Bangka, Kepulauan Bangka Belitung'}

Tugas Anda:
1. Susun urutan komposisi yang logis dari bahan dengan persentase terbanyak ke paling sedikit.
2. Tempat nomor PIRT HARUS diberi keterangan persis: "P-IRT No. [Diisi setelah terbit dari Dinkes/BPOM]".
3. Tempat nomor sertifikat Halal HARUS diberi keterangan: "Logo Halal Indonesia [Diisi setelah nomor sertifikat terbit dari BPJPH]".
4. Tuliskan teks "Baik digunakan sebelum: [Tanggal/Bulan/Tahun] | Kode Produksi: [Kode batch]".
5. Berikan petunjuk penyimpanan yang realistis untuk jenis produk ini.
6. Deteksi alergen (ikan, krustasea/udang, telur, susu, gluten, kacang) dan berikan peringatan alergen jika ada.
7. Berikan 3 poin edukasi singkat bagi pelaku UMKM agar desain label kemasannya lolos verifikasi Dinas Kesehatan.
`;

    const callPromise = (async () => {
      const response = await aiClient!.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Anda adalah pakar perizinan dan standar pelabelan pangan olahan BPOM untuk UMKM Indonesia.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              namaProduk: { type: Type.STRING },
              varian: { type: Type.STRING },
              komposisi: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: 'Daftar bahan terurut dari takaran terbanyak'
              },
              beratBersih: { type: Type.STRING },
              namaProdusen: { type: Type.STRING },
              alamatProdusen: { type: Type.STRING },
              pirtNotice: { type: Type.STRING },
              halalNotice: { type: Type.STRING },
              kodeProduksiDanKedaluwarsa: { type: Type.STRING },
              petunjukPenyimpanan: { type: Type.STRING },
              peringatanAlergen: { type: Type.STRING },
              catatanEdukasi: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              }
            },
            required: [
              'namaProduk', 
              'komposisi', 
              'beratBersih', 
              'namaProdusen', 
              'alamatProdusen', 
              'pirtNotice', 
              'halalNotice', 
              'kodeProduksiDanKedaluwarsa', 
              'petunjukPenyimpanan', 
              'catatanEdukasi'
            ]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    })();

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Gemini API timeout')), 4000)
    );

    const parsed = await Promise.race([callPromise, timeoutPromise]);
    return res.json(parsed);
  } catch (error) {
    console.error('Error generating label draft with Gemini, falling back to local:', error);
    const fallback = generateLocalLabelDraft(req.body);
    return res.json(fallback);
  }
});

// POST /api/gemini/chat - Q&A grounded strictly in rules.ts
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { question, profileContext } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Pertanyaan wajib diisi' });
    }

    const rulesContext = RULE_BASE.map(r => 
      `[${r.id}] Kategori: ${r.kategori} | Judul: ${r.judul}\nIsi: ${r.teks_aturan}\nSumber: ${r.sumber_nama} (${r.sumber_url})\nTerakhir diverifikasi: ${r.terakhir_diverifikasi}`
    ).join('\n\n');

    if (!aiClient) {
      // Rule-based keyword matching fallback
      const qLower = question.toLowerCase();
      let matchedRule = RULE_BASE.find(r => 
        qLower.includes(r.kategori.toLowerCase()) || 
        r.judul.toLowerCase().split(' ').some(w => w.length > 3 && qLower.includes(w))
      );
      if (!matchedRule) {
        matchedRule = RULE_BASE[0];
      }

      const answer = `Berdasarkan basis aturan resmi: ${matchedRule.ringkasan}\n\n${matchedRule.teks_aturan}\n\nSumber: ${matchedRule.sumber_nama} (${matchedRule.sumber_url})\nTerakhir diverifikasi: ${matchedRule.terakhir_diverifikasi}\n\nCatatan: Panduan ini bukan keputusan perizinan dan bukan nasihat hukum. Untuk kepastian teknis daerah Bangka Belitung, silakan hubungi Dinas Kesehatan setempat atau kantor Kemenag.`;
      return res.json({
        answer,
        source: matchedRule.sumber_nama,
        sourceUrl: matchedRule.sumber_url,
        verifiedDate: matchedRule.terakhir_diverifikasi
      });
    }

    const systemPrompt = `
Anda adalah asisten konsultan "Jalur Legal UMKM Indonesia", spesifik memandu UMKM pangan olahan (termasuk uji coba Bangka Belitung) mengenai izin NIB, PIRT, dan Sertifikat Halal.

ATURAN KETAT:
1. Anda HANYA boleh menjawab berdasarkan Basis Aturan Resmi yang diberikan di bawah ini.
2. Selalu sertakan sumber resmi dan tanggal verifikasi (${TERAKHIR_DIVERIFIKASI}) pada setiap jawaban.
3. Batas akhir penahapan kewajiban halal UMK adalah: ${BATAS_AKHIR_WAJIB_HALAL_UMK}.
4. Bila pertanyaan pengguna TIDAK tercakup dalam basis aturan di bawah (misal: pajak, sengketa merek, izin edar obat/kosmetik, ekspor rumit), Anda HARUS menyatakan secara jujur bahwa materi tersebut berada di luar cakupan aplikasi ini, dan menyarankan pengguna untuk bertanya langsung ke Dinas Kesehatan setempat atau kantor Kementerian Agama / Satgas Halal Bangka Belitung.
5. Jangan memberi nasihat hukum (legal advice). Selalu gunakan bahasa yang sopan, ramah, bahasa Indonesia sehari-hari, kalimat pendek, dan menyapa pengguna dengan "Anda".

BASIS ATURAN RESMI:
${rulesContext}

KONTEKS PROFIL PENGGUNA (jika ada):
${profileContext ? JSON.stringify(profileContext) : 'Belum mengisi profil'}
`;

    const callPromise = (async () => {
      const response = await aiClient!.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: question,
        config: {
          systemInstruction: systemPrompt,
        }
      });
      return {
        answer: response.text || 'Berdasarkan basis aturan resmi, NIB dan PIRT adalah prasyarat perizinan dasar bagi UMKM pangan.',
        verifiedDate: TERAKHIR_DIVERIFIKASI,
        notes: 'Panduan ini bukan keputusan perizinan resmi.'
      };
    })();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini Chat API timeout')), 4000)
    );

    const result: any = await Promise.race([callPromise, timeoutPromise]);
    return res.json(result);
  } catch (error) {
    console.error('Fallback chat responding from rules:', error);
    // Find closest rule match
    const qLower = (req.body.question || '').toLowerCase();
    let matchedRule = RULE_BASE.find(r => 
      qLower.includes(r.kategori.toLowerCase()) || 
      r.judul.toLowerCase().split(' ').some(w => w.length > 3 && qLower.includes(w))
    ) || RULE_BASE[0];

    const answer = `Berdasarkan basis aturan resmi: ${matchedRule.ringkasan}\n\n${matchedRule.teks_aturan}\n\nSumber: ${matchedRule.sumber_nama} (${matchedRule.sumber_url})\nTerakhir diverifikasi: ${matchedRule.terakhir_diverifikasi}\n\nCatatan: Panduan ini bukan keputusan perizinan dan bukan nasihat hukum. Bila membutuhkan kepastian lebih lanjut untuk wilayah Bangka Belitung, silakan hubungi Dinas Kesehatan setempat atau kantor Kemenag.`;
    
    return res.json({ 
      answer,
      source: matchedRule.sumber_nama,
      sourceUrl: matchedRule.sumber_url,
      verifiedDate: matchedRule.terakhir_diverifikasi
    });
  }
});

// Configure Vite or Static Serve
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Jalur Legal UMKM Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
