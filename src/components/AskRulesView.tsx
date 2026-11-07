import React, { useState } from 'react';
import { Send, HelpCircle, ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { TERAKHIR_DIVERIFIKASI, BATAS_AKHIR_WAJIB_HALAL_UMK } from '../data/rules';

interface AskRulesViewProps {
  profile: UserProfile | null;
  onProceedToTracker: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  sourceUrl?: string;
  verifiedDate?: string;
}

const QUICK_QUESTIONS = [
  'Bolehkah dapur rumah dipakai untuk izin PIRT?',
  'Berapa biaya sertifikat halal self-declare?',
  'Apakah kemplang ikan wajib sertifikat halal?',
  'Kapan batas penahapan wajib halal UMK?',
  'Apakah bisa buat PIRT sebelum punya NIB?'
];

export const AskRulesView: React.FC<AskRulesViewProps> = ({
  profile,
  onProceedToTracker
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! Saya asisten panduan perizinan Jalur Legal UMKM. Anda dapat menanyakan aturan seputar NIB, PIRT, dan Sertifikat Halal. Jawaban saya dirujuk langsung dari basis aturan resmi kementerian terkait.',
      source: 'Basis Regulasi OSS, PerBPOM 22/2018, dan Keputusan Kepala BPJPH',
      sourceUrl: 'https://oss.go.id',
      verifiedDate: TERAKHIR_DIVERIFIKASI
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (queryText: string) => {
    const textToSend = queryText.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          profileContext: profile
        })
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: 'reply-' + Date.now(),
        sender: 'assistant',
        text: data.answer || 'Maaf, terjadi kendala mengambil jawaban.',
        source: data.source || 'Regulasi Perizinan Pangan Indonesia',
        sourceUrl: data.sourceUrl || 'https://oss.go.id',
        verifiedDate: data.verifiedDate || TERAKHIR_DIVERIFIKASI
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: 'reply-err-' + Date.now(),
        sender: 'assistant',
        text: 'Berdasarkan regulasi resmi, NIB adalah prasyarat mutlak sebelum mengurus PIRT dan Halal. Sertifikasi Halal Self-Declare gratis untuk UMK berproses sederhana maksimal 10 nama produk, dengan tenggat waktu penahapan hingga ' + BATAS_AKHIR_WAJIB_HALAL_UMK + '. Untuk kepastian teknis, Anda perlu bertanya ke Dinas Kesehatan setempat atau kantor Kemenag.',
        source: 'PerBPOM 22/2018 & Kepkaban BPJPH',
        sourceUrl: 'https://bpjph.halal.go.id',
        verifiedDate: TERAKHIR_DIVERIFIKASI
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[640px] mx-auto py-8 px-4 text-left">
      <div className="mb-4">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F766E]">Langkah 7</span>
        <h1 className="text-2xl font-bold text-[#1C1917] mt-0.5">Tanya Aturan Perizinan</h1>
        <p className="text-sm text-[#6B6F6C] mt-1">
          Pertanyaan Anda dijawab merujuk pada basis aturan resmi kementerian. Bukan nasihat hukum.
        </p>
      </div>

      {/* Suggested Quick Questions */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-[#6B6F6C] mb-2">Contoh pertanyaan cepat:</div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-xs bg-white hover:bg-[#E6F2F0]/60 border border-[#E5E7EB] text-[#1C1917] px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="p-4 border border-[#E5E7EB] rounded-lg bg-white min-h-[380px] max-h-[500px] overflow-y-auto mb-4 space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[90%] p-3.5 rounded-lg text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#0F766E] text-white'
                    : 'bg-[#FAFAF7] border border-[#E5E7EB] text-[#1C1917]'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {!isUser && m.source && (
                  <div className="mt-3 pt-2.5 border-t border-[#E5E7EB] text-xs text-[#6B6F6C] space-y-0.5">
                    <div className="font-semibold text-[#1C1917]">
                      Sumber: {m.source}
                    </div>
                    <div>
                      Terakhir diverifikasi: <strong>{m.verifiedDate || TERAKHIR_DIVERIFIKASI}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#6B6F6C] p-2">
            <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
            <span>Mencocokkan dengan basis aturan resmi...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputQuestion);
        }}
        className="flex gap-2 mb-4"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Tanyakan hal seputar NIB, PIRT, atau sertifikat halal..."
          className="flex-1 h-12 px-3.5 border border-[#E5E7EB] bg-white rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuestion.trim()}
          className="h-12 px-5 bg-[#0F766E] hover:bg-[#0D655E] disabled:bg-gray-300 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          aria-label="Kirim pertanyaan"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Kirim</span>
        </button>
      </form>

      {/* Boundary & Disclaimer Notice */}
      <div className="p-3 bg-[#FAFAF7] border border-[#E5E7EB] rounded text-xs text-[#6B6F6C] leading-relaxed mb-8 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
        <span>
          Asisten ini hanya mengutip aturan baku perizinan dan tidak memberikan nasihat hukum. Bila topik belum tercakup, Anda perlu bertanya ke Dinas Kesehatan kabupaten/kota atau kantor Kemenag setempat di Bangka Belitung.
        </span>
      </div>

      <div className="pt-2 border-t border-[#E5E7EB]">
        <button
          onClick={onProceedToTracker}
          className="w-full h-12 bg-white hover:bg-[#FAFAF7] text-[#1C1917] border border-[#E5E7EB] text-sm font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Buka Pantau Progres & Ringkasan WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
