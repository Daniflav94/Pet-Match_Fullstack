import styled from "styled-components";


export const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  padding: 5rem 0;
  font-family: "Poppins", sans-serif;
  background-size: contain;
  background-color: ${(props) => props.theme.colors.nude2};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;


export const ContainerCards = styled.section`
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 5rem 3rem;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 2rem;
  margin-bottom: 1rem;
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 0.9rem;
  margin-top: 4rem;
  gap: 1rem;
`;
