import styled from "styled-components";

export const Background = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  position: absolute;
  width: 100vw;
  height: 40vh;
  z-index: 2;

  @media only screen and (max-width: 700px){
    height: 30vh;
  }
`;

export const Container = styled.section`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.snow};
  font-family: 'Poppins', sans-serif;

  @media only screen and (max-width: 700px){
    flex-direction: column;
    width: 100%;
    padding: 2rem;   
  }
`;

export const Content = styled.div`
  width: 40rem;
  margin-left: 5rem;
  z-index: 999999 !important;

  @media only screen and (max-width: 700px){
    width: 100%;
    margin-left: 0;
    z-index: 2 !important;
  }
  
`;

export const Image = styled.img`
  width: 15rem;
  height: 25rem;
  z-index: 99999;
  border-radius: 8px;

  @media only screen and (max-width: 700px){
    display: none;
  }
`;

export const Title = styled.h2`
    color: ${props => props.theme.colors.nude};
`;

export const Text = styled.span`
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
`;
