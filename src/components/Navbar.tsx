'use client';

import React from 'react';
import { Sparkles, Moon, Sun, Database, Server, Award, BookOpen, Layers, FlaskConical } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleDark: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  toggleDark,
  activeTab,
  setActiveTab,
  onOpenQuiz
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF5]/90 dark:bg-[#0F111A]/90 backdrop-blur-md border-b-[3px] border-black dark:border-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FFE600] rounded-2xl border-[3px] border-black flex items-center justify-center shadow-neo font-black text-2xl text-black select-none">
            🪨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                암석 분류 시뮬레이션
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-[#FF70A6] text-black border-2 border-black shadow-neo-sm">
                고교 지구과학 I
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Seoul (icn1) 연동
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Database className="w-3 h-3" /> Supabase RLS
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('classify')}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm border-2 border-black transition-all flex items-center gap-1.5 ${
              activeTab === 'classify'
                ? 'bg-[#FFE600] text-black shadow-neo'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" /> 인터랙티브 분류
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm border-2 border-black transition-all flex items-center gap-1.5 ${
              activeTab === 'lab'
                ? 'bg-[#48CAE4] text-black shadow-neo'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-4 h-4" /> 염산 반응 실험실
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm border-2 border-black transition-all flex items-center gap-1.5 ${
              activeTab === 'theory'
                ? 'bg-[#70E000] text-black shadow-neo'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 분류 기준 해설
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm border-2 border-black transition-all flex items-center gap-1.5 ${
              activeTab === 'reports'
                ? 'bg-[#FF9770] text-black shadow-neo'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" /> 탐구 보고서
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQuiz}
            className="neo-button px-3.5 py-2 bg-[#A06CD5] text-white hover:bg-[#8e52cb] flex items-center gap-1.5 text-sm font-black"
          >
            <Award className="w-4 h-4" /> 퀴즈 랭킹
          </button>

          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="neo-button p-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
