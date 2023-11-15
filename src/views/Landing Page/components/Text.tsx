import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Text = () => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      const paraWraps = gsap.utils.toArray(".para-wrapper") as HTMLDivElement[];
      const tl = gsap.timeline().from(".con", { yPercent: 100 });

      paraWraps.forEach((ev) => {
        tl.from(ev.children[0], {
          y: 300,
          scrollTrigger: {
            trigger: ev,
            start: "top=+800 bottom",
            markers: true,
          },
        });
      });
    }, app);

    return () => ctx.current?.revert();
  }, []);

  return (
    <Wrapper ref={app}>
      <MiniWrapper />
      <ContentWrapper className="con">
        <div className="para-wrapper">
          <p className="para">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
            deleniti corporis quia dicta consequatur dolores. Alias quae ipsam,
            iure totam, modi sequi laboriosam quod ad vitae enim, debitis
            inventore hic.
          </p>
        </div>
        <br />
        <br />
        <div className="para-wrapper">
          <p className="para">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
        </div>
        <br />
        <br />
        <div className="para-wrapper">
          <p className="para">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
            deleniti corporis quia dicta consequatur dolores. Alias quae ipsam,
            iure totam, modi sequi laboriosam quod ad vitae enim, debitis
            inventore hic.
          </p>
        </div>
        <br />
        <br />
        <div className="para-wrapper">
          <p className="para">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
            deleniti corporis quia dicta consequatur dolores.
          </p>
        </div>
      </ContentWrapper>
      <MiniWrapper />
    </Wrapper>
  );
};

export default Text;

const Wrapper = styled.div`
  height: 100vh;
  background-color: aquamarine;
`;

const MiniWrapper = styled.div`
  height: 100vh;
  background-color: aquamarine;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ContentWrapper = styled.div`
  width: 70%;
  height: 100%;
  background-color: #ff6200ff;
  margin-left: auto;
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
