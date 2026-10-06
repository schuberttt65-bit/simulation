'use client';

import React, { useState } from 'react';
import { RockItem } from '@/types/rock';
import { X, Sparkles, FlaskConical, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

interface RockModalProps {
  rock: RockItem | null;
  onClose: () => void;
}

export const RockModal: React.FC<RockModalProps> = ({ rock, onClose }) => {
  const [testedAcid, setTestedAcid] = useState(false);
  const [acidReacting, setAcidReacting] = useState(false);

  if (!rock) return null;

  const handleTestAcid = () => {
    setAcidReacting(true);
    setTestedAcid(true);
    setTimeout(() => {
      setAcidReacting(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl shadow-neo-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-black dark:border-white bg-[#FFE600] text-black">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔬</span>
            <div>
              <h2 className="text-2xl font-black">
                {rock.name} <span className="text-base font-bold text-slate-700">({rock.english})</span>
              </h2>
              <p className="text-xs font-bold text-slate-800">
                {rock.category} • {rock.subCategory}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border-2 border-black bg-white hover:bg-slate-100 shadow-neo-sm font-black"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Visual & Virtual Drop Area */}
          <div className="relative h-64 rounded-2xl overflow-hidden border-[3px] border-black shadow-neo">
            <img src={rock.imageUrl} alt={rock.name} className="w-full h-full object-cover" />

            {/* Bubble Animation when reacting */}
            {acidReacting && rock.hasAcidReaction && (
              <div className="absolute inset-0 bg-emerald-950/30 flex items-center justify-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/80 animate-bubble-1 absolute -left-6" />
                  <div className="w-8 h-8 rounded-full bg-white/90 animate-bubble-2 absolute left-4" />
                  <div className="w-10 h-10 rounded-full bg-white/70 animate-bubble-3 absolute -top-4" />
                  <div className="bg-[#FF70A6] text-black font-black px-4 py-2 rounded-2xl border-[3px] border-black shadow-neo text-sm animate-pulse">
                    💨 치이익~! CO₂ 기포 격렬 반응 중!
                  </div>
                </div>
              </div>
            )}

            {/* Acid Reaction Action */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                onClick={handleTestAcid}
                disabled={acidReacting}
                className="neo-button px-3.5 py-2 bg-[#FF70A6] text-black hover:bg-[#ff5596] font-black text-xs flex items-center gap-1.5"
              >
                <FlaskConical className="w-4 h-4" /> 묽은 염산(HCl) 반응 시험
              </button>
            </div>
          </div>

          {/* Test Result Feedback */}
          {testedAcid && (
            <div
              className={`p-3.5 rounded-2xl border-[3px] border-black shadow-neo-sm flex items-start gap-2.5 text-xs font-bold ${
                rock.hasAcidReaction
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-950'
                  : 'bg-amber-100 text-amber-950 border-amber-950'
              }`}
            >
              {rock.hasAcidReaction ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-black text-sm block">반응 확인: 거품 발생 (양성)</span>
                    방해석(CaCO₃) 성분이 포함되어 있어 염산과 즉각 반응하여 이산화탄소(CO₂) 기포가 솟아오릅니다.
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <span className="font-black text-sm block">반응 없음: 음성</span>
                    규산염 광물로 구성되어 있어 묽은 염산과 화학적으로 반응하지 않습니다.
                  </div>
                </>
              )}
            </div>
          )}

          {/* Detailed Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-black dark:border-white shadow-neo-sm">
              <h4 className="font-black text-sm mb-2 text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-600" /> 광물 조성 및 물리적 성질
              </h4>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>알갱이 크기</strong>: {rock.grainSize}</li>
                <li>• <strong>색상 톤</strong>: {rock.colorTone}</li>
                <li>• <strong>화학 조성</strong>: {rock.silicaContent}</li>
                <li>• <strong>염산 반응</strong>: {rock.hasAcidReaction ? 'O (반응함)' : 'X (반응없음)'}</li>
                <li>• <strong>주요 구성 광물</strong>: {rock.mainMinerals.join(', ')}</li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-black dark:border-white shadow-neo-sm">
              <h4 className="font-black text-sm mb-2 text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> 특징 및 대표 활용
              </h4>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">핵심 식별 포인트:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {rock.keyFeatures.map((feat, i) => (
                      <span key={i} className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg font-bold text-[11px] border border-amber-400">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-1">
                  <span className="font-bold text-slate-900 dark:text-white">일상 생활 속 쓰임새: </span>
                  {rock.usage}
                </div>
              </div>
            </div>
          </div>

          {/* Geological Formation */}
          <div className="bg-[#FFF9EB] dark:bg-slate-800/80 p-4 rounded-2xl border-2 border-black dark:border-white">
            <h4 className="font-black text-sm mb-1.5 text-slate-900 dark:text-white">
              🌍 지구과학 생성 과정 (형성 스토리)
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {rock.formationProcess}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t-[3px] border-black dark:border-white bg-slate-50 dark:bg-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="neo-button px-6 py-2 bg-slate-900 text-white dark:bg-white dark:text-black font-black text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
