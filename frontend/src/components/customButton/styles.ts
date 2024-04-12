import styled from "styled-components";

type Props = {
    $border?: string;
    $backgroundColor?: string;
    $color?: string;
    $hoverBackgroundColor?: string
    $fontSize?: string;
    $width?: string;
}

export const Button = styled.button<Props>`
  background-color: ${(props) => props.$backgroundColor};
  padding: 0.6rem 2rem;
  border: ${(props) => props.$border || "none"};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.$color|| 'white'};
  font-size: ${(props) => props.$fontSize|| '0.9rem'};
  min-width: 10rem;
  width: ${(props) => props.$width};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.$hoverBackgroundColor || 'transparent'};;
  }
`;