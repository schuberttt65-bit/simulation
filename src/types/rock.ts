export type RockCategory = '화성암' | '퇴적암' | '변성암';

export interface RockItem {
  id: string;
  name: string;
  hanja: string;
  english: string;
  category: RockCategory;
  subCategory: string; // 화산암, 심성암, 쇄설성, 화학적, 광역변성 등
  grainSize: '조립질' | '세립질' | '유리질' | '혼합질';
  colorTone: '밝은색' | '중간색' | '어두운색';
  silicaContent: string; // SiO2 함량 (산성암, 중성암, 염기성암)
  hasAcidReaction: boolean; // 염산 반응 여부
  hasFoliation: boolean; // 엽리(줄무늬) 여부
  hasBedding: boolean; // 층리 여부
  hasPores: boolean; // 기공 여부
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
  formationProcess: string;
  mainMinerals: string[];
  keyFeatures: string[];
  usage: string;
}

export interface ClassificationGroup {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  criteriaKey: string;
  color: string;
  expectedRockIds: string[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  likes: number;
}

export interface Ranking {
  id: string;
  nickname: string;
  score: number;
  played_at: string;
}
