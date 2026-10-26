(() => {
  "use strict";
  const config = window.AHSUE_LINKS || {};
  const stories = document.querySelector(".stories");
  const storyLinks = document.querySelector(".story-links");
  const toast = document.querySelector(".toast");
  let toastTimer;

  function getWebUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  function announce(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  function setDestination(link, url, label) {
    link.href = url;
    if (config.openInNewTab) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${label} (새 탭에서 열림)`);
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-label", label);
    }
  }

  document.querySelectorAll(".featured-link").forEach((link) => {
    const data = config.featured?.[link.dataset.card];
    if (!data) return;
    const label = data.label || link.textContent.trim();
    const url = getWebUrl(data.url);
    if (url) {
      setDestination(link, url, label);
    } else {
      const button = document.createElement("button");
      button.type = "button";
      button.className = link.className;
      button.dataset.card = link.dataset.card;
      button.setAttribute("aria-label", `${label} (준비 중)`);
      button.addEventListener("click", () => announce(`${label} · 아직 준비 중이에요.`));
      button.append(...link.childNodes);
      link.replaceWith(button);
    }
  });

  const additionalLinks = Array.isArray(config.extra) ? config.extra : [];
  additionalLinks.forEach((data) => {
    const url = getWebUrl(data?.url);
    if (!url || typeof data.title !== "string" || !data.title.trim()) return;
    const link = document.createElement("a");
    link.className = "story-link";
    setDestination(link, url, data.title.trim());
    const copy = document.createElement("span");
    copy.className = "story-copy";
    const title = document.createElement("span");
    title.className = "story-title";
    title.textContent = data.title.trim();
    copy.append(title);
    if (typeof data.description === "string" && data.description.trim()) {
      const description = document.createElement("span");
      description.className = "story-description";
      description.textContent = data.description.trim();
      copy.append(description);
    }
    link.append(copy);
    storyLinks.append(link);
  });
  stories.hidden = storyLinks.childElementCount === 0;

  const email = typeof config.email === "string" && config.email.trim() ? config.email.trim() : "ahsue23@gmail.com";
  const emailLink = document.querySelector(".contact-email");
  const copyButton = document.querySelector(".copy-email");
  const copyLabel = copyButton.querySelector("span");
  const fallback = document.querySelector(".copy-fallback");
  emailLink.textContent = email;
  emailLink.href = `mailto:${email}`;
  fallback.value = email;
  copyButton.hidden = false;
  let copyTimer;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      return true;
    } catch {
      // Older browsers or a blocked clipboard may allow a user-triggered copy.
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      fallback.setSelectionRange(0, email.length);
      try {
        if (document.execCommand("copy")) {
          fallback.hidden = true;

          return true;
        }
      } catch { /* Leave the selected address visible for a manual copy. */ }
      return false;
    }
  }

  copyButton.addEventListener("click", async () => {
    clearTimeout(copyTimer);
    copyButton.disabled = true;
    const copied = await copyEmail();
    copyButton.disabled = false;
    if (copied) {
      copyButton.focus({ preventScroll: true });
      fallback.hidden = true;
      copyLabel.textContent = "복사완료!";
      announce("이메일 주소를 복사했어요.");
      copyTimer = setTimeout(() => { copyLabel.textContent = "주소복사"; }, 2400);
    } else {
      copyLabel.textContent = "주소복사";
      announce("자동 복사가 어려워요. 아래 선택된 이메일 주소를 직접 복사해 주세요.");
    }
  });
})();
