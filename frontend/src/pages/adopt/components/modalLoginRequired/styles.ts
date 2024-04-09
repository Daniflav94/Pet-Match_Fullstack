import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.snow};
  width: 35rem;
  max-height: 93vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 50%; 
  top: 50%; 
  --tw-translate-x: -50%;
  --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-radius: 8px;
  gap: 1rem;
  overflow-y: auto;
`;

export const IconClose = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.brown};
  text-align: center;
`;

export const Gif = styled.img`
  width: 17rem;
`;

export const Subtitle = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.theme.colors.gray};
  width: 80%;
`;


export const Button = styled.span`
display: flex;
justify-content: center;
  border-radius: 8px;
  padding: 0.5rem 2rem;
  width: 18em;
  background-color: ${(props) => props.theme.colors.yellow};
  font-size: smaller;
  font-weight: 500;
  color: white;

  &:hover {
    background-color: #e5ac58;
  }
`;

