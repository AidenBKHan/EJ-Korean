import Link from "next/link";
import Script from "next/script";
import InstagramIcon from "@/components/icons/InstagramIcon";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/social";

const MUSAI_WIDGET_SRC = "https://aidenbkhan.github.io/Musai/musai-widget.js";

const credentials = [
  "한국어교원자격증 보유",
  "New Zealand Certificate in Language Education (NZCLE) Level 5",
  "3년+ 외국인 한국어 지도 경험",
  "10개국 이상 학습자 지도",
  "TOPIK 대비 수업 진행",
];

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

const testimonials = [
  {
    quote:
      "예약한 시간마다 제 실수를 바로바로 짚어주셔서 어색했던 표현들이 확실히 자연스러워졌어요. 다음 수업이 항상 기다려집니다.",
    name: "Emily",
    origin: "캐나다",
    date: "2026-07-02",
  },
  {
    quote:
      "온라인 수업인데도 대면 수업처럼 집중도가 높았어요. 한국 생활에 필요한 표현들을 많이 배워서 실생활에 큰 도움이 됐습니다.",
    name: "Louis",
    origin: "프랑스",
    date: "2026-06-25",
  },
  {
    quote:
      "제 수준과 목표에 맞춰서 커리큘럼을 짜주셔서 부담 없이 꾸준히 배울 수 있었어요. 발음 교정도 꼼꼼하게 봐주십니다.",
    name: "Wei",
    origin: "중국",
    date: "2026-06-14",
  },
  {
    quote:
      "혼자 공부할 때는 막막했던 문법이 EJ 선생님과 수업하면서 훨씬 명확해졌어요. 실제 대화에서 바로 써먹을 수 있는 표현 위주라 좋았습니다.",
    name: "Sarah",
    origin: "미국",
    date: "2026-06-02",
  },
  {
    quote:
      "체험 수업 때 제 목표를 자세히 물어봐 주셔서 놀랐어요. 그 이후로도 매번 저한테 맞는 예문으로 설명해 주셔서 이해가 훨씬 빨랐습니다.",
    name: "Anya",
    origin: "러시아",
    date: "2026-05-20",
  },
  {
    quote:
      "여행 가서 바로 써먹을 수 있는 표현 위주로 배워서 좋았고, 한국 문화 이야기도 곁들여주셔서 수업이 지루하지 않았어요.",
    name: "Haruto",
    origin: "일본",
    date: "2026-05-05",
  },
].sort((a, b) => (a.date < b.date ? 1 : -1));

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

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100"
        >
          <InstagramIcon className="h-4 w-4" />
          {INSTAGRAM_HANDLE} 팔로우하기
        </a>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/payment"
            className="w-full rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 sm:w-auto"
          >
            수업 신청하기
          </Link>
          <a
            href={INSTAGRAM_URL}
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
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {credentials.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm sm:justify-start"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600" />
                    {item}
                  </li>
                ))}
              </ul>
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

      {/* Testimonials */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
            학생 후기
          </h2>
          <div className="mt-10">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 py-16">
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
      </section>

      {/* Instagram bridge */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <InstagramIcon className="mx-auto h-8 w-8 text-rose-600" />
          <h2 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
            인스타그램에서 더 만나요
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            매일 쓰는 한국어 표현, 수업 후기, 문화 이야기를 인스타그램에서
            먼저 만나보세요.
          </p>
          <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-rose-200 via-rose-400 to-orange-300"
              />
            ))}
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
          >
            <InstagramIcon className="h-4 w-4" />
            {INSTAGRAM_HANDLE} 팔로우하기
          </a>
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

        {/* 기술 테스트: MUSAI 안전 위젯 삽입 예시 (EJ Korean 서비스와 무관) */}
        <div className="mt-12 border-t border-dashed border-neutral-200 pt-10">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            기술 테스트 삽입 (MUSAI 위젯)
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div
              className="musai-safety-widget"
              data-country="FR"
              data-region="파리"
              data-layout="card"
            />
            <div
              className="musai-safety-widget"
              data-country="ES"
              data-region="바르셀로나"
              data-layout="card"
            />
          </div>
          <div className="mt-6 mx-auto max-w-2xl">
            <div
              className="musai-safety-widget"
              data-country="NZ"
              data-region="오클랜드"
              data-layout="bottomsheet"
            />
          </div>
        </div>
      </section>

      <Script src={MUSAI_WIDGET_SRC} strategy="afterInteractive" />
    </div>
  );
}
