import { createClient } from '@supabase/supabase-js';
import { Post, Ranking } from '@/types/rock';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial Mock Data for graceful fallback
export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '제주도 송악산 현무암과 주상절리 관찰 보고서',
    content: '현무암의 다공질 구조를 루페로 관찰해 보았습니다. 용암이 분출되면서 가스가 빠져나간 구멍들이 불규칙하게 배열되어 있었고, 염산 반응은 전혀 없었습니다.',
    author: '지구과학탐구반_민지',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    likes: 12
  },
  {
    id: '2',
    title: '석회암과 대리암의 묽은 염산 반응 비교 실험',
    content: '화학적 퇴적암인 석회암과 변성암인 대리암 모두에 묽은 염산을 한 방울 떨어뜨렸더니 즉시 치이익 소리와 함께 이산화탄소 기포가 활발하게 생성되었습니다!',
    author: '사이언스_준호',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    likes: 19
  },
  {
    id: '3',
    title: '편마암의 호상 편마구조와 변성도 분석',
    content: '고온·고압 환경에서 광물들이 분리되어 흑백의 줄무늬를 이루는 편마암을 현미경으로 관찰했습니다. 조립질 석영과 장석 입자가 선명합니다.',
    author: '고2_지구별사랑',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    likes: 8
  }
];

export const INITIAL_RANKINGS: Ranking[] = [
  { id: '1', nickname: '지학만점러', score: 100, played_at: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: '2', nickname: '암석박사', score: 95, played_at: new Date(Date.now() - 3600000 * 18).toISOString() },
  { id: '3', nickname: '현무암장인', score: 90, played_at: new Date(Date.now() - 3600000 * 22).toISOString() },
  { id: '4', nickname: '지구지킴이', score: 85, played_at: new Date(Date.now() - 3600000 * 30).toISOString() },
  { id: '5', nickname: '탐구대장', score: 80, played_at: new Date(Date.now() - 3600000 * 48).toISOString() }
];

export async function fetchPosts(): Promise<Post[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local:', e);
    }
  }
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('rock_posts');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
  }
  return INITIAL_POSTS;
}

export async function createPost(post: { title: string; content: string; author: string }): Promise<Post> {
  const newPost: Post = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    ...post,
    created_at: new Date().toISOString(),
    likes: 0
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('posts').insert([newPost]).select();
      if (!error && data && data[0]) return data[0];
    } catch (e) {
      console.warn('Supabase insert failed, saving locally:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const current = await fetchPosts();
    const updated = [newPost, ...current];
    localStorage.setItem('rock_posts', JSON.stringify(updated));
  }
  return newPost;
}

export async function likePost(id: string): Promise<void> {
  if (supabase) {
    try {
      await supabase.rpc('increment_likes', { post_id: id });
    } catch (e) {}
  }
  if (typeof window !== 'undefined') {
    const current = await fetchPosts();
    const updated = current.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    localStorage.setItem('rock_posts', JSON.stringify(updated));
  }
}

export async function fetchRankings(): Promise<Ranking[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('rankings')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase fetch rankings failed:', e);
    }
  }
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('rock_rankings');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
  }
  return INITIAL_RANKINGS;
}

export async function submitRanking(nickname: string, score: number): Promise<Ranking> {
  const newRank: Ranking = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    nickname,
    score,
    played_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('rankings').insert([newRank]).select();
      if (!error && data && data[0]) return data[0];
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    const current = await fetchRankings();
    const updated = [...current, newRank].sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem('rock_rankings', JSON.stringify(updated));
  }
  return newRank;
}
