import styled, { keyframes } from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  z-index: 999999;
  height: 5rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.blue};
`;

export const Ul = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  margin: 0;
`;

export const Logo = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoText = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.nude};
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

export const Img = styled.img`
  width: 3rem;
`;

export const Span = styled.span`
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  color: aliceblue;
  z-index: 99999;
  padding-bottom: 0.2rem;
  letter-spacing: 0.1rem;

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.colors.yellow};
  }
`;

const bellRing = keyframes`
0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
`;

const pulse = keyframes`
 0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
                60% {
                  transform: scale(1.2);
                }
                70% {
                  transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
`;

export const Icon = styled.img`
  width: 1.5rem;
  cursor: pointer;
`;

export const IconBell = styled(Icon)`
  &:hover {
    animation: ${bellRing} 0.9s both;
  }
`;

export const IconHeart = styled(Icon)`
  &:hover {
    transform: scale(1);
    animation: ${pulse} 0.5s forwards 1 ;
  }
`;

export const Container = styled(Div)`
  gap: 2rem;
`;

export const Login = styled(Span)`
  border: 1px solid ${(props) => props.theme.colors.nude};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.yellow};
    transition: border 0.2s;
  }
`;

export const ContainerButtonsLogged = styled.div`
  display: flex;
  gap: 1rem;
`;
