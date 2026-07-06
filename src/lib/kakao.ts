declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: "text";
          text: string;
          link: { mobileWebUrl: string; webUrl: string };
        }) => void;
      };
    };
  }
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? "";
const SDK_URL = "https://developers.kakao.com/sdk/js/kakao.js";

function loadKakaoSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Kakao?.isInitialized?.()) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SDK_URL}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("SDK_LOAD_FAILED")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("SDK_LOAD_FAILED"));
    document.head.appendChild(script);
  });
}

export async function shareViaKakao(params: {
  text: string;
  linkUrl: string;
}) {
  if (!KAKAO_JS_KEY) {
    throw new Error("NO_KEY");
  }
  await loadKakaoSdk();
  if (!window.Kakao) throw new Error("SDK_UNAVAILABLE");
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY);
  }
  window.Kakao.Share.sendDefault({
    objectType: "text",
    text: params.text,
    link: {
      mobileWebUrl: params.linkUrl,
      webUrl: params.linkUrl,
    },
  });
}
