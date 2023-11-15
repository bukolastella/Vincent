import { useLayoutEffect, useState } from "react";
import Hero from "./components/Hero";
import Works from "./components/Works";
import styled from "styled-components";
import gsap from "gsap";
import About from "./components/About";

const LandingPage = () => {
  const [tl, setTl] = useState<GSAPTimeline>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const miniTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-wrapper",
          start: "top top",
          end: "+=10000",
          // markers: true,
          pin: true,
          scrub: 1,
        },
      });
      setTl(miniTl);
    });
    return () => ctx.revert();
  }, []);

  return (
    <Wrapper>
      <ScrollWrapper className="scroll-wrapper">
        {tl && (
          <>
            <Hero tl={tl} />
            <Works tl={tl} />
            <About tl={tl} />
          </>
        )}
      </ScrollWrapper>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;
