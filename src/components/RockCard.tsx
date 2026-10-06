'use client';

import React from 'react';
import { RockItem } from '@/types/rock';
import { Sparkles, ZoomIn, FlaskConical, Layers, Eye } from 'lucide-react';

interface RockCardProps {
  rock: RockItem;
  onSelect: (rock: RockItem) => void;
  isCompact?: boolean;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent, rock: RockItem) => void;
}

export const RockCard: React.FC<RockCardProps> = ({
  rock,
  onSelect,
  isCompact = false,
  isDraggable = false,
  onDragStart
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case '화성암':
        return 'bg-[#FF6B6B] text-white';
      case '퇴적암':
        return 'bg-[#4ECDC4] text-slate-900';
      case '변성암':
        return 'bg-[#FFE66D] text-slate-900';
      default:
        return 'bg-slate-200 text-slate-800';
    }
  };

  if (isCompact) {
    return (
      <div
        draggable={isDraggable}
        onDragStart={(e) => onDragStart && onDragStart(e, rock)}
        onClick={() => onSelect(rock)}
        className="cursor-pointer group select-none bg-white dark:bg-slate-800 border-[3px] border-black dark:border-white rounded-2xl p-2.5 shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-black relative flex-shrink-0">
          <img
            src={rock.imageUrl}
            alt={rock.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {rock.hasAcidReaction && (
            <span className="absolute top-0 right-0 bg-[#FF70A6] text-black text-[9px] font-black px-1 rounded-bl">
              HCl
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-slate-900 dark:text-white truncate text-sm">
              {rock.name}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">({rock.english})</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded border border-black ${getCategoryColor(rock.category)}`}>
              {rock.category}
            </span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              {rock.grainSize}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => onDragStart && onDragStart(e, rock)}
      className="group relative bg-white dark:bg-slate-800 border-[3px] border-black dark:border-white rounded-3xl overflow-hidden shadow-neo-lg hover:shadow-neo-xl hover:-translate-y-1.5 transition-all duration-200 flex flex-col"
    >
      {/* Card Header & Image */}
      <div className="relative h-48 w-full overflow-hidden border-b-[3px] border-black dark:border-white bg-slate-100 dark:bg-slate-900">
        <img
          src={rock.imageUrl}
          alt={rock.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`px-2.5 py-1 text-xs font-black rounded-xl border-2 border-black shadow-neo-sm ${getCategoryColor(rock.category)}`}>
            {rock.category}
          </span>
          <span className="px-2 py-1 text-xs font-bold rounded-xl border-2 border-black shadow-neo-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            {rock.subCategory}
          </span>
        </div>

        {/* Special Reaction Indicator */}
        {rock.hasAcidReaction && (
          <div className="absolute top-3 right-3 bg-[#FF70A6] text-black font-black text-xs px-2 py-1 rounded-xl border-2 border-black shadow-neo-sm flex items-center gap-1 animate-bounce">
            <FlaskConical className="w-3.5 h-3.5" /> 염산반응 O
          </div>
        )}

        {/* Magnifying Overlay */}
        <button
          onClick={() => onSelect(rock)}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-black p-2 rounded-xl border-2 border-black shadow-neo-sm opacity-90 hover:opacity-100 transition-all flex items-center gap-1 text-xs font-black"
        >
          <ZoomIn className="w-4 h-4" /> 돋보기 관찰
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {rock.name} <span className="text-sm font-semibold text-slate-500">({rock.hanja})</span>
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
              {rock.english}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
            {rock.description}
          </p>

          {/* Quick Properties Tags */}
          <div className="grid grid-cols-2 gap-1.5 text-xs mb-3">
            <div className="bg-slate-50 dark:bg-slate-700/60 p-1.5 rounded-lg border border-slate-300 dark:border-slate-600">
              <span className="text-slate-400 block text-[10px]">알갱이 크기</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{rock.grainSize}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/60 p-1.5 rounded-lg border border-slate-300 dark:border-slate-600">
              <span className="text-slate-400 block text-[10px]">색상 계열</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{rock.colorTone}</span>
            </div>
          </div>
        </div>

        {/* Card Footer Button */}
        <button
          onClick={() => onSelect(rock)}
          className="w-full neo-button py-2 bg-[#FFE600] text-black hover:bg-[#ebd300] font-black text-sm flex items-center justify-center gap-1.5 mt-2"
        >
          <Eye className="w-4 h-4" /> 상세 정보 및 광물 보기
        </button>
      </div>
    </div>
  );
};
