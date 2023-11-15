import styled from "styled-components";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Demo = () => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context((self) => {
      if (!self.selector) return;

      const tl = gsap
        .timeline()
        .from(".layer-1-text", {
          xPercent: 100,
        })
        .to(".layer-1", {
          yPercent: -100,
        })
        .from(
          ".layer-2-text",
          {
            y: 200,
          },
          "<"
        );

      ScrollTrigger.create({
        trigger: ".scroll-wrapper",
        start: "top top",
        end: "+=5000",
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
        <Layer1 className="layer layer-1">
          <div className="layer-1-text">layer one</div>
        </Layer1>
        <Layer2 className="layer layer-2">
          <div className="layer-2-text">layer two</div>{" "}
        </Layer2>
      </ScrollWrapper>
    </Wrapper>
  );
};

export default Demo;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: aqua;
`;

const AbsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const Layer1 = styled(AbsWrapper)`
  background-color: red;
  z-index: 2;

  .layer-1-text {
    width: 100%;
    height: 100%;
    background-color: pink;
  }
`;

const Layer2 = styled(AbsWrapper)`
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;
