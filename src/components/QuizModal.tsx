'use client';

import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '@/data/rocks';
import { fetchRankings, submitRanking, isSupabaseConfigured } from '@/lib/supabase';
import { Ranking } from '@/types/rock';
import confetti from 'canvas-confetti';
import { X, Award, CheckCircle, AlertCircle, RotateCcw, Trophy, Database } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isRankSubmitted, setIsRankSubmitted] = useState(false);
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [activeTab, setActiveTab] = useState<'quiz' | 'leaderboard'>('quiz');

  useEffect(() => {
    if (isOpen) {
      loadRankings();
    }
  }, [isOpen]);

  const loadRankings = async () => {
    const data = await fetchRankings();
    setRankings(data);
  };

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(opt);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQ.correctAnswer) {
      setScore((prev) => prev + 20); // 5 questions * 20 = 100 max
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizFinished(false);
    setIsRankSubmitted(false);
    setActiveTab('quiz');
  };

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    await submitRanking(nickname, score);
    setIsRankSubmitted(true);
    await loadRankings();
    setActiveTab('leaderboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl shadow-neo-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#A06CD5] text-white border-b-[3px] border-black dark:border-white">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <div>
              <h2 className="text-xl font-black">암석 분류 스피드 퀴즈 & 랭킹</h2>
              <span className="text-xs font-bold text-purple-200">
                고등학교 지구과학 1 실전 테스트
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border-2 border-black bg-white text-black hover:bg-slate-100 shadow-neo-sm font-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-black dark:border-white bg-slate-100 dark:bg-slate-800">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-2.5 font-black text-xs sm:text-sm text-center transition-colors ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-slate-900 text-black dark:text-white border-b-2 border-purple-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            🎮 퀴즈 풀기 ({currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2.5 font-black text-xs sm:text-sm text-center transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-white dark:bg-slate-900 text-black dark:text-white border-b-2 border-purple-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            🏆 명예의 전당 (Top 10 랭킹)
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'quiz' ? (
            !isQuizFinished ? (
              <div className="space-y-5">
                {/* Score & Progress */}
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                    문제 {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-amber-600 dark:text-amber-400">
                    현재 점수: {score}점
                  </span>
                </div>

                {/* Question Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white shadow-neo-sm">
                  <h3 className="font-black text-base text-slate-900 dark:text-white leading-relaxed">
                    Q{currentQ.id}. {currentQ.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === currentQ.correctAnswer;
                    let style = 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        style = 'bg-emerald-100 text-emerald-950 border-emerald-600 font-black';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-100 text-rose-950 border-rose-600 font-black';
                      }
                    } else if (isSelected) {
                      style = 'bg-[#FFE600] text-black font-black shadow-neo-sm';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-3 rounded-2xl border-2 border-black dark:border-white text-left font-bold text-sm transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{i + 1}. {opt}</span>
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <AlertCircle className="w-5 h-5 text-rose-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on submit */}
                {isAnswerSubmitted && (
                  <div className="p-3.5 rounded-2xl bg-[#FFF9EB] dark:bg-slate-800 border-2 border-black text-xs text-slate-800 dark:text-slate-200">
                    <span className="font-black block text-amber-900 dark:text-amber-300 mb-1">
                      💡 정답 해설:
                    </span>
                    {currentQ.explanation}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end pt-2">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleConfirmAnswer}
                      disabled={!selectedAnswer}
                      className="neo-button px-6 py-2.5 bg-[#FFE600] text-black font-black text-sm disabled:opacity-50"
                    >
                      정답 제출
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="neo-button px-6 py-2.5 bg-purple-600 text-white font-black text-sm hover:bg-purple-700"
                    >
                      {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? '다음 문제 →' : '결과 확인하기 🎉'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Finished Summary */
              <div className="text-center py-6 space-y-5">
                <div className="w-20 h-20 bg-yellow-100 rounded-full border-[3px] border-black mx-auto flex items-center justify-center text-4xl shadow-neo">
                  🏆
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    퀴즈 완료! 최종 점수: {score}점
                  </h3>
                  <p className="text-xs text-slate-500 font-bold mt-1">
                    {score === 100
                      ? '축하합니다! 지구과학 암석 마스터 등극!'
                      : '수고하셨습니다! 다시 도전하여 만점에 도전해 보세요.'}
                  </p>
                </div>

                {!isRankSubmitted ? (
                  <form onSubmit={handleSubmitScore} className="max-w-xs mx-auto space-y-3 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="랭킹에 등록할 닉네임"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full p-2.5 rounded-xl border-2 border-black bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white font-bold text-sm text-center outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full neo-button py-2.5 bg-[#70E000] text-black font-black text-sm hover:bg-[#62c400]"
                    >
                      명예의 전당(랭킹)에 등록하기
                    </button>
                  </form>
                ) : (
                  <div className="text-xs font-bold text-emerald-600">
                    ✅ 랭킹에 성공적으로 등록되었습니다!
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleRestartQuiz}
                    className="neo-button px-5 py-2 bg-slate-200 text-slate-800 font-black text-xs flex items-center gap-1 mx-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> 퀴즈 다시 풀기
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Leaderboard Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>순위 및 도전자</span>
                <span>점수 (일시)</span>
              </div>

              <div className="space-y-2">
                {rankings.map((r, i) => (
                  <div
                    key={r.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border-2 border-black dark:border-white ${
                      i === 0
                        ? 'bg-[#FFE600] text-black font-black shadow-neo-sm'
                        : i === 1
                        ? 'bg-slate-200 text-black font-black'
                        : i === 2
                        ? 'bg-amber-100 text-black font-black'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-black text-sm">
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
                      </span>
                      <span className="font-bold text-sm">{r.nickname}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm">{r.score}점</span>
                      <span className="block text-[10px] text-slate-500">
                        {new Date(r.played_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
