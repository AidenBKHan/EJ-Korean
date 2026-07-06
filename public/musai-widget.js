(function () {
  "use strict";

  var DEMO_DATA = {
    FR: {
      region: "파리",
      safetyIndex: 72.0,
      badge: "유의 필요",
      summary:
        "주요 관광지와 대중교통 이용 시 소매치기, 여권·휴대폰 분실에 유의하세요.",
    },
    ES: {
      region: "바르셀로나",
      safetyIndex: 68.0,
      badge: "유의 필요",
      summary:
        "관광 밀집 지역의 소매치기 발생 빈도가 높고, 야간 골목길 이동 시 주의가 필요합니다.",
    },
    JP: {
      region: "오사카",
      safetyIndex: 81.0,
      badge: "양호",
      summary:
        "치안은 양호한 편이나 의약품 반입 규정과 입국 서류를 사전에 확인하세요.",
    },
    KH: {
      region: "프놈펜",
      safetyIndex: 54.0,
      badge: "주의",
      summary:
        "고수익 취업 제안, 여권 보관 요구 등 신변안전 위험에 특히 유의하세요.",
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
    var data = DEMO_DATA[country];
    var region = regionOverride || (data && data.region) || country;
    var safetyIndex = data ? data.safetyIndex.toFixed(1) : "--";
    var badge = data ? data.badge : "정보 없음";
    var summary = data
      ? data.summary
      : "해당 국가 코드의 예시 데이터가 아직 준비되지 않았습니다.";

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
