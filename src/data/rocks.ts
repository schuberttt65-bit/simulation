import { RockItem, ClassificationGroup } from '@/types/rock';

export const ROCKS: RockItem[] = [
  {
    id: 'basalt',
    name: '현무암',
    hanja: '玄武岩',
    english: 'Basalt',
    category: '화성암',
    subCategory: '화산암 (분출암)',
    grainSize: '세립질',
    colorTone: '어두운색',
    silicaContent: '염기성암 (SiO₂ < 52%)',
    hasAcidReaction: false,
    hasFoliation: false,
    hasBedding: false,
    hasPores: true,
    imageUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=400&q=80',
    description: '마그마가 지표 부근으로 빠르게 분출하여 급격히 식어 굳어진 어두운 색의 대표적인 화산암입니다.',
    formationProcess: '지표로 분출된 현무암질 용암이 빠르게 냉각되면서 광물 결정이 크게 자라지 못해 세립질이나 유리질 조직을 띱니다. 용암 내부의 가스가 빠져나가면서 생긴 기공이 특징입니다.',
    mainMinerals: ['감람석', '휘석', '칼슘 사장석'],
    keyFeatures: ['어두운 흑회색', '미세한 결정(세립질)', '다공질 기공 구조', '제주도 돌하르방/주상절리'],
    usage: '건축 외장재, 도로 포장재, 조각품, 맷돌'
  },
  {
    id: 'granite',
    name: '화강암',
    hanja: '花崗岩',
    english: 'Granite',
    category: '화성암',
    subCategory: '심성암 (관입암)',
    grainSize: '조립질',
    colorTone: '밝은색',
    silicaContent: '산성암 (SiO₂ > 63%)',
    hasAcidReaction: false,
    hasFoliation: false,
    hasBedding: false,
    hasPores: false,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=400&q=80',
    description: '마그마가 지하 깊은 곳에서 서서히 식어 광물 결정이 크게 자란 밝은 색의 대표적인 심성암입니다.',
    formationProcess: '지하 수 km 아래에서 유문암질 마그마가 수천만 년에 걸쳐 서서히 냉각되면서 석영, 장석, 흑운모 등의 광물 결정이 육안으로 선명히 보일 만큼 크게 성장(조립질)했습니다.',
    mainMinerals: ['석영 (투명/유백색)', '정장석/사석 (담홍색/백색)', '흑운모 (검은색)'],
    keyFeatures: ['밝은 회색 및 담홍색 바탕', '육안으로 뚜렷한 조립질 결정', '높은 강도와 단단함', '북한산/설악산 등 거대한 암체 형성'],
    usage: '고급 건축재, 묘비, 석조 조형물, 주방 상판'
  },
  {
    id: 'gabbro',
    name: '반려암',
    hanja: '斑糲岩',
    english: 'Gabbro',
    category: '화성암',
    subCategory: '심성암 (관입암)',
    grainSize: '조립질',
    colorTone: '어두운색',
    silicaContent: '염기성암 (SiO₂ < 52%)',
    hasAcidReaction: false,
    hasFoliation: false,
    hasBedding: false,
    hasPores: false,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
    description: '염기성 마그마가 지하 깊은 곳에서 서서히 식어 굳어진 검은빛의 조립질 심성암입니다.',
    formationProcess: '해양 지각 하부나 대륙 심부에서 현무암질/염기성 마그마가 천천히 냉각되어 휘석과 사장석이 크게 결정을 이루었습니다. 화강암과 결정 크기는 비슷하지만 색이 훨씬 어둡습니다.',
    mainMinerals: ['휘석', '칼슘 사장석', '감람석', '자철석'],
    keyFeatures: ['암녹색~흑색의 짙은 어두운 톤', '균일한 조립질 조직', '높은 밀도와 무거운 비중'],
    usage: '건축용 쇄석, 묘석, 정밀 측정 정반, 인조 대리석 원료'
  },
  {
    id: 'rhyolite',
    name: '유문암',
    hanja: '流紋岩',
    english: 'Rhyolite',
    category: '화성암',
    subCategory: '화산암 (분출암)',
    grainSize: '세립질',
    colorTone: '밝은색',
    silicaContent: '산성암 (SiO₂ > 63%)',
    hasAcidReaction: false,
    hasFoliation: false,
    hasBedding: false,
    hasPores: false,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    description: '점성이 높은 산성 마그마가 지표로 흘러나와 급랭하며 흐른 자국(유문)을 남긴 밝은 화산암입니다.',
    formationProcess: '이산화규소(SiO₂) 함량이 높은 마그마는 점성이 매우 강해 지표로 분출 시 폭발적으로 분출하거나 끈적하게 흐르며, 급랭하여 미세한 결정을 형성합니다.',
    mainMinerals: ['석영', '알칼리 장석', '흑운모/각섬석'],
    keyFeatures: ['밝은 회색, 분홍색 또는 담갈색', '용암이 흐른 방향을 따른 미세한 띠(유문 구조)', '치밀하고 단단한 세립질 조직'],
    usage: '골재, 연마재, 도자기 원료'
  },
  {
    id: 'sandstone',
    name: '사암',
    hanja: '砂岩',
    english: 'Sandstone',
    category: '퇴적암',
    subCategory: '쇄설성 퇴적암',
    grainSize: '조립질',
    colorTone: '중간색',
    silicaContent: '퇴적 기원 (모래 입자 1/16~2mm)',
    hasAcidReaction: false,
    hasFoliation: false,
    hasBedding: true,
    hasPores: false,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
    description: '모래 크기(0.063~2mm)의 알갱이들이 수중에 퇴적된 후 굳어져 만들어진 전형적인 쇄설성 퇴적암입니다.',
    formationProcess: '강이나 해안가에서 모래가 운반되어 겹겹이 쌓인 후, 규산이나 산화철 등의 교결물질에 의해 입자들이 서로 단단히 엉겨 붙는 속성작용(다짐+교결)을 거쳐 생성됩니다.',
    mainMinerals: ['석영 입자 (주성분)', '장석 파편', '점토 광물 및 산화철'],
    keyFeatures: ['손으로 만졌을 때 거친 사포 같은 감촉', '퇴적 당시 쌓인 평행한 줄무늬(층리)', '황갈색, 붉은색, 회백색 등 다양한 색상'],
    usage: '건축 석재, 숫돌, 유리 제조 원료, 장식 조각재'
  },
  {
    id: 'shale',
    name: '셰일',
    hanja: '頁岩',
    english: 'Shale',
    category: '퇴적암',
    subCategory: '쇄설성 퇴적암',
    grainSize: '세립질',
    colorTone: '어두운색',
    silicaContent: '퇴적 기원 (진흙/점토 입자 < 1/256mm)',
    hasAcidReaction: false,
    hasFoliation: false,
    hasBedding: true,
    hasPores: false,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    description: '잔잔한 호수나 깊은 바다 밑바닥에 미세한 진흙과 실트가 쌓여 굳어진 얇은 판 모양의 퇴적암입니다.',
    formationProcess: '유속이 거의 없는 수역에서 가라앉은 초미세 점토 입자들이 상부 하중의 압력을 받아 납작하게 압축되면서 박판상으로 쉽게 쪼개지는 박리성(Fissility)을 갖추게 됩니다.',
    mainMinerals: ['점토 광물(카올리나이트, 일라이트)', '미립 석영', '유기물'],
    keyFeatures: ['손톱으로 긁힐 정도로 무름', '얇은 책장처럼 결을 따라 잘 쪼개짐', '화석(삼엽충, 식물 등)이 빈번하게 보존됨'],
    usage: '벽돌 및 기와 원료, 시멘트 부원료, 셰일가스/오일 저장소'
  },
  {
    id: 'limestone',
    name: '석회암',
    hanja: '石灰岩',
    english: 'Limestone',
    category: '퇴적암',
    subCategory: '화학적/생물학적 퇴적암',
    grainSize: '세립질',
    colorTone: '밝은색',
    silicaContent: '탄산염암 (주성분 CaCO₃)',
    hasAcidReaction: true,
    hasFoliation: false,
    hasBedding: true,
    hasPores: false,
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80',
    description: '산호, 조개껍데기 등 해양 생물의 유해나 수중 탄산칼슘의 화학적 침전으로 형성된 퇴적암입니다.',
    formationProcess: '따뜻하고 얕은 바다에서 서식하던 탄산칼슘 성분의 껍질을 가진 생물들이 퇴적되거나, 바닷물 속 칼슘 이온과 탄산 이온이 결합하여 침전되면서 두터운 석회암층을 이룹니다.',
    mainMinerals: ['방해석 (CaCO₃)', '돌로마이트'],
    keyFeatures: ['묽은 염산(HCl)을 떨어뜨리면 이산화탄소(CO₂) 기포가 격렬히 발생!', '지하수에 녹아 석회동굴과 카르스트 지형 형성', '백색~회색조'],
    usage: '시멘트 제조의 핵심 원료, 제철용 융제, 토양 산도 개량제'
  },
  {
    id: 'gneiss',
    name: '편마암',
    hanja: '片麻岩',
    english: 'Gneiss',
    category: '변성암',
    subCategory: '광역변성암 (고도 변성)',
    grainSize: '조립질',
    colorTone: '중간색',
    silicaContent: '변성 기원 (화강암/퇴적암의 고온고압 변성)',
    hasAcidReaction: false,
    hasFoliation: true,
    hasBedding: false,
    hasPores: false,
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
    description: '기존의 화강암이나 퇴적암이 지하 깊은 곳에서 극심한 열과 압력을 받아 밝고 어두운 줄무늬가 굵게 생긴 변성암입니다.',
    formationProcess: '조산운동과 같은 강력한 광역변성작용에 의해 광물들이 재결정화되면서, 비중과 화학 성분이 다른 석영·장석(밝은 광물)과 흑운모·각섬석(어두운 광물)이 분리되어 교대 띠를 이루는 편마구조가 만들어집니다.',
    mainMinerals: ['석영', '정장석', '흑운모', '각섬석', '석류석'],
    keyFeatures: ['굵고 뚜렷한 호상 줄무늬(편마구조)', '단단한 조립질 입자', '한반도 기저 지각(선캄브리아기 편마암 복합체)의 주성분'],
    usage: '정원석, 조경 디딤돌, 석축, 도로 골재'
  },
  {
    id: 'marble',
    name: '대리암',
    hanja: '大理岩',
    english: 'Marble',
    category: '변성암',
    subCategory: '접촉/광역변성암',
    grainSize: '조립질',
    colorTone: '밝은색',
    silicaContent: '탄산염 변성 (석회암의 재결정화)',
    hasAcidReaction: true,
    hasFoliation: false,
    hasBedding: false,
    hasPores: false,
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=400&q=80',
    description: '석회암이 마그마의 열이나 지각변동의 압력을 받아 방해석 결정이 굵고 치밀하게 재결정화된 암석입니다.',
    formationProcess: '원래 미세한 방해석으로 이루어진 석회암이 열변성 또는 광역변성을 받으면서 불순물은 특유의 마블 무늬를 이루고, 방해석 알갱이들이 녹아붙어 설탕 같은 등립상 결정 조직을 형성합니다.',
    mainMinerals: ['방해석 (재결정화된 조립질 CaCO₃)', '백운석'],
    keyFeatures: ['부드럽고 우아한 광택과 미려한 무늬', '석회암과 마찬가지로 묽은 염산에 격렬히 반응(CO₂ 거품)!', '모스 굳기 3으로 가공과 조각이 용이'],
    usage: '최고급 실내 인테리어 대리석, 미켈란젤로 다비드상 등 고전 조각상'
  }
];

export const PRESET_CRITERIA: {
  id: string;
  title: string;
  badge: string;
  question: string;
  principle: string;
  groups: ClassificationGroup[];
}[] = [
  {
    id: 'origin',
    title: '생성 과정 (암석의 3대 분류)',
    badge: '기본 핵심 분류',
    question: '암석이 어떤 지구조적 환경과 과정에서 만들어졌는가?',
    principle: '지구상의 모든 암석은 마그마/용암의 냉각(화성암), 지표 퇴적물의 다짐·교결(퇴적암), 기존 암석의 열·압력 변성(변성암)이라는 3대 순환 과정에 의해 탄생합니다.',
    groups: [
      {
        id: 'igneous',
        title: '화성암 (Igneous Rocks)',
        subtitle: '마그마와 용암이 식어 굳어진 암석',
        description: '지하 마그마나 지표로 분출된 용암이 냉각·응고되어 형성되었습니다. 냉각 속도에 따라 화산암(빠른 냉각)과 심성암(느린 냉각)으로 나뉩니다.',
        criteriaKey: '화성암',
        color: '#FF6B6B',
        expectedRockIds: ['basalt', 'granite', 'gabbro', 'rhyolite']
      },
      {
        id: 'sedimentary',
        title: '퇴적암 (Sedimentary Rocks)',
        subtitle: '퇴적물이 쌓이고 다져져 굳어진 암석',
        description: '풍화·침식된 쇄설물, 생물 유해 또는 화학 침전물이 수중에 층층이 퇴적되어 속성작용(다짐+교결)을 받아 생성되었습니다. 층리와 화석이 관찰됩니다.',
        criteriaKey: '퇴적암',
        color: '#4ECDC4',
        expectedRockIds: ['sandstone', 'shale', 'limestone']
      },
      {
        id: 'metamorphic',
        title: '변성암 (Metamorphic Rocks)',
        subtitle: '열과 압력에 의해 성질이 변한 암석',
        description: '지각변동이나 마그마 관입으로 고온·고압 환경에 처한 기존 암석이 완전히 녹지 않고 고체 상태에서 재결정화되어 탄생했습니다. 엽리 구조나 등립상 조직이 나타납니다.',
        criteriaKey: '변성암',
        color: '#FFE66D',
        expectedRockIds: ['gneiss', 'marble']
      }
    ]
  },
  {
    id: 'grain',
    title: '알갱이(결정) 크기',
    badge: '조직 기반 분류',
    question: '육안이나 돋보기로 보았을 때 광물/입자의 크기가 어떻게 다른가?',
    principle: '화성암에서는 마그마의 냉각 속도(지하 깊은 곳=서서히 냉각=조립질 vs 지표 부근=급랭=세립질), 퇴적암에서는 퇴적 장소의 유속 에너지(유속 빠름=모래/사암 vs 유속 정체=진흙/셰일)에 의해 입자 크기가 결정됩니다.',
    groups: [
      {
        id: 'coarse',
        title: '조립질 (알갱이가 큼 / 육안 확인 가능)',
        subtitle: '입자 크기가 2mm 이상 또는 육안으로 뚜렷한 결정',
        description: '천천히 식어 광물 결정이 크게 자란 심성암(화강암, 반려암), 거친 모래가 굳은 사암, 재결정화되어 굵어진 편마암 및 대리암이 해당합니다.',
        criteriaKey: '조립질',
        color: '#A06CD5',
        expectedRockIds: ['granite', 'gabbro', 'sandstone', 'gneiss', 'marble']
      },
      {
        id: 'fine',
        title: '세립질 (알갱이가 매우 작고 미세함)',
        subtitle: '입자가 매우 작아 돋보기로도 결정 구분이 어려운 조직',
        description: '지표로 분출되어 급랭한 화산암(현무암, 유문암), 잔잔한 호수/심해에서 미세 점토가 가라앉은 셰일, 화학적 침전으로 형성된 석회암이 속합니다.',
        criteriaKey: '세립질',
        color: '#48CAE4',
        expectedRockIds: ['basalt', 'rhyolite', 'shale', 'limestone']
      }
    ]
  },
  {
    id: 'color',
    title: '색상 및 화학 조성 (SiO₂ 함량)',
    badge: '광물 조성 분류',
    question: '암석의 겉보기 밝기와 철(Fe)·마그네슘(Mg) vs 규소(Si)의 비율은 어떠한가?',
    principle: '암석의 밝기는 포함된 조암 광물의 종류를 반영합니다. 석영·장석 등 무색/백색 유색 광물이 많으면 SiO₂ 함량이 높고 밝은색(산성암 계열), 감람석·휘석 등 철과 마그네슘이 풍부한 유색 광물이 많으면 어두운색(염기성암 계열)을 띱니다.',
    groups: [
      {
        id: 'bright',
        title: '밝은색 계열 (규산질 / 산성 계열)',
        subtitle: '석영, 장석, 방해석 등 무색·백색 광물이 주성분',
        description: '이산화규소(SiO₂)가 풍부하여 밝은 화강암과 유문암, 백색 탄산염으로 이루어진 석회암과 대리암이 포함됩니다.',
        criteriaKey: '밝은색',
        color: '#FFF275',
        expectedRockIds: ['granite', 'rhyolite', 'limestone', 'marble']
      },
      {
        id: 'dark',
        title: '어두운색 및 중간색 계열 (고철질 / 점토성)',
        subtitle: '철(Fe), 마그네슘(Mg), 유기물, 점토가 다량 함유된 암석',
        description: '감람석·휘석 등 짙은 고철질 광물이 풍부한 현무암과 반려암, 풍부한 점토와 유기물로 흑회색을 띠는 셰일, 다양한 색상의 모래가 모인 사암, 줄무늬가 혼재된 편마암이 해당합니다.',
        criteriaKey: '어두운색',
        color: '#6C757D',
        expectedRockIds: ['basalt', 'gabbro', 'shale', 'sandstone', 'gneiss']
      }
    ]
  },
  {
    id: 'reaction',
    title: '묽은 염산(HCl) 화학 반응',
    badge: '특수 화학 실험 분류',
    question: '묽은 염산을 떨어뜨렸을 때 이산화탄소(CO₂) 거품이 발생하는가?',
    principle: '탄산칼슘(CaCO₃) 성분을 포함한 암석은 묽은 염산과 반응하여 다음과 같은 화학반응식을 거쳐 거품(이산화탄소)을 뿜어냅니다: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑. 지질학 현장에서 방해석 함유 암석을 즉시 감별하는 핵심 기준입니다.',
    groups: [
      {
        id: 'acid_yes',
        title: '염산 반응 O (격렬한 기포 발생)',
        subtitle: 'CaCO₃ 성분으로 인해 CO₂ 기포가 보글보글 끓어오름',
        description: '탄산칼슘 껍질을 지닌 생물의 유해로 만들어진 석회암과, 석회암이 열변성을 받아 방해석으로 재결정화된 대리암 2종이 강력하게 반응합니다!',
        criteriaKey: '반응함',
        color: '#FF70A6',
        expectedRockIds: ['limestone', 'marble']
      },
      {
        id: 'acid_no',
        title: '염산 반응 X (기포 발생 없음)',
        subtitle: '규산염(SiO₂) 광물 주성분으로 염산과 반응하지 않음',
        description: '현무암, 화강암, 반려암, 유문암, 사암, 셰일, 편마암은 규산염 광물이 주를 이루어 묽은 염산을 떨어뜨려도 거품이 나지 않습니다.',
        criteriaKey: '반응없음',
        color: '#70E000',
        expectedRockIds: ['basalt', 'granite', 'gabbro', 'rhyolite', 'sandstone', 'shale', 'gneiss']
      }
    ]
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '제주도 돌하르방의 재료로 쓰이며, 용암이 지표에서 급랭하여 기공(구멍)이 많은 이 암석은 무엇일까요?',
    options: ['화강암', '현무암', '사암', '편마암'],
    correctAnswer: '현무암',
    explanation: '현무암은 지표로 분출된 현무암질 용암이 빠르게 식어 세립질 조직과 가스가 빠져나간 기공을 갖는 대표적인 화산암입니다.'
  },
  {
    id: 2,
    question: '마그마가 지하 깊은 곳에서 수천만 년에 걸쳐 천천히 식어 석영, 장석, 흑운모의 조립질 결정이 뚜렷한 밝은색 암석은?',
    options: ['유문암', '반려암', '화강암', '셰일'],
    correctAnswer: '화강암',
    explanation: '화강암은 지하 깊은 곳에서 서서히 식어 광물 알갱이가 크게 성장한 산성 심성암으로, 우리나라 북한산이나 설악산 등의 주성분입니다.'
  },
  {
    id: 3,
    question: '다음 중 묽은 염산(HCl)을 떨어뜨렸을 때 이산화탄소(CO₂) 기포가 격렬하게 발생하는 암석 2가지는?',
    options: ['현무암과 화강암', '사암과 셰일', '석회암과 대리암', '편마암과 반려암'],
    correctAnswer: '석회암과 대리암',
    explanation: '석회암과 대리암은 모두 탄산칼슘(CaCO₃) 성분의 방해석을 포함하고 있어 염산과 반응하여 CO₂ 기포를 발생시킵니다.'
  },
  {
    id: 4,
    question: '강력한 지각변동으로 고온·고압 환경에서 광물들이 분리되어 굵은 줄무늬(편마구조)를 띠는 암석은?',
    options: ['편마암', '사암', '유문암', '현무암'],
    correctAnswer: '편마암',
    explanation: '편마암은 광역변성작용에 의해 밝은 광물(석영, 장석)과 어두운 광물(흑운모, 각섬석)이 분리되어 교대 띠(편마구조)를 이루는 대표 변성암입니다.'
  },
  {
    id: 5,
    question: '잔잔한 호수나 깊은 바다 밑바닥에 미세한 진흙 입자가 쌓여 책장처럼 얇은 결을 따라 잘 쪼개지는 퇴적암은?',
    options: ['사암', '셰일', '역암', '대리암'],
    correctAnswer: '셰일',
    explanation: '셰일은 미세한 점토와 실트가 퇴적되어 속성작용을 받아 생성되며, 얇은 판 모양으로 쉽게 벗겨지는 박리성이 뛰어납니다.'
  }
];
