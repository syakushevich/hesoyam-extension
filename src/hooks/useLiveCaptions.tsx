// captions block
// <div tabindex="0" role="region" aria-label="Captions">
//   <div class="nMcdL bj4p3b">
//     <div class="adE6rb">
//       <img class="Z6byG r6DyN" alt="" src="https://lh3.googleusercontent.com/a" data-iml="107802.1000000001">
//       <div class="KcIKyf jxFHg">
//         <span class="NWpY1d">You</span>
//       </div>
//     </div>
//     <div class="bh44bd VbkSUe">
//       Test test. I don't know.
//     </div>
//   </div>

//   <div class="nMcdL bj4p3b">
//     <div class="adE6rb">
//       <img class="Z6byG r6DyN" alt="" src="https://lh3.googleusercontent.com/a" data-iml="168028.30000000028">
//       <div class="KcIKyf jxFHg">
//         <span class="NWpY1d">Roma Kononovich</span>
//       </div>
//     </div>
//     <div class="bh44bd VbkSUe">
//       Okay.
//     </div>
//   </div>

//   <div class="nMcdL bj4p3b">
//     <div class="adE6rb">
//       <img class="Z6byG r6DyN" alt="" src="https://lh3.googleusercontent.com/a/" data-iml="169735.80000000028">
//       <div class="KcIKyf jxFHg">
//         <span class="NWpY1d">You</span>
//       </div>
//     </div>
//     <div class="bh44bd VbkSUe">
//       What videos?
//     </div>
//   </div>

//   <div class="nMcdL bj4p3b"><div class="adE6rb"><img class="Z6byG r6DyN" alt="" src="https://lh3.googleusercontent.com/a/ACg8ocJFeacQeeZRT6R5ziw2KoP6KfYe3c-C0iJvdDLXf9mOKSmI3gE=s192-c-mo" data-iml="180889.2000000002"><div class="KcIKyf jxFHg"><span class="NWpY1d">Roma Kononovich</span></div></div><div class="bh44bd VbkSUe">So, if you</div></div><div class="nMcdL bj4p3b"><div class="adE6rb"><img class="Z6byG r6DyN" alt="" src="https://lh3.googleusercontent.com/a/ACg8ocIrFd6gCSMjWaYhAIJi-8sSqLaAMWFTfz0VzRXzUt3eIe_2_vrB=s192-c-mo" data-iml="187427"><div class="KcIKyf jxFHg"><span class="NWpY1d">You</span></div></div><div class="bh44bd VbkSUe">So much negates to the The piece of. </div></div><div class="nMcdL bj4p3b"><div class="adE6rb"><img class="Z6byG r6DyN" alt="" src="https://lh3.googleusercontent.com/a/ACg8ocJFeacQeeZRT6R5ziw2KoP6KfYe3c-C0iJvdDLXf9mOKSmI3gE=s192-c-mo" data-iml="310235.7000000002"><div class="KcIKyf jxFHg"><span class="NWpY1d">Roma Kononovich</span></div></div><div class="bh44bd VbkSUe">The back of us.</div></div><div class="nMcdL bj4p3b"><div class="adE6rb"><img class="Z6byG r6DyN" alt="" src="https://lh3.googleusercontent.com/a/ACg8ocIrFd6gCSMjWaYhAIJi-8sSqLaAMWFTfz0VzRXzUt3eIe_2_vrB=s192-c-mo" data-iml="343318.3999999999"><div class="KcIKyf jxFHg"><span class="NWpY1d">You</span></div></div><div class="bh44bd VbkSUe">I don't know. Those things become ultraborties. But yeah. It whichever wooded coconut. On both contextual processes. That inspired as a book. Dark. Marginal cartoon. The Select Recognational consumer. Keeper, randomly the plaza. And not being spear by Dot. To debacle than our charts as the odd. So, And our personality. So it So the dark, I get them. Back, just because the screen. Push chart repeated. So Delete. And talk just possibility. Dark.</div></div><div class="VoGqsc"><div class="VfPpkd-dgl2Hf-ppHlrf-sM5MNb" data-is-touch-wrapper="true"><button class="UywwFc-LgbsSe UywwFc-LgbsSe-OWXEXe-Bz112c-M1Soyc UywwFc-LgbsSe-OWXEXe-dgl2Hf UywwFc-StrnGf-YYd4I-VtOx3e" jscontroller="O626Fe" jsaction="click:h5M12e; clickmod:h5M12e;pointerdown:FEiYhc;pointerup:mF5Elf;pointerenter:EX0mI;pointerleave:vpvbp;pointercancel:xyn4sd;contextmenu:xexox; focus:h06R8; blur:zjh6rb;mlnRJb:fLiPzd" jsname="Xke7ne" aria-label="Jump to most recent captions"><span class="OiePBf-zPjgPe"></span><span class="SXdXAb-BFbNVe"><span class="SXdXAb-ugnUJb"></span></span><span class="RBHQF-ksKsZd" jscontroller="LBaJxb" jsname="m9ZlFb"></span><span class="UywwFc-RLmnJb"></span><span jsname="Xr1QTb" class="UywwFc-kBDsod-Rtc0Jf UywwFc-kBDsod-Rtc0Jf-OWXEXe-M1Soyc"><i class="quRWN-Bz112c google-symbols notranslate" aria-hidden="true">arrow_downward</i></span><span jsname="V67aGc" class="UywwFc-vQzf8d" aria-hidden="true">Jump to bottom</span><span jsname="UkTUqb" class="UywwFc-kBDsod-Rtc0Jf UywwFc-kBDsod-Rtc0Jf-OWXEXe-UbuQg"></span></button></div></div></div>


import { useEffect, useState, useRef } from "react";

export type CaptionLine = {
  name: string;
  text: string;
};

export function useLiveCaptions(enabled: boolean) {
  const [captions, setCaptions] = useState<CaptionLine[]>([]);
  const observerRef = useRef<MutationObserver | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    function setupObserver() {
      const captionsRegion = document.querySelector('div[aria-label="Captions"]');
      if (!captionsRegion) {
        intervalRef.current = window.setTimeout(setupObserver, 500);
        return;
      }

      const handleCaptions = () => {
        const blocks = Array.from(captionsRegion.children).slice(0, -1);
        const lines: CaptionLine[] = blocks.map(block => {
          // block: <div>...</div>
          // Speaker name: block.firstElementChild?.lastElementChild?.textContent
          // Caption text: block.lastElementChild?.textContent
          let name = "Unknown";
          let text = "";

          // Speaker name: div > div:first-child > div > span
          const nameSpan = block.querySelector("div:first-child > div > span");
          if (nameSpan) {
            name = nameSpan.textContent?.trim() || "Unknown";
          }

          const textDiv = block.children[1];
          if (textDiv) {
            text = textDiv.textContent?.trim() || "";
          }

          return { name, text };
        }).filter(line => line.text.length > 0);

        setCaptions(lines);
      };

      handleCaptions();

      const observer = new MutationObserver(handleCaptions);
      observer.observe(captionsRegion, { childList: true, subtree: true, characterData: true });
      observerRef.current = observer;
    }

    setupObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled]);

  return captions;
}
