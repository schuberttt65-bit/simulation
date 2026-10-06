'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '@/types/rock';
import { fetchPosts, createPost, likePost, isSupabaseConfigured } from '@/lib/supabase';
import { PlusCircle, Heart, User, Clock, Sparkles, Check, Database } from 'lucide-react';

export const ReportBoard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleLike = async (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
    await likePost(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;

    setSubmitting(true);
    const newPost = await createPost({ title, content, author });
    setPosts([newPost, ...posts]);
    setTitle('');
    setAuthor('');
    setContent('');
    setIsModalOpen(false);
    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-6 shadow-neo flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#FF9770] text-black border-2 border-black">
              학생 커뮤니티
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              암석 관찰 & 탐구 보고서 게시판
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-2">
            직접 관찰한 암석의 특징과 가상 실험 결과를 동료 학생들과 자유롭게 공유해 보세요!
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
              <Database className="w-3 h-3" />
              {isSupabaseConfigured ? 'Supabase 서울(icn1) DB 연동됨' : '로컬 스토리지 동기화 모드'}
            </span>
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="neo-button px-4 py-2.5 bg-[#FFE600] text-black hover:bg-[#ebd300] font-black text-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> 탐구 보고서 등록
        </button>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="text-center py-12 text-sm font-bold text-slate-500">
          탐구 보고서를 불러오는 중입니다...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 border-[3px] border-black rounded-3xl shadow-neo">
          <p className="font-black text-slate-700 dark:text-slate-300 text-sm">
            등록된 탐구 보고서가 없습니다. 첫 보고서를 남겨보세요!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl p-5 shadow-neo hover:shadow-neo-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                    <User className="w-3.5 h-3.5 text-slate-500" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>

                <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                  {post.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black bg-rose-50 text-rose-600 hover:bg-rose-100 shadow-neo-sm active:translate-y-0.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  좋아요 {post.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white rounded-3xl shadow-neo-xl overflow-hidden p-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
              📝 새 암석 탐구 보고서 작성
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  작성자 (이름 / 별명)
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="예: 지구과학동아리_지우"
                  className="w-full p-2.5 rounded-xl border-2 border-black dark:border-white bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  보고서 제목
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 편마암의 줄무늬와 석회암 염산 반응 관찰"
                  className="w-full p-2.5 rounded-xl border-2 border-black dark:border-white bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  탐구 내용 및 결론
                </label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="관찰한 암석의 조직, 특징, 가상 실험 결과 및 알게 된 점을 작성하세요..."
                  className="w-full p-2.5 rounded-xl border-2 border-black dark:border-white bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="neo-button px-4 py-2 bg-slate-200 text-slate-800 text-sm font-black"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="neo-button px-5 py-2 bg-[#FFE600] text-black text-sm font-black hover:bg-[#ebd300]"
                >
                  {submitting ? '저장 중...' : '보고서 등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
