export type ClassPackage = {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  badge?: string;
};

export const packages: ClassPackage[] = [
  {
    id: "trial",
    name: "1회 체험 수업",
    duration: "50분",
    price: 35000,
    description: "정식 수업 전 강사와 궁합을 확인해보는 체험 수업",
  },
  {
    id: "package-4",
    name: "4회 패키지",
    duration: "회당 50분",
    price: 130000,
    description: "꾸준한 학습을 시작하는 학습자를 위한 기본 패키지",
    badge: "인기",
  },
  {
    id: "package-8",
    name: "8회 패키지",
    duration: "회당 50분",
    price: 240000,
    description: "본격적으로 실력을 쌓고 싶은 학습자를 위한 패키지",
  },
];
