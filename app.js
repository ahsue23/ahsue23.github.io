(() => {
  "use strict";

  const config = window.AHSUE_LINKS || {};
  const featured = document.querySelector(".featured-links");
  const extras = document.querySelector(".extra-links");
  const toast = document.querySelector(".toast");
  let toastTimer;

  function getUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      return ["https:", "http:", "mailto:", "tel:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function announce(label) {
    clearTimeout(toastTimer);
    toast.textContent = `${label} · 아직 준비 중이에요. 조금만 기다려 주세요!`;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.textContent = "";
    }, 3200);
  }

  function makeLink(data, label) {
    const url = getUrl(data.url);
    const element = document.createElement(url ? "a" : "button");
    if (url) {
      element.href = url;
      if (config.openInNewTab && /^https?:/.test(url)) {
        element.target = "_blank";
        element.rel = "noopener noreferrer";
        element.setAttribute("aria-label", `${label} (새 탭에서 열림)`);
      } else {
        element.setAttribute("aria-label", label);
      }
    } else {
      element.type = "button";
      element.setAttribute("aria-label", `${label} (준비 중 안내)`);
      element.addEventListener("click", () => announce(label));
    }
    return element;
  }

  function textElement(tag, className, value) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = value;
    return element;
  }

  const fixedCards = [
    ["youtube", "아슈부부 유튜브"],
    ["blog", "아현의 블로그"],
    ["studio", "진수의 창작실"],
    ["fourth", "네 번째 이야기"],
  ];

  for (const [id, fallbackLabel] of fixedCards) {
    const data = config.featured?.[id] || {};
    const label = (id === "fourth" && data.title) || data.label || fallbackLabel;
    const link = makeLink(data, label);
    link.className = `featured-link featured-link--${id}`;
    link.dataset.card = id;
    if (id === "fourth" && data.title) {
      const copy = document.createElement("span");
      copy.className = "fourth-copy";
      copy.append(textElement("span", "fourth-copy__title", data.title));
      if (data.description) copy.append(textElement("span", "fourth-copy__description", data.description));
      link.append(copy);
    }
    featured.append(link);
  }

  const additionalLinks = Array.isArray(config.extra) ? config.extra : [];
  additionalLinks.forEach((data, index) => {
    if (!data || typeof data.title !== "string" || !data.title.trim()) return;
    const link = makeLink(data, data.title);
    link.className = "paper-link";
    link.dataset.tone = ["sage", "rose", "blue", "honey"].includes(data.tone) ? data.tone : "sage";
    const paper = Number(data.paper);
    link.dataset.paper = [1, 2, 3, 4].includes(paper) ? String(paper) : String((index % 4) + 1);
    const copy = document.createElement("span");
    copy.className = "paper-link__copy";
    copy.append(textElement("span", "paper-link__title", data.title));
    if (data.description) copy.append(textElement("span", "paper-link__description", data.description));
    link.append(copy);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "paper-link__arrow");
    svg.setAttribute("viewBox", "0 0 12 20");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3 3 9 10 3 17");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2.7");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.append(path);
    link.append(svg);
    extras.append(link);
  });
  extras.hidden = extras.childElementCount === 0;
})();
