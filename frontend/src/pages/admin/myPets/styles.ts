import styled from "styled-components";

export const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  font-family: "Poppins", sans-serif;
  background-size: contain;
  background-color: ${(props) => props.theme.colors.nude2};
`;

export const ContainerCards = styled.section`
  width: 90vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 4rem;
`;

export const ContainerDefaultValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  gap: 1rem;
`;

export const Image = styled.img`
  width: 17rem;
position: absolute;
bottom: 0;
`;

export const Text = styled.span`
  color: ${(props) => props.theme.colors.gray};
  font-size: 1.2rem;
  font-weight: 400;
  width: 70%;
  text-align: center;
`;
