document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // CONFIG
  // ==============================

  const TRIAL_DAYS = 7;
  const TRIAL_KEY = "footballAliensTrialStart";

  const FBA_CONTRACT = "TNW5ABkp3v4jfeDo1vRVjxa3gtnoxP3DBN";
  const REQUIRED_FBA = 420;
  const FBA_DECIMALS = 6;

  // ==============================
  // STATE
  // ==============================

  let currentAlien = null;
  let unlockedByToken = false;

  // ==============================
  // DOM
  // ==============================

  const alienButtons = document.querySelectorAll(".alien");
  const alienTitle = document.getElementById("alienTitle");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const responseBox = document.getElementById("response");
  const trialNotice = document.getElementById("trialNotice");

  // ==============================
  // TRIAL CHECK
  // ==============================

  const now = Date.now();
  let trialStart = localStorage.getItem(TRIAL_KEY);

  if (!trialStart) {
    localStorage.setItem(TRIAL_KEY, now);
    trialStart = now;
  }

  const trialElapsedDays =
    (now - trialStart) / (1000 * 60 * 60 * 24);

  const trialExpired = trialElapsedDays >= TRIAL_DAYS;

  // ==============================
  // WALLET + FBA CHECK
  // ==============================

  async function checkFBABalance() {
    if (!window.tronWeb || !tronWeb.defaultAddress.base58) return;

    try {
      const contract = await tronWeb.contract().at(FBA_CONTRACT);
      const balance = await contract.balanceOf(
        tronWeb.defaultAddress.base58
      ).call();

      const normalized =
        Number(balance) / Math.pow(10, FBA_DECIMALS);

      if (normalized >= REQUIRED_FBA) {
        unlockedByToken = true;
        unlockApp();
      }
    } catch (err) {
      console.error("FBA check failed", err);
    }
  }

  // ==============================
  // LOCK / UNLOCK
  // ==============================

  function lockApp() {
    userInput.disabled = true;
    sendBtn.disabled = true;
    document.body.classList.add("locked");
  }

  function unlockApp() {
    document.body.classList.remove("locked");
    userInput.disabled = false;
    sendBtn.disabled = false;
    trialNotice.innerText =
      "✅ Access unlocked by holding 420 FBA";
  }

  // ==============================
  // INITIAL ACCESS STATE
  // ==============================

  if (trialExpired) {
    lockApp();
    trialNotice.innerText =
      "⏳ Trial ended. Hold 420 FBA tokens to continue.";
  } else {
    const daysLeft = Math.ceil(TRIAL_DAYS - trialElapsedDays);
    trialNotice.innerText =
      `🆓 Free trial: ${daysLeft} day(s) remaining`;
  }

  // ==============================
  // ALIEN SELECTION
  // ==============================

  alienButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentAlien = btn.dataset.alien;
      alienTitle.innerText = getAlienName(currentAlien);

      if (!document.body.classList.contains("locked")) {
        userInput.disabled = false;
        sendBtn.disabled = false;
      }

      responseBox.innerText = "👽 Alien connected. Speak.";
    });
  });

  // ==============================
  // CHAT
  // ==============================

  sendBtn.addEventListener("click", () => {

    if (document.body.classList.contains("locked")) {
      responseBox.innerText =
        "🔒 Hold 420 FBA tokens to unlock full access.";
      return;
    }

    if (!currentAlien) {
      responseBox.innerText = "👽 Select an alien first.";
      return;
    }

    const message = userInput.value.trim();
    if (!message) return;

    responseBox.innerText = localAlienReply(currentAlien);
    userInput.value = "";
  });

  // ==============================
  // ALIEN BRAINS (DEMO)
  // ==============================

  function localAlienReply(alien) {
    switch (alien) {
      case "sleep":
        return "😴 Sleep Alien: Fixed wake time. Morning light. No excuses.";

      case "coach":
        return "🏈 Coach Alien: You don’t need motivation. You need discipline.";

      case "chaos":
        return "⚔️ Chaos Alien: Comfort is the enemy. Choose violence against bad habits.";

      default:
        return "👽 The alien observes.";
    }
  }

  function getAlienName(alien) {
    switch (alien) {
      case "sleep": return "😴 Sleep Alien";
      case "coach": return "🏈 Coach Alien";
      case "chaos": return "⚔️ Chaos Alien";
      default: return "Unknown Alien";
    }
  }

  // ==============================
  // AUTO CHECK AFTER WALLET CONNECT
  // ==============================

  setTimeout(checkFBABalance, 1500);

});
