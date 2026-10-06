'use client';

import React, { useState } from 'react';
import { RockItem, ClassificationGroup } from '@/types/rock';
import { ROCKS, PRESET_CRITERIA } from '@/data/rocks';
import { RockCard } from './RockCard';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, HelpCircle, Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface ClassificationBoardProps {
  onSelectRock: (rock: RockItem) => void;
}

export const ClassificationBoard: React.FC<ClassificationBoardProps> = ({ onSelectRock }) => {
  const [selectedCriteriaIndex, setSelectedCriteriaIndex] = useState(0);
  const currentCriteria = PRESET_CRITERIA[selectedCriteriaIndex];

  // Placements: groupId -> rockId[]
  const [placements, setPlacements] = useState<Record<string, string[]>>({});
  const [checkedResults, setCheckedResults] = useState<{
    isChecked: boolean;
    accuracy: number;
    wrongPlacements: string[];
  } | null>(null);

  // Remaining unclassified rocks
  const placedRockIds = new Set(Object.values(placements).flat());
  const unclassifiedRocks = ROCKS.filter((r) => !placedRockIds.has(r.id));

  const handleSelectCriteria = (index: number) => {
    setSelectedCriteriaIndex(index);
    setPlacements({});
    setCheckedResults(null);
  };

  const handleMoveRock = (rockId: string, targetGroupId: string | null) => {
    setCheckedResults(null);
    setPlacements((prev) => {
      const updated: Record<string, string[]> = {};
      // Remove from all existing groups
      Object.keys(prev).forEach((gId) => {
        updated[gId] = (prev[gId] || []).filter((id) => id !== rockId);
      });

      // Add to target group if specified
      if (targetGroupId) {
        updated[targetGroupId] = [...(updated[targetGroupId] || []), rockId];
      }
      return updated;
    });
  };

  const handleAutoClassify = () => {
    const auto: Record<string, string[]> = {};
    currentCriteria.groups.forEach((group) => {
      auto[group.id] = [...group.expectedRockIds];
    });
    setPlacements(auto);
    setCheckedResults(null);
  };

  const handleReset = () => {
    setPlacements({});
    setCheckedResults(null);
  };

  const handleVerify = () => {
    let totalCorrect = 0;
    const wrong: string[] = [];

    currentCriteria.groups.forEach((group) => {
      const placed = placements[group.id] || [];
      placed.forEach((rockId) => {
        if (group.expectedRockIds.includes(rockId)) {
          totalCorrect++;
        } else {
          wrong.push(rockId);
        }
      });
    });

    const accuracy = Math.round((totalCorrect / ROCKS.length) * 100);
    setCheckedResults({
      isChecked: true,
      accuracy,
      wrongPlacements: wrong
    });

    if (accuracy === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Criteria Selection Bar */}
      <div className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-5 shadow-neo">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#FFE600] text-black border-2 border-black">
                분류 기준 선택
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                암석의 공통점에 따른 묶음 분류 시뮬레이션
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              원하는 기준을 선택하고, 9가지 암석을 알맞은 분류 바구니로 드래그하거나 버튼을 눌러 이동시켜 보세요!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoClassify}
              className="neo-button px-3 py-1.5 bg-[#48CAE4] text-black hover:bg-[#34b6cf] text-xs font-black flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> 자동 분류 예시
            </button>
            <button
              onClick={handleReset}
              className="neo-button px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          </div>
        </div>

        {/* Criteria Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {PRESET_CRITERIA.map((criteria, idx) => (
            <button
              key={criteria.id}
              onClick={() => handleSelectCriteria(idx)}
              className={`p-3 rounded-2xl border-2 border-black text-left transition-all ${
                selectedCriteriaIndex === idx
                  ? 'bg-[#FFE600] shadow-neo -translate-y-0.5 text-black'
                  : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                기준 {idx + 1} • {criteria.badge}
              </span>
              <span className="font-black text-sm block mt-0.5 truncate">
                {criteria.title}
              </span>
            </button>
          ))}
        </div>

        {/* Detailed Scientific Criterion Explanation */}
        <div className="mt-4 p-4 rounded-2xl bg-[#FFF9EB] dark:bg-slate-800/60 border-2 border-black dark:border-white/50 text-xs text-slate-800 dark:text-slate-200">
          <div className="flex items-center gap-1.5 font-black text-sm text-slate-900 dark:text-white mb-1">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>분류 탐구 질문: {currentCriteria.question}</span>
          </div>
          <p className="leading-relaxed">
            <strong>과학적 원리:</strong> {currentCriteria.principle}
          </p>
        </div>
      </div>

      {/* Main Workspace: Unclassified Rocks Shelf + Target Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Unclassified Rocks Tray (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-4 shadow-neo flex flex-col h-full">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black dark:border-white pb-2">
            <div className="flex items-center gap-2">
              <span className="font-black text-base text-slate-900 dark:text-white">
                📦 미분류 암석 보관대
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-[#FF70A6] text-black border border-black">
                {unclassifiedRocks.length} / 9
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-bold">클릭 또는 이동</span>
          </div>

          {unclassifiedRocks.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 my-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-black text-sm text-slate-800 dark:text-slate-200">
                모든 암석이 분류함에 배치되었습니다!
              </p>
              <p className="text-xs text-slate-500 mt-1">
                아래 [정답 검증하기] 버튼을 눌러 채점해 보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 overflow-y-auto max-h-[560px] pr-1">
              {unclassifiedRocks.map((rock) => (
                <div key={rock.id} className="relative group">
                  <RockCard rock={rock} onSelect={onSelectRock} isCompact={true} />
                  {/* Quick move buttons */}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {currentCriteria.groups.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => handleMoveRock(rock.id, group.id)}
                        className="text-[10px] font-black px-2 py-0.5 rounded-md border border-black bg-slate-100 hover:bg-yellow-200 text-black transition-colors"
                      >
                        → {group.title.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Classification Group Buckets (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCriteria.groups.map((group) => {
              const rocksInGroup = (placements[group.id] || [])
                .map((id) => ROCKS.find((r) => r.id === id))
                .filter(Boolean) as RockItem[];

              return (
                <div
                  key={group.id}
                  className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-4 shadow-neo flex flex-col justify-between"
                  style={{ borderTopWidth: '8px', borderTopColor: group.color }}
                >
                  <div>
                    {/* Group Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-black text-base text-slate-900 dark:text-white">
                          {group.title}
                        </h3>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {group.subtitle}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-black bg-slate-100 dark:bg-slate-800 border border-black text-slate-800 dark:text-slate-200">
                        {rocksInGroup.length}개 담김
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 mb-3 leading-relaxed">
                      {group.description}
                    </p>

                    {/* Placed Rocks List */}
                    <div className="space-y-2 min-h-[160px] p-2 bg-slate-50/60 dark:bg-slate-800/40 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
                      {rocksInGroup.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-xs text-slate-400 py-10 font-bold">
                          이곳으로 암석을 배치하세요
                        </div>
                      ) : (
                        rocksInGroup.map((rock) => (
                          <div
                            key={rock.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-700 border-2 border-black dark:border-white shadow-neo-sm"
                          >
                            <div
                              onClick={() => onSelectRock(rock)}
                              className="flex items-center gap-2 cursor-pointer flex-1"
                            >
                              <img
                                src={rock.imageUrl}
                                alt={rock.name}
                                className="w-8 h-8 rounded-lg object-cover border border-black"
                              />
                              <div>
                                <span className="font-black text-xs text-slate-900 dark:text-white block">
                                  {rock.name}
                                </span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                  {rock.subCategory}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleMoveRock(rock.id, null)}
                              title="보관대로 되돌리기"
                              className="text-xs font-black px-2 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200 border border-black"
                            >
                              꺼내기
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Validation & Feedback Bar */}
          <div className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-4 shadow-neo flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-black text-sm text-slate-900 dark:text-white block">
                배치 완료 후 정확도를 확인해 보세요!
              </span>
              <span className="text-xs text-slate-500">
                9가지 암석의 분류 기준에 부합하는지 즉시 채점하고 상세 피드백을 제공합니다.
              </span>
            </div>

            <button
              onClick={handleVerify}
              className="neo-button px-6 py-2.5 bg-[#FFE600] text-black hover:bg-[#ebd300] font-black text-sm flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> 분류 정답 검증하기
            </button>
          </div>

          {/* Verification Result Modal / Alert */}
          {checkedResults && (
            <div
              className={`p-4 rounded-3xl border-[3px] border-black shadow-neo-lg text-slate-900 transition-all ${
                checkedResults.accuracy === 100
                  ? 'bg-[#70E000] text-black'
                  : 'bg-[#FFE600] text-black'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-lg">
                  {checkedResults.accuracy === 100 ? '🎉 완벽합니다! 100점!' : '🔎 채점 결과: ' + checkedResults.accuracy + '점'}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 bg-white rounded-full border border-black">
                  일치율: {checkedResults.accuracy}%
                </span>
              </div>
              <p className="text-xs font-bold leading-relaxed">
                {checkedResults.accuracy === 100
                  ? '모든 암석을 기준에 맞춰 완벽하게 분류하였습니다! 아래 상세 해설 탭에서 과학적 원리를 더 깊이 학습해 보세요.'
                  : '일부 암석이 알맞지 않은 기준에 놓여 있습니다. 위의 상세 설명과 암석 도감을 참고하여 올바른 바구니로 재배치해 보세요.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
