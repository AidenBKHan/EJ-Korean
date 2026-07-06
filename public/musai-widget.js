(function () {
  "use strict";

  var DEMO_DATA = {
    FR: {
      default: {
        region: "프랑스",
        safetyIndex: 75.0,
        badge: "양호",
        summary: "전반적으로 안전하나 대도시 관광지에서는 소매치기에 유의하세요.",
      },
      regions: {
        "파리": {
          safetyIndex: 72.0,
          badge: "유의 필요",
          summary:
            "주요 관광지와 대중교통 이용 시 소매치기, 여권·휴대폰 분실에 유의하세요.",
        },
        "몽마르트르": {
          safetyIndex: 65.0,
          badge: "유의 필요",
          summary:
            "사크레쾨르 대성당 주변 소매치기와 팔찌 강매 등 호객 사기에 특히 주의하세요.",
        },
        "니스": {
          safetyIndex: 80.0,
          badge: "양호",
          summary:
            "해안 관광지는 비교적 안전하나 여름 성수기에는 소매치기에 유의하세요.",
        },
      },
    },
    ES: {
      default: {
        region: "스페인",
        safetyIndex: 70.0,
        badge: "유의 필요",
        summary: "대도시 관광지 중심으로 소매치기 사례가 잦은 편입니다.",
      },
      regions: {
        "바르셀로나": {
          safetyIndex: 68.0,
          badge: "유의 필요",
          summary:
            "관광 밀집 지역의 소매치기 발생 빈도가 높고, 야간 골목길 이동 시 주의가 필요합니다.",
        },
        "마드리드": {
          safetyIndex: 74.0,
          badge: "양호",
          summary:
            "대체로 안전하나 솔 광장 등 관광 밀집 지역에서는 소매치기에 유의하세요.",
        },
      },
    },
    JP: {
      default: {
        region: "일본",
        safetyIndex: 84.0,
        badge: "양호",
        summary: "치안이 우수한 편이나 의약품 반입 규정을 사전에 확인하세요.",
      },
      regions: {
        "오사카": {
          safetyIndex: 81.0,
          badge: "양호",
          summary:
            "치안은 양호한 편이나 의약품 반입 규정과 입국 서류를 사전에 확인하세요.",
        },
        "간사이공항": {
          safetyIndex: 88.0,
          badge: "양호",
          summary:
            "공항 내 치안은 매우 양호하나 입국 심사 시 반입금지 의약품 여부를 확인하세요.",
        },
      },
    },
    KH: {
      default: {
        region: "캄보디아",
        safetyIndex: 54.0,
        badge: "주의",
        summary:
          "고수익 취업 제안, 여권 보관 요구 등 신변안전 위험에 특히 유의하세요.",
      },
      regions: {
        "프놈펜": {
          safetyIndex: 54.0,
          badge: "주의",
          summary:
            "고수익 취업 제안, 여권 보관 요구 등 신변안전 위험에 특히 유의하세요.",
        },
      },
    },
    NZ: {
      default: {
        region: "뉴질랜드",
        safetyIndex: 82.0,
        badge: "양호",
        summary:
          "전반적으로 치안이 우수하나 지진 등 자연재해 안내를 사전에 확인하세요.",
      },
      regions: {
        "오클랜드": {
          safetyIndex: 85.0,
          badge: "양호",
          summary:
            "치안이 매우 양호하나 야간 유흥가 주변 소지품 관리에 유의하고, 렌터카 이용 시 좌측통행에 익숙해지세요.",
        },
      },
    },
  };

  var STYLE = [
    ":host { all: initial; }",
    ".musai-card { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;",
    "  border-radius: 16px; padding: 20px; max-width: 320px;",
    "  background: #0f766e; color: #ffffff; box-shadow: 0 4px 16px rgba(0,0,0,.12); }",
    ".musai-card.musai-layout-bottomsheet { max-width: none; border-radius: 20px 20px 0 0; }",
    ".musai-title { margin: 0; font-size: 12px; font-weight: 600; opacity: .85; }",
    ".musai-dest { margin: 4px 0 0; font-size: 16px; font-weight: 700; }",
    ".musai-score-row { display: flex; align-items: baseline; gap: 8px; margin-top: 12px; }",
    ".musai-score { font-size: 28px; font-weight: 900; }",
    ".musai-badge { font-size: 12px; font-weight: 600; background: rgba(255,255,255,.18);",
    "  padding: 2px 10px; border-radius: 999px; }",
    ".musai-summary { margin: 12px 0 0; font-size: 13px; line-height: 1.5; opacity: .95; }",
    ".musai-footnote { margin: 10px 0 0; font-size: 11px; opacity: .65; }",
    ".musai-error { font-size: 13px; color: #b91c1c; }",
  ].join("\n");

  function render(root, layout, html) {
    root.innerHTML = "<style>" + STYLE + "</style>" + html;
  }

  function renderDemo(root, country, regionOverride, layout) {
    var countryData = DEMO_DATA[country];
    var regionData =
      countryData && regionOverride
        ? countryData.regions[regionOverride]
        : null;
    var entry = regionData || (countryData && countryData.default);

    var region = regionOverride || (countryData && countryData.default.region) || country;
    var safetyIndex = entry ? entry.safetyIndex.toFixed(1) : "--";
    var badge = entry ? entry.badge : "정보 없음";
    var summary = entry
      ? entry.summary
      : "해당 국가/지역의 예시 데이터가 아직 준비되지 않았습니다.";

    render(
      root,
      layout,
      '<div class="musai-card musai-layout-' +
        layout +
        '">' +
        '<p class="musai-title">무사이 안전정보</p>' +
        '<p class="musai-dest">' +
        region +
        ", " +
        country +
        "</p>" +
        '<div class="musai-score-row">' +
        '<span class="musai-score">' +
        safetyIndex +
        "</span>" +
        '<span class="musai-badge">' +
        badge +
        "</span>" +
        "</div>" +
        '<p class="musai-summary">' +
        summary +
        "</p>" +
        '<p class="musai-footnote">데모 모드 (실시간 API 미연결)</p>' +
        "</div>",
    );
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
      render(root, layout, '<p class="musai-error">data-country 값이 필요합니다.</p>');
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
          layout,
          '<div class="musai-card musai-layout-' +
            layout +
            '">' +
            '<p class="musai-title">무사이 안전정보</p>' +
            '<p class="musai-dest">' +
            (data.region || region || country) +
            ", " +
            country +
            "</p>" +
            '<div class="musai-score-row">' +
            '<span class="musai-score">' +
            data.safetyIndex +
            "</span>" +
            '<span class="musai-badge">' +
            (data.badge || "") +
            "</span>" +
            "</div>" +
            '<p class="musai-summary">' +
            (data.summary || "") +
            "</p>" +
            "</div>",
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
