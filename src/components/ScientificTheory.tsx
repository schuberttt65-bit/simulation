'use client';

import React from 'react';
import { BookOpen, Compass, Layers, Zap, CheckCircle2 } from 'lucide-react';

export const ScientificTheory: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Overview Intro */}
      <div className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-6 shadow-neo">
        <div className="flex items-center gap-3 mb-3">
          <span className="p-2.5 bg-[#70E000] rounded-2xl border-2 border-black text-black">
            <BookOpen className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              고등학교 지구과학 I : 암석의 분류 기준 상세 해설
            </h2>
            <p className="text-xs text-slate-500 font-bold">
              2015/2022 개정 교육과정 연계 심층 탐구 가이드
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          지각을 구성하는 암석은 생성 원인, 광물 조성, 조직(결정 크기 및 배열)에 따라 체계적으로 분류됩니다. 아래 분류 체계표와 원리를 통해 9가지 암석이 어떻게 나뉘는지 확인해 보세요.
        </p>
      </div>

      {/* 1. Igneous Rocks Classification Matrix */}
      <div className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-6 shadow-neo space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FF6B6B] text-white border-2 border-black">
            화성암 심화 분류
          </span>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            화산암 vs 심성암 & SiO₂ 함량에 따른 화성암 분류표
          </h3>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300">
          마그마가 식은 장소(냉각 속도)에 따른 조직 차이와, 마그마의 화학 조성(SiO₂ 백분율)에 따른 색상 차이로 분류합니다.
        </p>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse border-2 border-black">
            <thead>
              <tr className="bg-[#FFE600] text-black">
                <th className="border-2 border-black p-2.5 font-black text-center">구분</th>
                <th className="border-2 border-black p-2.5 font-black text-center bg-rose-200">
                  염기성암 (SiO₂ &lt; 52%)<br/><span className="text-[10px] font-normal">어두운색, Fe·Mg 풍부</span>
                </th>
                <th className="border-2 border-black p-2.5 font-black text-center bg-amber-200">
                  중성암 (52 ~ 63%)<br/><span className="text-[10px] font-normal">중간색</span>
                </th>
                <th className="border-2 border-black p-2.5 font-black text-center bg-blue-200">
                  산성암 (SiO₂ &gt; 63%)<br/><span className="text-[10px] font-normal">밝은색, Si·Al 풍부</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-center font-bold">
              <tr className="bg-slate-50 dark:bg-slate-800">
                <td className="border-2 border-black p-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-black">
                  화산암<br/>
                  <span className="text-[10px] font-normal text-slate-600 dark:text-slate-300">
                    지표 급랭 / 세립질
                  </span>
                </td>
                <td className="border-2 border-black p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200">
                  <span className="font-black text-sm block">현무암</span>
                  <span className="text-[10px] text-slate-500">기공 발달, 흑회색</span>
                </td>
                <td className="border-2 border-black p-3 text-slate-600 dark:text-slate-300">
                  안산암
                </td>
                <td className="border-2 border-black p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200">
                  <span className="font-black text-sm block">유문암</span>
                  <span className="text-[10px] text-slate-500">유문 구조, 담홍색</span>
                </td>
              </tr>
              <tr className="bg-white dark:bg-slate-900">
                <td className="border-2 border-black p-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-black">
                  심성암<br/>
                  <span className="text-[10px] font-normal text-slate-600 dark:text-slate-300">
                    지하 심부 완랭 / 조립질
                  </span>
                </td>
                <td className="border-2 border-black p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200">
                  <span className="font-black text-sm block">반려암</span>
                  <span className="text-[10px] text-slate-500">조립질 휘석·사장석</span>
                </td>
                <td className="border-2 border-black p-3 text-slate-600 dark:text-slate-300">
                  섬록암
                </td>
                <td className="border-2 border-black p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200">
                  <span className="font-black text-sm block">화강암</span>
                  <span className="text-[10px] text-slate-500">조립질 석영·장석·흑운모</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Sedimentary & Metamorphic Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sedimentary */}
        <div className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-5 shadow-neo space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#4ECDC4] text-slate-900 border-2 border-black">
              퇴적암
            </span>
            <h4 className="font-black text-base text-slate-900 dark:text-white">
              퇴적물의 기원과 속성작용
            </h4>
          </div>
          <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 font-medium">
            <li className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white block font-black">1) 쇄설성 퇴적암 (사암, 셰일)</strong>
              풍화 침식된 모래(사암), 미세 진흙(셰일)이 물속에 가라앉은 뒤 상부 하중에 의해 다져지고(다짐작용), 녹아있던 교결물질이 알갱이를 붙여(교결작용) 형성됩니다.
            </li>
            <li className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white block font-black">2) 화학적·생물학적 퇴적암 (석회암)</strong>
              산호나 유공충 등 탄산칼슘 껍질을 지닌 해양 생물이 대량 퇴적되거나 해수 중 CaCO₃ 성분이 화학 침전되어 만들어집니다.
            </li>
          </ul>
        </div>

        {/* Metamorphic */}
        <div className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-5 shadow-neo space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#FFE66D] text-slate-900 border-2 border-black">
              변성암
            </span>
            <h4 className="font-black text-base text-slate-900 dark:text-white">
              재결정 작용과 엽리(편마구조)
            </h4>
          </div>
          <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 font-medium">
            <li className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white block font-black">1) 편마암 (광역변성작용)</strong>
              조산운동에 의한 막대한 측압과 고온으로 인해 광물이 녹지 않고 재배열되면서 밝은 띠와 어두운 띠가 번갈아 나타나는 편마구조를 형성합니다.
            </li>
            <li className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white block font-black">2) 대리암 (열·접촉/광역변성)</strong>
              석회암이 높은 열과 압력을 받아 미세한 방해석이 굵은 결정으로 다시 성장(재결정화)하여 설탕 결정 같은 아름다운 등립상 조직을 이룹니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
