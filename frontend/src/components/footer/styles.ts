import styled from "styled-components";

export const Footer = styled.footer`
  height: 10rem;
  width: 100%;
  background-color: ${props => props.theme.colors.coffee};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const Img = styled.img`
  width: 3rem;
`;

export const LogoText = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.nude};
`;

export const Text = styled.span`
  color: ${props => props.theme.colors.nude2};
  font-size: 0.9rem;
`;

export const Link = styled.span`
  color: ${props => props.theme.colors.yellow};
  font-style: italic;
  text-decoration: underline
`;
