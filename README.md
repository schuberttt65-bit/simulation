# 🪨 암석 분류 시뮬레이션 (Rock Classification Simulator)

> **고등학교 지구과학 I 교육용 인터랙티브 가상 교구 & 시뮬레이터**  
> 뉴모피즘(Neumorphism) × 클레이모피즘(Claymorphism) × 네오 브루탈리즘(Neo-Brutalism) 융합 UI

---

## 🌟 프로젝트 개요
본 프로젝트는 고등학교 지구과학 I 교육과정에 수록된 **9가지 대표 암석**을 학생 스스로 관찰하고, 공통점과 차이점에 따라 체계적으로 분류하며, 가상 묽은 염산(HCl) 반응 실험을 통해 암석의 성질을 체험할 수 있도록 개발된 풀스택 웹 애플리케이션입니다.

### 🎯 핵심 기능
1. **9가지 암석 표본 도감**:
   - **화성암**: 현무암 (화산암/염기성), 화강암 (심성암/산성), 반려암 (심성암/염기성), 유문암 (화산암/산성)
   - **퇴적암**: 사암 (쇄설성/모래), 셰일 (쇄설성/진흙), 석회암 (화학·생물학적/탄산칼슘)
   - **변성암**: 편마암 (광역변성/편마구조), 대리암 (열·압력변성/재결정화)
2. **공통점에 따른 묶음 분류 시뮬레이터**:
   - 생성 원인별 분류 (화성암 vs 퇴적암 vs 변성암)
   - 알갱이(결정) 크기별 분류 (조립질 vs 세립질)
   - 색상 및 SiO₂ 조성별 분류 (밝은색/산성 계열 vs 어두운색/염기성 계열)
   - 묽은 염산(HCl) 화학 반응별 분류 (반응함 vs 반응안함)
   - 실시간 채점, 정확도 피드백 및 정답 축하 콘페티 애니메이션
3. **가상 염산 반응 실험실 (Virtual HCl Lab)**:
   - 스포이트를 클릭하여 암석 시료에 묽은 염산을 적하하는 인터랙티브 실험
   - 탄산칼슘($\text{CaCO}_3$) 암석(석회암, 대리암) 적하 시 실시간 $\text{CO}_2$ 기포 발생 애니메이션 및 효과음 재생
4. **학생 탐구 보고서 게시판 (Supabase `posts` 테이블 연동)**:
   - 학생들의 관찰 결과 및 탐구 보고서 작성/공유, 좋아요 기능
5. **스피드 퀴즈 & 명예의 전당 (Supabase `rankings` 테이블 연동)**:
   - 5문항의 지구과학 1 실전 암석 퀴즈 및 Top 10 실시간 랭킹 시스템

---

## 🛠️ 기술 스택 및 아키텍처
- **Framework**: Next.js 14 (App Router)
- **UI Styling**: Tailwind CSS, Neumorphism + Claymorphism + Neo-Brutalism
- **Icons & Effects**: Lucide React, Canvas-Confetti
- **Database**: Supabase PostgreSQL (Row Level Security 활성화)
- **Deployment**: Vercel Seoul (`icn1` 한국 리전 강제 설정)

---

## ⚡ 리전 최적화 (Seoul icn1 & ap-northeast-2)
`vercel.json`을 통해 Vercel Edge/Serverless 리전을 서울(`icn1`)로 강제하고, Supabase 데이터베이스 인스턴스를 서울(`ap-northeast-2`)에 배치하여 지연시간(RTT)을 극단적으로 단축하였습니다.
