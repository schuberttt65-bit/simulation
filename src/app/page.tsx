'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ClassificationBoard } from '@/components/ClassificationBoard';
import { VirtualLab } from '@/components/VirtualLab';
import { ScientificTheory } from '@/components/ScientificTheory';
import { ReportBoard } from '@/components/ReportBoard';
import { RockCard } from '@/components/RockCard';
import { RockModal } from '@/components/RockModal';
import { QuizModal } from '@/components/QuizModal';
import { ROCKS } from '@/data/rocks';
import { RockItem } from '@/types/rock';
import { Sparkles, Compass, Award, Database, Server, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('classify');
  const [selectedRock, setSelectedRock] = useState<RockItem | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] dark:bg-[#0F111A]">
      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        toggleDark={toggleDark}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-6 sm:p-8 shadow-neo-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-[#FFE600] text-black border-2 border-black shadow-neo-sm">
                <Sparkles className="w-3.5 h-3.5" />
                뉴모피즘 × 클레이모피즘 × 네오 브루탈리즘 융합 인터페이스
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                9가지 대표 암석을 탐구하고<br />
                <span className="text-[#FF6B6B] dark:text-[#ff8787]">공통점의 원리</span>로 분류해 보세요!
              </h2>

              <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                화성암(현무암, 화강암, 반려암, 유문암), 퇴적암(사암, 셰일, 석회암), 변성암(편마암, 대리암)의 고해상도 사진과 조직 특성을 확인하고, 묽은 염산(HCl) 가상 반응 실험 및 인터랙티브 묶음 분류를 직접 시뮬레이션할 수 있습니다.
              </p>

              {/* Quick Spec Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-black">
                <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-900 border-2 border-black shadow-neo-sm">
                  ⚡ Seoul icn1 Vercel 최적화
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border-2 border-black shadow-neo-sm">
                  🛡️ Supabase RLS 연동
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border-2 border-black shadow-neo-sm">
                  🔬 가상 염산 스포이트 시뮬레이션
                </span>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="bg-[#FFF9EB] dark:bg-slate-800 p-5 rounded-2xl border-[3px] border-black dark:border-white shadow-neo flex flex-col justify-between space-y-4 lg:w-72">
              <div>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 block mb-1">
                  오늘의 지구과학 미션
                </span>
                <h4 className="font-black text-base text-slate-900 dark:text-white">
                  암석 분류 마스터 퀴즈
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  5개 문항을 모두 맞히고 명예의 전당 1위에 도전하세요!
                </p>
              </div>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="neo-button w-full py-2.5 bg-[#A06CD5] text-white hover:bg-[#8d54c7] font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4" /> 퀴즈 풀고 랭킹 등록
              </button>
            </div>
          </div>
        </section>

        {/* Tab 1: Interactive Classification */}
        {activeTab === 'classify' && (
          <div className="space-y-10 animate-in fade-in">
            <ClassificationBoard onSelectRock={(rock) => setSelectedRock(rock)} />

            {/* 9 Rocks Showcase Gallery */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    🪨 9가지 암석 상세 표본 도감
                  </h3>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">
                    카드를 클릭하면 고해상도 확대 사진, 구성 광물, 가상 염산 반응 시험을 진행할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ROCKS.map((rock) => (
                  <RockCard
                    key={rock.id}
                    rock={rock}
                    onSelect={(r) => setSelectedRock(r)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Virtual HCl Lab */}
        {activeTab === 'lab' && (
          <div className="animate-in fade-in">
            <VirtualLab />
          </div>
        )}

        {/* Tab 3: Detailed Scientific Theory */}
        {activeTab === 'theory' && (
          <div className="animate-in fade-in">
            <ScientificTheory />
          </div>
        )}

        {/* Tab 4: Student Exploration Reports */}
        {activeTab === 'reports' && (
          <div className="animate-in fade-in">
            <ReportBoard />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-[3px] border-black dark:border-white bg-white dark:bg-slate-900 py-6 px-4 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#FFE600] border border-black flex items-center justify-center text-xs">
              🪨
            </span>
            <span>암석 분류 시뮬레이션 — 고등학교 지구과학 I 인터랙티브 교구</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Vercel Seoul (icn1)</span>
            <span>•</span>
            <span>Supabase PostgreSQL</span>
            <span>•</span>
            <span>Neumorphism + Claymorphism + Neo-Brutalism</span>
          </div>
        </div>
      </footer>

      {/* Rock Detail Modal */}
      <RockModal rock={selectedRock} onClose={() => setSelectedRock(null)} />

      {/* Quiz & Leaderboard Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
