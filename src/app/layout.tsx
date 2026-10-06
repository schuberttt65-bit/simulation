import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '암석 분류 시뮬레이션 | 고등학교 지구과학 I 가상 실험실',
  description: '9가지 대표 암석(화성암, 퇴적암, 변성암)의 사진과 공통점을 탐구하고, 묽은 염산 반응 가상 실험 및 인터랙티브 묶음 분류를 수행하는 교육용 웹 시뮬레이터',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
