'use client';

import React, { useState } from 'react';
import { ROCKS } from '@/data/rocks';
import { RockItem } from '@/types/rock';
import { FlaskConical, Droplets, CheckCircle, XCircle, Info, Sparkles } from 'lucide-react';

export const VirtualLab: React.FC = () => {
  const [selectedRock, setSelectedRock] = useState<RockItem>(ROCKS[6]); // default Limestone
  const [isReacting, setIsReacting] = useState(false);
  const [hasTested, setHasTested] = useState<Record<string, boolean>>({});

  const handleDropAcid = () => {
    setIsReacting(true);
    setHasTested((prev) => ({ ...prev, [selectedRock.id]: true }));

    // Sound synthesis using Web Audio API for bubble fizz
    if (selectedRock.hasAcidReaction && typeof window !== 'undefined' && window.AudioContext) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } catch (e) {}
    }

    setTimeout(() => {
      setIsReacting(false);
    }, 2800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-6 shadow-neo">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#FF70A6] rounded-2xl border-2 border-black text-black">
                <FlaskConical className="w-6 h-6" />
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                가상 지구과학 실험실: 묽은 염산(HCl) 반응 시험
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
              탄산칼슘(CaCO₃) 성분이 포함된 암석은 묽은 염산(HCl)과 접촉 시 이산화탄소(CO₂) 가스를 방출하며 격렬하게 거품을 일으킵니다. 암석을 고르고 스포이트를 클릭하여 반응을 관찰해 보세요!
            </p>
          </div>

          <div className="bg-[#FFF9EB] dark:bg-slate-800 p-3 rounded-2xl border-2 border-black text-xs font-bold text-slate-800 dark:text-slate-200">
            <span className="block text-[11px] text-amber-700 dark:text-amber-400 font-black">
              화학 반응식 (Chemical Equation)
            </span>
            <code>CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑</code>
          </div>
        </div>
      </div>

      {/* Main Experiment Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rock Selector Palette (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-4 shadow-neo space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-sm text-slate-900 dark:text-white">
              실험용 시료 암석 선택
            </h3>
            <span className="text-[11px] font-bold text-slate-500">
              시험 완료: {Object.keys(hasTested).length} / 9
            </span>
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {ROCKS.map((rock) => {
              const tested = hasTested[rock.id];
              const isSelected = selectedRock.id === rock.id;

              return (
                <button
                  key={rock.id}
                  onClick={() => setSelectedRock(rock)}
                  className={`w-full p-2.5 rounded-2xl border-2 border-black text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#FFE600] shadow-neo text-black font-black'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rock.imageUrl}
                      alt={rock.name}
                      className="w-10 h-10 rounded-xl object-cover border border-black"
                    />
                    <div>
                      <span className="font-black text-sm block">{rock.name}</span>
                      <span className="text-[10px] opacity-75">{rock.category}</span>
                    </div>
                  </div>

                  {tested && (
                    <span className="text-xs font-black">
                      {rock.hasAcidReaction ? (
                        <span className="text-pink-600 flex items-center gap-0.5">
                          <CheckCircle className="w-3.5 h-3.5" /> 반응 O
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-0.5">
                          <XCircle className="w-3.5 h-3.5" /> 반응 X
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experiment Observation Chamber (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-6 shadow-neo flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-black text-slate-700 dark:text-slate-300">
                  {selectedRock.category} • {selectedRock.subCategory}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedRock.name} 표면 관찰 및 염산 적하
                </h3>
              </div>

              <button
                onClick={handleDropAcid}
                disabled={isReacting}
                className="neo-button px-5 py-3 bg-[#FF70A6] text-black hover:bg-[#ff5193] font-black text-sm flex items-center gap-2 shadow-neo-lg"
              >
                <Droplets className="w-5 h-5 text-black" />
                {isReacting ? '염산 반응 중...' : '묽은 염산 1방울 떨어뜨리기'}
              </button>
            </div>

            {/* Specimen Stage View */}
            <div className="relative h-72 rounded-2xl overflow-hidden border-[3px] border-black shadow-neo bg-slate-900 flex items-center justify-center">
              <img
                src={selectedRock.imageUrl}
                alt={selectedRock.name}
                className="w-full h-full object-cover opacity-90"
              />

              {/* Pipette & Droplet Animation */}
              {isReacting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                  {selectedRock.hasAcidReaction ? (
                    <div className="text-center">
                      {/* Bubble fountain */}
                      <div className="relative inline-block mb-3">
                        <div className="w-16 h-16 rounded-full bg-white/80 animate-bubble-1" />
                        <div className="w-12 h-12 rounded-full bg-white/90 animate-bubble-2 absolute -top-4 -left-6" />
                        <div className="w-10 h-10 rounded-full bg-white/70 animate-bubble-3 absolute -top-8 left-8" />
                      </div>
                      <div className="bg-[#FF70A6] text-black font-black text-lg px-6 py-2.5 rounded-2xl border-[3px] border-black shadow-neo">
                        💨 보글보글! CO₂ 기포가 격렬히 발생합니다!
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-100 text-slate-900 font-black text-base px-6 py-2.5 rounded-2xl border-[3px] border-black shadow-neo">
                      💧 반응 없음 (아무런 거품이 생기지 않습니다)
                    </div>
                  )}
                </div>
              )}

              {/* Label Tag */}
              <div className="absolute bottom-3 left-3 bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/40">
                시료: {selectedRock.name} ({selectedRock.grainSize})
              </div>
            </div>
          </div>

          {/* Analysis & Observation Result */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white">
            <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
              <Info className="w-4 h-4 text-blue-500" />
              실험 관찰 결과 보고 및 원리
            </h4>
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed font-medium">
              <p>
                • <strong>반응 여부:</strong> {selectedRock.hasAcidReaction ? '격렬한 기포 발생 (탄산칼슘 반응)' : '반응 없음 (규산염 암석)'}
              </p>
              <p>
                • <strong>주요 광물:</strong> {selectedRock.mainMinerals.join(', ')}
              </p>
              <p>
                • <strong>지구과학적 설명:</strong> {selectedRock.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
