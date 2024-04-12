import styled from "styled-components";

type Props = {
  opacity?: number;
}

export const Pet = styled.img`
  position: absolute;
  top: 24.5rem;
  right: 5rem;
  width: 40rem;
  z-index: 9999;
`;

export const Section = styled.section`
  width: 100vw;
  padding-top: 5rem;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.blue};
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.gray};
`;

export const ContainerTitle = styled.div`
  display: flex;
  justify-content: center;
  height: 90vh;
`;

export const Main = styled.div`
  background-color: ${(props) => props.theme.colors.snow};
  z-index: 2;
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8.5rem;
`;

export const TitleAnimation = styled.div<Props>`
  opacity: ${props => props.opacity};

  transition: opacity 0.7s ease;
`;

export const Title = styled.h2`
  font-size: 6rem;
  margin-top: 5rem;
  z-index: 9999;
  font-family: "Outfit", sans-serif;
  color: ${(props) => props.theme.colors.snow};
`;

export const Title2 = styled(Title)`
  color: ${(props) => props.theme.colors.brown};
`;

export const Icon = styled.img`
  width: 4rem;
`;

export const ContainerIcons = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
`;

export const ContentIcons = styled(ContainerIcons)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 8rem;
`;

export const Text = styled.span`
  font-size: 0.9rem;
  text-align: center;
  font-weight: 600;
`;

export const Description = styled.span`
  font-size: 0.8rem;
  text-align: center;
  font-weight: 500;
  color: ${(props) => props.theme.colors.brown};
`;

export const Divider = styled.div`
  width: 10rem;
  height: 0.07rem;
  background-color: ${(props) => props.theme.colors.yellow};
  margin-top: 1rem;
`;

export const ContainerAdopt = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  margin-bottom: 4rem;
  margin-right: 8rem;
`;

export const ContentAdopt = styled.div`
  text-align: center;
`;

export const Cat = styled.img`
  width: 15rem;
`;

export const TextAdopt = styled.span`
  font-size: 0.9rem;
  text-align: center;
  font-weight: 400;
  width: 40rem;
`;

export const ContainerDonation = styled.div`
  display: flex;
  padding: 2rem 2rem 0 2rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.nude2};
  width: 100vw;
  height: fit-content;
`;

export const ContentDonation = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 4rem;
`;

export const Dog = styled.img`
  width: 15rem;
`;

export const TextDonation = styled(TextAdopt)`
  text-align: start;
  font-weight: 400;
  font-size: 0.9rem;
`;

export const LinkSpan = styled.span`
  color: ${(props) => props.theme.colors.yellow};
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
