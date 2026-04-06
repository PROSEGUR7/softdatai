declare global {
  interface Window {
    __SOFTDATAI_BRAND_PRINTED__?: boolean;
  }
}

const SOFTDATAI_ASCII = [
  "   _____ ____  ________________  ___  _________    ____",
  "  / ___// __ \\/ ____/_  __/ __ \\/   |/_  __/   |  /  _/",
  "  \\__ \\/ / / / /_    / / / / / / /| | / / / /| |  / /  ",
  " ___/ / /_/ / __/   / / / /_/ / ___ |/ / / ___ |_/ /   ",
  "/____/\\____/_/     /_/ /_____/_/  |_/_/ /_/  |_/___/   ",
  "                                                        "
].join('\n');

export const printSoftdataiConsoleMark = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.__SOFTDATAI_BRAND_PRINTED__) {
    return;
  }

  window.__SOFTDATAI_BRAND_PRINTED__ = true;

  console.log(
    `%c${SOFTDATAI_ASCII}`,
    'font-family: Consolas, Menlo, monospace; font-size: 11px; line-height: 1.15; color: #19d7ff;'
  );
};

export {};
