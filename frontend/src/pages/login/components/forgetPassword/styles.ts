import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 4rem;
  background-color: ${(props) => props.theme.colors.snow};
  position: relative;
  gap: 2rem;

  @media only screen and (max-width: 700px) {
    padding: 0;
  }
`;

export const ButtonArrow = styled.button`
  width: 2.5rem;
  position: absolute;
  top: 3rem;
  left: 3rem;

  @media only screen and (max-width: 700px) {
    top: 1rem;
    left: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.blue};
  font-family: "Poppins", sans-serif;
  margin-top: 4rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 2rem;
  width: 100%;

`;

export const Text = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.gray};
  font-family: "Poppins", sans-serif;

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 35rem;
  gap: 0.8rem;
  height: fit-content;

  @media only screen and (max-width: 700px) {
    padding: 1rem;
  }
`;

export const Error = styled.span`
    color: red;
    font-size: 0.8rem;
    text-align: start;
    width: 100%;
`;

