import styled from "styled-components";
import Colors from "../../../styles/Colors";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

enum ClassNames {
  Panel1Text = "text_1",
  Panel2Text = "text_2",
}

const Hero = () => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context((self) => {
      if (!self.selector) return;
      const Panel1Text = self.selector(`.${ClassNames.Panel1Text}`);
      const Panel2Text = self.selector(`.${ClassNames.Panel2Text}`);
      const splitPanel1Text = new SplitType([Panel1Text], {
        types: "chars",
      }).chars;
      const splitPanel2Text = new SplitType([Panel2Text], {
        types: "chars",
      }).chars;
      if (!splitPanel1Text || !splitPanel2Text) return;

      const tl = gsap
        .timeline({
          // paused: true,
        })
        .fromTo(
          Panel2Text,
          {
            clipPath: "inset(0% 0% 0% 100%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            animationDirection: "forwards",
          }
        )
        .from(
          splitPanel1Text,
          {
            x: gsap.utils.distribute({
              base: 456.6,
              amount: 1000,
              ease: "power4.out",
            }),
            ease: "power1.inOut",
          },
          "<"
        )
        .from(
          splitPanel2Text,
          {
            x: gsap.utils.distribute({
              base: 456.6,
              amount: 1000,
              ease: "power4.out",
            }),
            ease: "power1.inOut",
          },
          "<"
        );

      ScrollTrigger.create({
        trigger: ".scroll-wrapper",
        start: "top top",
        markers: true,
        scrub: 1,
        pin: true,
        animation: tl,
      });
    }, app);

    return () => ctx.current?.revert();
  }, []);

  return (
    <Wrapper ref={app}>
      <ScrollWrapper className="scroll-wrapper">
        <Panel1>
          <span className={ClassNames.Panel1Text}>Vincent</span>
        </Panel1>
        <Panel2 className={ClassNames.Panel2Text}>Vincent</Panel2>
        {/* <span className="spacer"></span> */}
      </ScrollWrapper>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.div`
  height: 100vh;
`;

const ScrollWrapper = styled.div`
  position: relative;
  font-size: 20rem;
  font-weight: bold;
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${Colors.Black22};
  z-index: 1;

  .spacer {
    height: 100vh;
  }
`;

const Panel1 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .test {
    position: relative;
  }
`;

const Panel2 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  overflow: hidden;
  background-color: #ff000047;
`;
