import styled from "styled-components";

export const Background = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  position: absolute;
  width: 100vw;
  height: 40vh;
  z-index: 2;
`;

export const Container = styled.section`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.snow};
  font-family: 'Poppins', sans-serif;
`;

export const Content = styled.div`
  width: 40rem;
  margin-left: 5rem;
  z-index: 999999 !important;
  
`;

export const Image = styled.img`
  width: 15rem;
  height: 25rem;
  z-index: 99999;
  border-radius: 8px;
`;

export const Title = styled.h2`
    color: ${props => props.theme.colors.nude};
`;

export const Text = styled.span`
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
`;
