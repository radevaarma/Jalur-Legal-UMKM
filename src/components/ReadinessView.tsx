import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserProfile, ReadinessItem } from '../types';
import { getReadinessChecklist } from '../data/rules';

interface ReadinessViewProps {
  profile: UserProfile;
  onProceedToRoadmap: () => void;
  onProceedToKit: () => void;
}

const STORAGE_KEY = 'jalur_legal_checklist_v1';

export const ReadinessView: React.FC<ReadinessViewProps> = ({
  profile,
  onProceedToRoadmap,
  onProceedToKit
}) => {
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
    } catch (e) {
      console.warn('Failed to save readiness state', e);
    }
  }, [completedIds]);

  const toggleItem = (id: string) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const allItems = getReadinessChecklist(profile, completedIds);
  const mandatoryItems = allItems.filter(item => item.isMandatoryPrerequisite);
  const followUpItems = allItems.filter(item => !item.isMandatoryPrerequisite);

  const completedCount = allItems.filter(item => item.completed).length;
  const percentage = allItems.length > 0 ? Math.round((completedCount / allItems.length) * 100) : 0;

  return (
    <div className="max-w-[640px] mx-auto py-8 px-4 text-left">
      <div className="mb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F766E]">Langkah 4</span>
        <h1 className="text-2xl font-bold text-[#1C1917] mt-0.5">Cek Kesiapan Dokumen & Syarat</h1>
        <p className="text-sm text-[#6B6F6C] mt-1">
          Beri tanda centang pada syarat yang sudah siap. Prasyarat wajib harus diselesaikan lebih dulu sebelum tahap berikutnya.
        </p>
      </div>

      {/* Progress Score Bar */}
      <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold text-[#1C1917]">Skor Kesiapan Anda</span>
          <span className="font-bold text-[#0F766E]">{completedCount} dari {allItems.length} syarat ({percentage}%)</span>
        </div>
        <div className="w-full bg-[#E5E7EB] h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#0F766E] h-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-[#6B6F6C]">
          {percentage === 100 ? (
            <span className="text-[#0F766E] font-medium">Luar biasa! Semua dokumen dan prasyarat Anda telah siap diajukan.</span>
          ) : (
            <span>Centang yang sudah Anda pegang atau siapkan di rumah.</span>
          )}
        </div>
      </div>

      {/* 1. Prasyarat Wajib (Mandatory) */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-[#B45309]" strokeWidth={1.5} />
          <h2 className="font-bold text-base text-[#1C1917]">
            Prasyarat Wajib (Harus ada sebelum izin terbit)
          </h2>
        </div>
        <p className="text-xs text-[#6B6F6C] mb-3">
          Tanpa NIB aktif, Anda belum bisa mendaftar di akun SPP-IRT BPOM atau SIHALAL BPJPH.
        </p>

        <div className="space-y-2.5">
          {mandatoryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full text-left p-3.5 rounded-lg border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                item.completed
                  ? 'bg-[#E6F2F0]/40 border-[#0F766E]/40'
                  : 'bg-white border-[#E5E7EB] hover:border-[#6B6F6C]'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-[#0F766E]">
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-[#0F766E]" strokeWidth={1.5} />
                ) : (
                  <Square className="w-5 h-5 text-[#6B6F6C]" strokeWidth={1.5} />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${item.completed ? 'text-[#0F766E] line-through' : 'text-[#1C1917]'}`}>
                  {item.teks}
                </div>
                <div className="text-xs text-[#6B6F6C] mt-0.5 leading-relaxed">
                  {item.penjelasan}
                </div>
                <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                  {item.licenseId}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Syarat Yang Bisa Menyusul (Follow-up) */}
      {followUpItems.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#0F766E]" strokeWidth={1.5} />
            <h2 className="font-bold text-base text-[#1C1917]">
              Syarat Yang Bisa Menyusul
            </h2>
          </div>
          <p className="text-xs text-[#6B6F6C] mb-3">
            Komitmen pemeriksaan sarana higienitas diberi tenggat waktu maksimal 3 bulan setelah nomor izin PIRT Anda terbit.
          </p>

          <div className="space-y-2.5">
            {followUpItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                  item.completed
                    ? 'bg-[#E6F2F0]/40 border-[#0F766E]/40'
                    : 'bg-white border-[#E5E7EB] hover:border-[#6B6F6C]'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-[#0F766E]">
                  {item.completed ? (
                    <CheckSquare className="w-5 h-5 text-[#0F766E]" strokeWidth={1.5} />
                  ) : (
                    <Square className="w-5 h-5 text-[#6B6F6C]" strokeWidth={1.5} />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${item.completed ? 'text-[#0F766E] line-through' : 'text-[#1C1917]'}`}>
                    {item.teks}
                  </div>
                  <div className="text-xs text-[#6B6F6C] mt-0.5 leading-relaxed">
                    {item.penjelasan}
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    {item.licenseId}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Next Buttons */}
      <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
        <button
          onClick={onProceedToRoadmap}
          className="h-12 px-6 bg-[#0F766E] hover:bg-[#0D655E] text-white text-base font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150"
        >
          <span>Lanjut ke Roadmap & Direktori Babel</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <button
          onClick={onProceedToKit}
          className="h-12 px-5 bg-white hover:bg-[#FAFAF7] text-[#1C1917] border border-[#E5E7EB] text-base font-medium rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150"
        >
          <span>Buka Kit Dokumen & Draf Label</span>
        </button>
      </div>
    </div>
  );
};
