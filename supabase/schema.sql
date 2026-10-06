-- 1. Create posts table (게시물 테이블)
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  author text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  likes integer default 0 not null
);

-- 2. Create rankings table (점수 랭킹 테이블)
create table if not exists public.rankings (
  id uuid default gen_random_uuid() primary key,
  nickname text not null,
  score integer not null,
  played_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.posts enable row level security;
alter table public.rankings enable row level security;

-- 4. Set RLS Policies for public access (Anon read & insert)
drop policy if exists "Allow public read posts" on public.posts;
create policy "Allow public read posts" on public.posts for select using (true);

drop policy if exists "Allow public insert posts" on public.posts;
create policy "Allow public insert posts" on public.posts for insert with check (true);

drop policy if exists "Allow public update likes on posts" on public.posts;
create policy "Allow public update likes on posts" on public.posts for update using (true);

drop policy if exists "Allow public read rankings" on public.rankings;
create policy "Allow public read rankings" on public.rankings for select using (true);

drop policy if exists "Allow public insert rankings" on public.rankings;
create policy "Allow public insert rankings" on public.rankings for insert with check (true);

-- 5. Seed initial data
insert into public.posts (title, content, author, created_at, likes) values
('제주도 송악산 현무암과 주상절리 관찰 보고서', '현무암의 다공질 구조를 루페로 관찰해 보았습니다. 용암이 분출되면서 가스가 빠져나간 구멍들이 불규칙하게 배열되어 있었고, 염산 반응은 전혀 없었습니다.', '지구과학탐구반_민지', now() - interval '1 day', 12),
('석회암과 대리암의 묽은 염산 반응 비교 실험', '화학적 퇴적암인 석회암과 변성암인 대리암 모두에 묽은 염산을 한 방울 떨어뜨렸더니 즉시 치이익 소리와 함께 이산화탄소 기포가 활발하게 생성되었습니다!', '사이언스_준호', now() - interval '12 hours', 19),
('편마암의 호상 편마구조와 변성도 분석', '고온·고압 환경에서 광물들이 분리되어 흑백의 줄무늬를 이루는 편마암을 현미경으로 관찰했습니다. 조립질 석영과 장석 입자가 선명합니다.', '고2_지구별사랑', now() - interval '4 hours', 8);

insert into public.rankings (nickname, score, played_at) values
('지학만점러', 100, now() - interval '5 hours'),
('암석박사', 95, now() - interval '18 hours'),
('현무암장인', 90, now() - interval '22 hours'),
('지구지킴이', 85, now() - interval '30 hours'),
('탐구대장', 80, now() - interval '48 hours');
