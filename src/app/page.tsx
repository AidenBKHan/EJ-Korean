import Link from "next/link";

const highlights = [
  {
    title: "1:1 맞춤 수업",
    description:
      "학습자의 목표와 수준에 맞춰 문법, 회화, 발음까지 개인 맞춤형으로 진행합니다.",
  },
  {
    title: "실생활 회화 중심",
    description:
      "교재 위주가 아닌, 실제 한국 생활과 여행, 업무에서 바로 쓸 수 있는 표현을 배웁니다.",
  },
  {
    title: "온라인 수업 가능",
    description:
      "화상 수업으로 전 세계 어디서나 시간에 맞춰 편하게 수업을 들을 수 있습니다.",
  },
];

const steps = [
  { step: "1", text: "인스타그램(@ej.korean) 또는 이메일로 문의" },
  { step: "2", text: "레벨 테스트 및 학습 목표 상담" },
  { step: "3", text: "수업 결제 후 정식 수업 시작" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 text-center sm:pt-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-600">
          EJ Korean
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-neutral-900 sm:text-5xl">
          외국인을 위한
          <br className="sm:hidden" /> 1:1 한국어 수업
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
          안녕하세요, 한국어 강사 EJ입니다. 초급부터 고급까지, 여러분의 목표에
          맞는 맞춤형 한국어 수업으로 함께 성장해요.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/payment"
            className="w-full rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 sm:w-auto"
          >
            수업 신청하기
          </Link>
          <a
            href="https://www.instagram.com/ej.korean"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-neutral-300 px-8 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-rose-300 hover:text-rose-600 sm:w-auto"
          >
            인스타그램 보기
          </a>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
            강사 소개
          </h2>
          <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-rose-100 text-4xl font-bold text-rose-600">
              EJ
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-neutral-900">EJ 선생님</h3>
              <p className="mt-1 text-sm font-medium text-rose-600">
                한국어 개인 과외 강사
              </p>
              <p className="mt-4 leading-relaxed text-neutral-600">
                다양한 국적의 학습자들과 함께 한국어를 가르쳐온 경험을 바탕으로,
                단순 암기가 아닌 실제로 쓸 수 있는 한국어를 알려드립니다.
                문법 설명부터 자연스러운 발음, 실전 회화까지 학습자 한 명 한 명에게
                맞춘 커리큘럼으로 수업을 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          수업 특징
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-200 p-6 text-center sm:text-left"
            >
              <h3 className="text-lg font-bold text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
            수업 신청 방법
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          지금 바로 한국어 수업을 시작해보세요
        </h2>
        <div className="mt-8">
          <Link
            href="/payment"
            className="inline-block rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
          >
            수업 결제하러 가기
          </Link>
        </div>
      </section>
    </div>
  );
}
