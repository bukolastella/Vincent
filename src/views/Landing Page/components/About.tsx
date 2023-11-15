import styled from "styled-components";
import Colors from "../../../styles/Colors";
import { FC, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Props {
  tl: GSAPTimeline;
}

const About: FC<Props> = ({ tl }) => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      tl.from(
        app.current,
        {
          yPercent: 100,
        },
        ">-50%"
      )
        .from(
          ".para",
          {
            y: -20, //
            stagger: 0.1,
          },
          ">-90%"
        )
        .fromTo(
          ".about-text",
          {
            yPercent: -100,
          },
          {
            yPercent: 50,
          },
          "<"
        );
    }, app);

    return () => ctx.current?.revert();
  }, [tl]);

  return (
    <Wrapper ref={app}>
      <AboutWrapper className="about-text">About</AboutWrapper>
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
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${Colors.Black22};
  padding: 10rem 5rem;
  overflow: hidden;
`;

const AboutWrapper = styled.div`
  width: max-content;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 5rem;
  font-size: 20rem;
  font-weight: bold;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  color: ${Colors.WhiteF0};
`;

const ContentWrapper = styled.div`
  width: 70%;
  height: 100%;
  margin-left: auto;
  font-size: 1.5rem;
  font-weight: bold;
  /* padding-top: 10rem; */
  color: ${Colors.WhiteF0};
`;
