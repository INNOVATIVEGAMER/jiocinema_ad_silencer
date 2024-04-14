const MUTE_BTN_SELECTOR =
  "#testing > div.mui-style-jshu1n-buttonPanel > div.mui-style-bizjqu-buttonControlsLeft > div > button";

const AD_DIV_SELECTOR =
  "#main > div.hls-player-wrapper.mui-style-7dmsrx-root > div > div.mui-style-5kj990-adTag";

const adDetector = () => {
  const muteBtn = document.querySelector(MUTE_BTN_SELECTOR);
  if (!muteBtn) return false;

  const mute = () => {
    if (muteBtn.ariaLabel == "Mute") muteBtn.click();
  };
  const unmute = () => {
    if (muteBtn.ariaLabel == "Unmute") muteBtn.click();
  };

  let adStarted = false;

  setInterval(() => {
    const adDiv = document.querySelector(AD_DIV_SELECTOR);

    if (adDiv && !adStarted) {
      adStarted = true;
      mute();
    }
  }, 500);

  let adFinishCheck = false;
  setInterval(() => {
    const adDiv = document.querySelector(AD_DIV_SELECTOR);

    if (!adDiv && adStarted && !adFinishCheck) {
      adFinishCheck = true;
      setTimeout(() => {
        adFinishCheck = false;

        const adDiv = document.querySelector(AD_DIV_SELECTOR);

        if (!adDiv) {
          adStarted = false;
          unmute();
        }
      }, 8000);
    }
  }, 500);

  return true;
};

const it = setInterval(() => {
  const isLoaded = adDetector();
  if (isLoaded) clearInterval(it);
}, 2000);
