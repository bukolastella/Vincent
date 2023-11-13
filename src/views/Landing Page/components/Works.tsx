import styled from "styled-components";
import Colors from "../../../styles/Colors";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { worksData } from "./data";

gsap.registerPlugin(ScrollTrigger, CustomEase);

enum ClassNames {
  listHeadText = "lh_text",
  Des = "description",
  imageText = "images",
}

const Works = () => {
  const app = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useLayoutEffect(() => {
    ctx.current = gsap.context((self) => {
      self.add("lhMouseEnter", (index: number) => {
        const desTl = gsap
          .timeline()
          .set(`.${ClassNames.Des}`, {
            opacity: 0,
          })
          .to(
            `.${ClassNames.Des}_${index}`,
            {
              opacity: 1,
            },
            "<"
          );

        const lhTl = gsap
          .timeline()
          .to(
            `.${ClassNames.listHeadText}`,
            {
              backgroundImage: "linear-gradient(90deg, #222222 0%, #f0f0f0 0%)",
            },
            "<"
          )
          .to(
            `.${ClassNames.listHeadText}_${index}`,
            {
              backgroundImage:
                "linear-gradient(90deg, #222222 100%, #f0f0f0 100%)",
            },
            "<"
          );

        const imagesTl = gsap
          .timeline()
          .to(
            `.${ClassNames.imageText}`,
            {
              opacity: 0,
              duration: 0.8,
            },
            "<"
          )
          .to(
            `.${ClassNames.imageText}_${index}`,
            {
              opacity: 1,
              duration: 0.8,
            },
            "<"
          );

        gsap
          .timeline({
            defaults: {
              overwrite: true,
              ease: "linear",
            },
          })
          .add(desTl, "<")
          .add(lhTl, "<")
          .add(imagesTl, "<");
      });
    }, app);

    return () => ctx.current?.revert();
  }, []);

  const lhMouseEnter = (index: number) => {
    ctx.current?.lhMouseEnter(index);
  };

  return (
    <Wrapper ref={app}>
      <ScrollWrapper>
        <Flexxer>
          <LeftSide>
            {worksData.map((ev, i) => (
              <div>
                <ListHead
                  onMouseEnter={() => {
                    lhMouseEnter(i);
                  }}
                >
                  <span>{ev.text1}</span>
                  <span
                    className={`${ClassNames.listHeadText} ${ClassNames.listHeadText}_${i}`}
                  >
                    {ev.text2}
                  </span>
                </ListHead>
                <span className={`${ClassNames.Des} ${ClassNames.Des}_${i}`}>
                  Lorem ipsum dolor sit amet elit.
                </span>
              </div>
            ))}
          </LeftSide>
          <RightSide>
            {worksData.map((ev, i) => (
              <img
                src={ev.image}
                className={`${ClassNames.imageText} ${ClassNames.imageText}_${i}`}
              />
            ))}
          </RightSide>
        </Flexxer>
      </ScrollWrapper>
    </Wrapper>
  );
};

export default Works;

const Wrapper = styled.div`
  width: 100%;
  background-color: ${Colors.WhiteF0};
  height: 1000px;
  padding: 10rem 5rem;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Flexxer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 50px;

  & > div {
    width: 50%;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  & > div {
    .description {
      opacity: 0;
    }
  }

  & > div:first-child {
    & > div {
      gap: 0;
    }
  }
`;

const ListHead = styled.div`
  display: flex;
  align-items: center;
  font-size: 4rem;
  font-weight: bold;
  gap: 12px;
  width: max-content;
  cursor: pointer;

  & > span:nth-child(1) {
    color: ${Colors.Black22};
  }

  & > span:nth-child(2) {
    color: transparent;
    -webkit-text-stroke: 1px ${Colors.Black22};
    background-image: linear-gradient(90deg, #222222 0%, #f0f0f0 0%);
    background-clip: text;
    -webkit-background-clip: text;
  }
`;
const RightSide = styled.div`
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;
