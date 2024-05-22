import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.brown};
  font-family: "Poppins", sans-serif;
  margin-top: 8rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 35rem;
  gap: 0.8rem;
  height: fit-content;
  overflow-y: auto;
  padding: 2rem;

  @media only screen and (max-width: 700px) {
    padding: 1rem;
  }
`;

export const DualInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 0.7rem;
`;

export const InputFile = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: gray;
  border: 2px solid #e4e4e7;
  border-radius: 12px;
  padding: 0.6rem;
  width: 100%;
  display: flex;
  justify-content: space-around;

  &:hover {
    border: 2px solid ${(props) => props.theme.colors.gray2};
    transition: border 0.3s;
  }
`;

export const ContentInputFile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  gap: 1rem;
  font-size: 0.8rem;
`;

export const ButtonImage = styled.span`
  width: 50%;
  background-color: ${(props) => props.theme.colors.yellow};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  font-size: 0.8rem;
`;

export const Image = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  object-position: top;
  border-radius: 100%;
`;

export const DefaultImage = styled.img`
  width: 100%;
   object-fit: cover;
  object-position: top;
  border-radius: 100%;
`;

export const ContainerImage = styled.div`
  border: 2px solid #e4e4e7;
  border-radius: 100%;
  background-color: #e9e9e9;
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

`;