import { gsap } from "gsap";

function splitText(element: HTMLElement | null): { words: HTMLElement[]; chars: HTMLElement[]; lines: HTMLElement[]; revert: () => void } {
  if (!element) return { words: [], chars: [], lines: [], revert: () => {} };
  const originalHTML = element.innerHTML;
  const words: HTMLElement[] = [];
  const chars: HTMLElement[] = [];

  function processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (!text) return;
      const frag = document.createDocumentFragment();
      const tokens = text.split(/(\s+)/);
      tokens.forEach((token) => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          frag.appendChild(document.createTextNode(token));
        } else {
          const wordSpan = document.createElement("span");
          wordSpan.className = "split-word";
          wordSpan.style.display = "inline-block";
          wordSpan.style.overflow = "hidden";
          wordSpan.style.verticalAlign = "top";

          token.split("").forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = "split-char";
            charSpan.style.display = "inline-block";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
            chars.push(charSpan);
          });

          frag.appendChild(wordSpan);
          words.push(wordSpan);
        }
      });
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.classList.contains("split-word") || el.classList.contains("split-char")) return;
      Array.from(el.childNodes).forEach(processNode);
    }
  }

  Array.from(element.childNodes).forEach(processNode);

  return {
    words,
    chars,
    lines: [element],
    revert: () => {
      element.innerHTML = originalHTML;
    },
  };
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0]?.classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#050405",
    duration: 0.5,
    delay: 1,
  });

  const landingInfoH3 = splitText(
    document.querySelector(".landing-info h3") as HTMLElement
  );
  const landingIntroH2 = splitText(
    document.querySelector(".landing-intro h2") as HTMLElement
  );
  const landingIntroH1 = splitText(
    document.querySelector(".landing-intro h1") as HTMLElement
  );

  const introChars = [
    ...landingIntroH2.chars,
    ...landingIntroH1.chars,
    ...landingInfoH3.chars,
  ];

  if (introChars.length > 0) {
    gsap.fromTo(
      introChars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.02,
        delay: 0.3,
      }
    );
  }

  const landingH2Info = document.querySelector(".landing-h2-info") as HTMLElement;
  if (landingH2Info) {
    const landingText2 = splitText(landingH2Info);
    gsap.fromTo(
      landingText2.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );
  }

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingH2Info1 = document.querySelector(".landing-h2-info-1") as HTMLElement;
  const landingH2_1 = document.querySelector(".landing-h2-1") as HTMLElement;
  const landingH2_2 = document.querySelector(".landing-h2-2") as HTMLElement;
  
  if (landingH2Info1) splitText(landingH2Info1);
  if (landingH2_1) splitText(landingH2_1);
  if (landingH2_2) splitText(landingH2_2);

  LoopText(
    document.querySelector(".landing-h2-info") as HTMLElement,
    document.querySelector(".landing-h2-info-1") as HTMLElement
  );
  LoopText(
    document.querySelector(".landing-h2-1") as HTMLElement,
    document.querySelector(".landing-h2-2") as HTMLElement
  );
}

function LoopText(elem1: HTMLElement | null, elem2: HTMLElement | null) {
  if (!elem1 || !elem2) return;
  
  const chars1 = elem1.querySelectorAll(".split-char");
  const chars2 = elem2.querySelectorAll(".split-char");
  
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    chars2,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      chars1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      chars1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      chars2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}