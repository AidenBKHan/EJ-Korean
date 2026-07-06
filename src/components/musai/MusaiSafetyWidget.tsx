"use client";

type Destination = {
  city: string;
  country: string;
  countryCode: string;
  safetyIndex: number;
  riskSummary: string;
  safeHow: string[];
};

const destinations: Destination[] = [
  {
    city: "파리",
    country: "프랑스",
    countryCode: "FR",
    safetyIndex: 72,
    riskSummary:
      "관광지 밀집 구역 소매치기, 대중교통 내 소지품 도난, 여권 분실 사례가 잦은 편입니다.",
    safeHow: [
      "가방은 몸 앞쪽으로 착용하세요",
      "여권 원본 대신 사본을 소지하세요",
      "지하철에서는 스마트폰 사용을 자제하세요",
    ],
  },
  {
    city: "바르셀로나",
    country: "스페인",
    countryCode: "ES",
    safetyIndex: 68,
    riskSummary:
      "관광 밀집 지역의 소매치기 발생 빈도가 높고, 야간 골목길 이동 시 주의가 필요합니다.",
    safeHow: [
      "람블라스 거리에서는 가방을 앞으로 메세요",
      "ATM 사용 시 주변을 먼저 확인하세요",
      "정식 면허 택시만 이용하세요",
    ],
  },
];

function SafetyGauge({ score }: { score: number }) {
  const color =
    score >= 75 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-rose-600";
  return (
    <div className={`flex items-baseline gap-1 ${color}`}>
      <span className="text-3xl font-black">{score}</span>
      <span className="text-sm font-medium">/ 100</span>
    </div>
  );
}

export default function MusaiSafetyWidget() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {destinations.map((dest) => (
        <div
          key={dest.countryCode}
          className="rounded-2xl border border-neutral-200 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-neutral-900">
                {dest.city}
                <span className="ml-1.5 text-sm font-normal text-neutral-400">
                  {dest.country} · {dest.countryCode}
                </span>
              </p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-neutral-400">
                안전체크 지수
              </p>
            </div>
            <SafetyGauge score={dest.safetyIndex} />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            {dest.riskSummary}
          </p>

          <div className="mt-4">
            <p className="text-xs font-semibold text-neutral-500">
              Safe-How 행동가이드
            </p>
            <ul className="mt-2 space-y-1.5">
              {dest.safeHow.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-sm text-neutral-700"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-600" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700"
          >
            재외공관 연락처 보기
          </button>
        </div>
      ))}
    </div>
  );
}
