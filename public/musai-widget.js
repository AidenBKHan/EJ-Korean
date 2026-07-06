(function () {
  "use strict";

  var DEMO_DATA = {
    FR: {
      default: {
        region: "프랑스",
        safetyIndex: 75,
        badge: "양호",
        riskTags: ["소매치기"],
        safeHow: [
          { emoji: "🎒", text: "가방은 몸 앞쪽으로 착용하세요." },
          { emoji: "🛂", text: "입국 시 반입금지 물품을 확인하세요." },
        ],
      },
      regions: {
        "파리": {
          safetyIndex: 72,
          badge: "유의 필요",
          riskTags: ["소매치기", "여권 분실", "관광지 주변 범죄"],
          safeHow: [
            { emoji: "🎒", text: "백팩은 앞으로 메고 지퍼를 잠그세요." },
            { emoji: "⚠️", text: "야외 테이블 위에 스마트폰과 지갑을 올려두지 마세요." },
            { emoji: "📓", text: "여권 원본과 사본을 분리해 보관하세요." },
          ],
        },
        "몽마르트르": {
          safetyIndex: 65,
          badge: "유의 필요",
          riskTags: ["호객 사기", "소매치기"],
          safeHow: [
            { emoji: "🙅", text: "팔찌를 채워주겠다는 호객 행위에 응하지 마세요." },
            { emoji: "🎒", text: "계단 주변 인파 속에서는 가방을 앞으로 메세요." },
            { emoji: "📸", text: "사진 촬영 중에는 소지품에서 눈을 떼지 마세요." },
          ],
        },
        "니스": {
          safetyIndex: 80,
          badge: "양호",
          riskTags: ["소매치기", "해변 도난"],
          safeHow: [
            { emoji: "🏖️", text: "해변에서는 소지품을 혼자 두지 마세요." },
            { emoji: "🎒", text: "프롬나드 산책로에서는 가방을 앞으로 메세요." },
          ],
        },
      },
    },
    ES: {
      default: {
        region: "스페인",
        safetyIndex: 70,
        badge: "유의 필요",
        riskTags: ["소매치기"],
        safeHow: [{ emoji: "🎒", text: "관광 명소에서는 가방을 몸 앞쪽에 두세요." }],
      },
      regions: {
        "바르셀로나": {
          safetyIndex: 68,
          badge: "유의 필요",
          riskTags: ["소매치기", "야간 골목 위험"],
          safeHow: [
            { emoji: "🎒", text: "람블라스 거리에서는 가방을 앞으로 메세요." },
            { emoji: "🌙", text: "야간에는 인적 드문 골목길 이동을 피하세요." },
            { emoji: "🏧", text: "ATM 사용 시 주변을 먼저 확인하세요." },
          ],
        },
        "마드리드": {
          safetyIndex: 74,
          badge: "양호",
          riskTags: ["소매치기"],
          safeHow: [
            { emoji: "🎒", text: "솔 광장 등 관광 밀집 지역에서 소지품에 유의하세요." },
            { emoji: "🚕", text: "택시는 정식 면허 차량만 이용하세요." },
          ],
        },
      },
    },
    JP: {
      default: {
        region: "일본",
        safetyIndex: 84,
        badge: "양호",
        riskTags: ["의약품 반입 규정"],
        safeHow: [{ emoji: "💊", text: "금지 의약품 목록을 사전에 확인하세요." }],
      },
      regions: {
        "오사카": {
          safetyIndex: 81,
          badge: "양호",
          riskTags: ["의약품 반입 규정", "입국 서류"],
          safeHow: [
            { emoji: "💊", text: "금지 의약품 목록을 입국 전 확인하세요." },
            { emoji: "📄", text: "입국 신고서와 서류를 미리 준비하세요." },
          ],
        },
        "간사이공항": {
          safetyIndex: 88,
          badge: "양호",
          riskTags: ["입국 심사"],
          safeHow: [
            { emoji: "🛃", text: "입국 심사 시 반입금지 의약품 여부를 확인하세요." },
            { emoji: "🧳", text: "수하물 수취 후 소지품을 바로 확인하세요." },
          ],
        },
      },
    },
    KH: {
      default: {
        region: "캄보디아",
        safetyIndex: 54,
        badge: "주의",
        riskTags: ["해외취업 사기", "여권 보관 요구"],
        safeHow: [
          { emoji: "🚫", text: "고수익 취업 제안은 반드시 사전에 검증하세요." },
          { emoji: "🛂", text: "고용주의 여권 보관 요구에 응하지 마세요." },
          { emoji: "📞", text: "위험 상황 시 즉시 재외공관에 연락하세요." },
        ],
      },
      regions: {
        "프놈펜": {
          safetyIndex: 54,
          badge: "주의",
          riskTags: ["해외취업 사기", "여권 보관 요구"],
          safeHow: [
            { emoji: "🚫", text: "고수익 취업 제안은 반드시 사전에 검증하세요." },
            { emoji: "🛂", text: "고용주의 여권 보관 요구에 응하지 마세요." },
            { emoji: "📞", text: "위험 상황 시 즉시 재외공관에 연락하세요." },
          ],
        },
      },
    },
    NZ: {
      default: {
        region: "뉴질랜드",
        safetyIndex: 82,
        badge: "양호",
        riskTags: ["자연재해"],
        safeHow: [{ emoji: "🌋", text: "지진 발생 시 행동요령을 사전에 확인하세요." }],
      },
      regions: {
        "오클랜드": {
          safetyIndex: 85,
          badge: "양호",
          riskTags: ["야간 소지품 관리", "좌측통행"],
          safeHow: [
            { emoji: "🌃", text: "야간 유흥가 주변에서는 소지품 관리에 유의하세요." },
            { emoji: "🚗", text: "렌터카 이용 시 좌측통행에 익숙해지세요." },
          ],
        },
      },
    },
  };

  var STYLE = [
    ":host { all: initial; }",
    "* { box-sizing: border-box; }",
    ".musai-card { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;",
    "  border-radius: 20px; padding: 20px; max-width: 340px;",
    "  background: #ffffff; color: #111827; box-shadow: 0 4px 20px rgba(0,0,0,.12);",
    "  border: 1px solid #f1f5f9; }",
    ".musai-card.musai-layout-bottomsheet { max-width: none; border-radius: 20px 20px 0 0; }",
    ".musai-header { display: flex; align-items: center; gap: 10px; }",
    ".musai-avatar { width: 40px; height: 40px; border-radius: 50%; background: #f0fdf4;",
    "  display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }",
    ".musai-title { margin: 0; font-size: 15px; font-weight: 700; }",
    ".musai-subtitle { margin: 2px 0 0; font-size: 12px; color: #6b7280; }",
    ".musai-score-section { display: flex; align-items: center; gap: 14px; margin-top: 16px; }",
    ".musai-gauge { width: 68px; height: 68px; border-radius: 50%; flex-shrink: 0;",
    "  display: flex; align-items: center; justify-content: center; position: relative; }",
    ".musai-gauge-hole { position: absolute; inset: 6px; border-radius: 50%; background: #ffffff;",
    "  display: flex; flex-direction: column; align-items: center; justify-content: center; }",
    ".musai-gauge-num { font-size: 20px; font-weight: 800; line-height: 1; }",
    ".musai-gauge-den { font-size: 9px; color: #9ca3af; }",
    ".musai-score-text p { margin: 0; font-size: 13px; font-weight: 600; color: #374151; }",
    ".musai-badge { display: inline-block; margin-top: 6px; font-size: 11px; font-weight: 700;",
    "  padding: 3px 10px; border-radius: 999px; }",
    ".musai-badge-good { background: #d1fae5; color: #047857; }",
    ".musai-badge-warn { background: #fef3c7; color: #92400e; }",
    ".musai-badge-danger { background: #fee2e2; color: #b91c1c; }",
    ".musai-tags { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px; }",
    ".musai-tag { font-size: 11px; font-weight: 600; background: #fdf2f8; color: #be185d;",
    "  padding: 3px 10px; border-radius: 999px; }",
    ".musai-safehow { margin-top: 16px; }",
    ".musai-safehow-title { margin: 0 0 8px; font-size: 13px; font-weight: 700; }",
    ".musai-safehow ol { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }",
    ".musai-step { display: flex; align-items: flex-start; gap: 8px; font-size: 12.5px; color: #374151; line-height: 1.5; }",
    ".musai-step-num { flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%; background: #2563eb;",
    "  color: #fff; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1px; }",
    ".musai-step-emoji { flex-shrink: 0; }",
    ".musai-actions { margin-top: 16px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }",
    ".musai-action-btn { font-size: 11px; font-weight: 600; color: #374151; background: #f9fafb;",
    "  border: 1px solid #e5e7eb; border-radius: 10px; padding: 8px 4px; cursor: pointer; text-align: center; }",
    ".musai-feedback { margin-top: 14px; padding-top: 12px; border-top: 1px solid #f1f5f9;",
    "  display: flex; align-items: center; justify-content: space-between; }",
    ".musai-feedback-label { font-size: 12px; color: #6b7280; }",
    ".musai-feedback-btns { display: flex; gap: 6px; }",
    ".musai-feedback-btn { border: none; background: #f9fafb; border-radius: 999px; width: 28px; height: 28px;",
    "  font-size: 13px; cursor: pointer; }",
    ".musai-footnote { margin: 10px 0 0; font-size: 11px; color: #9ca3af; }",
    ".musai-error { font-size: 13px; color: #b91c1c; }",
  ].join("\n");

  function badgeClass(safetyIndex) {
    if (safetyIndex >= 80) return "musai-badge-good";
    if (safetyIndex >= 50) return "musai-badge-warn";
    return "musai-badge-danger";
  }

  function gaugeColor(safetyIndex) {
    if (safetyIndex >= 80) return "#059669";
    if (safetyIndex >= 50) return "#d97706";
    return "#dc2626";
  }

  function render(root, html) {
    root.innerHTML = "<style>" + STYLE + "</style>" + html;
  }

  function cardMarkup(layout, region, country, entry) {
    var pct = Math.max(0, Math.min(100, entry.safetyIndex));
    var color = gaugeColor(entry.safetyIndex);
    var gaugeStyle =
      "background: conic-gradient(" + color + " " + pct + "%, #e5e7eb 0)";

    var tags = (entry.riskTags || [])
      .map(function (tag) {
        return '<span class="musai-tag">' + tag + "</span>";
      })
      .join("");

    var steps = (entry.safeHow || [])
      .map(function (step, i) {
        return (
          '<li class="musai-step">' +
          '<span class="musai-step-num">' +
          (i + 1) +
          "</span>" +
          '<span class="musai-step-emoji">' +
          step.emoji +
          "</span>" +
          "<span>" +
          step.text +
          "</span>" +
          "</li>"
        );
      })
      .join("");

    return (
      '<div class="musai-card musai-layout-' +
      layout +
      '">' +
      '<div class="musai-header">' +
      '<div class="musai-avatar">🛡️</div>' +
      "<div>" +
      '<p class="musai-title">무사이 안전정보</p>' +
      '<p class="musai-subtitle">여행지의 안전을 함께 지켜요</p>' +
      "</div>" +
      "</div>" +
      '<div class="musai-score-section">' +
      '<div class="musai-gauge" style="' +
      gaugeStyle +
      '">' +
      '<div class="musai-gauge-hole">' +
      '<span class="musai-gauge-num">' +
      entry.safetyIndex +
      "</span>" +
      '<span class="musai-gauge-den">/100</span>' +
      "</div>" +
      "</div>" +
      '<div class="musai-score-text">' +
      "<p>" +
      region +
      ", " +
      country +
      " 관광지 안전지수 " +
      entry.safetyIndex +
      "점</p>" +
      '<span class="musai-badge ' +
      badgeClass(entry.safetyIndex) +
      '">' +
      entry.badge +
      "</span>" +
      "</div>" +
      "</div>" +
      (tags ? '<div class="musai-tags">' + tags + "</div>" : "") +
      '<div class="musai-safehow">' +
      '<p class="musai-safehow-title">✅ Safe-How 행동가이드</p>' +
      "<ol>" +
      steps +
      "</ol>" +
      "</div>" +
      '<div class="musai-actions">' +
      '<button type="button" class="musai-action-btn">공관 연락처 보기</button>' +
      '<button type="button" class="musai-action-btn">긴급번호 저장</button>' +
      '<button type="button" class="musai-action-btn">원문 출처 확인</button>' +
      "</div>" +
      '<div class="musai-feedback">' +
      '<span class="musai-feedback-label">💬 이 정보가 도움이 되었나요?</span>' +
      '<span class="musai-feedback-btns">' +
      '<button type="button" class="musai-feedback-btn">👍</button>' +
      '<button type="button" class="musai-feedback-btn">👎</button>' +
      "</span>" +
      "</div>" +
      '<p class="musai-footnote">데모 모드 (실시간 API 미연결)</p>' +
      "</div>"
    );
  }

  function renderDemo(root, country, regionOverride, layout) {
    var countryData = DEMO_DATA[country];
    var regionData =
      countryData && regionOverride ? countryData.regions[regionOverride] : null;
    var entry = regionData || (countryData && countryData.default);

    if (!entry) {
      render(
        root,
        '<div class="musai-card musai-layout-' +
          layout +
          '"><p class="musai-error">해당 국가/지역의 예시 데이터가 아직 준비되지 않았습니다.</p></div>',
      );
      return;
    }

    var region =
      regionOverride || (countryData && countryData.default.region) || country;

    render(root, cardMarkup(layout, region, country, entry));
  }

  function fetchWithTimeout(url, ms) {
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, ms);
    return fetch(url, { signal: controller.signal }).finally(function () {
      clearTimeout(timer);
    });
  }

  function initWidget(el) {
    var country = el.getAttribute("data-country");
    var region = el.getAttribute("data-region");
    var layout = el.getAttribute("data-layout") || "card";
    var apiBase = el.getAttribute("data-api-base");

    var root = el.shadowRoot || el.attachShadow({ mode: "open" });

    if (!country) {
      render(root, '<p class="musai-error">data-country 값이 필요합니다.</p>');
      return;
    }

    if (!apiBase) {
      renderDemo(root, country, region, layout);
      return;
    }

    var url =
      apiBase.replace(/\/$/, "") +
      "/safety?country=" +
      encodeURIComponent(country) +
      (region ? "&region=" + encodeURIComponent(region) : "");

    fetchWithTimeout(url, 3000)
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (data) {
        render(
          root,
          cardMarkup(layout, data.region || region || country, country, {
            safetyIndex: data.safetyIndex,
            badge: data.badge || "",
            riskTags: data.riskTags || [],
            safeHow: data.safeHow || [],
          }),
        );
      })
      .catch(function () {
        renderDemo(root, country, region, layout);
      });
  }

  function initAll() {
    var nodes = document.querySelectorAll(".musai-safety-widget");
    for (var i = 0; i < nodes.length; i++) {
      initWidget(nodes[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
