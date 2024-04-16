import styled from "styled-components";

export const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  padding-top: 10rem;
  font-family: "Poppins", sans-serif;
  background-size: contain;
  background-color: ${(props) => props.theme.colors.nude2};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.gray};
  position: relative;

  @media only screen and (max-width: 700px){
    padding-top: 7rem;
  }
`;

export const Text = styled.span`
  font-size: 1rem;
  text-align: center;
  font-weight: 400;
  width: 40rem;

  @media only screen and (max-width: 700px){
    width: 85%;
  }
`;

export const Image = styled.img`
  width: 30rem;
  margin-top: 2rem;
  position: absolute;
  bottom: 0;
`;

export const ContainerCards = styled.section`
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 3rem;

  @media only screen and (max-width: 700px){
    gap: 1rem;
    margin: 2rem 1rem;
  }
`;
