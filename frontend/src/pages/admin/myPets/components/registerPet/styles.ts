import styled from "styled-components";

export const Container = styled.section`
  width: 100vw;
  height: auto;
  font-family: "Poppins", sans-serif;
  background-size: contain;
  background-color: ${(props) => props.theme.colors.snow};
`;

export const ContainerRegister = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

export const H3 = styled.h3`
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.brown};
  font-size: 1.6rem;
  font-weight: 700;
`;

export const ContentRegister = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;

  width: 100vw;
  gap: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  align-items: center;
  
`;

export const ContainerForm = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;

export const ContainerIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
`;

export const ContentIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 8px;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 3.8rem;
`;

export const IconText = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.brown};
  text-align: center;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
`;

export const DualInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 15rem;
`;

export const ContainerRadio = styled.div`
  display: flex;
  gap: 1rem;
`;

export const InputFile = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray};
  display: flex;
`;

export const Image = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  object-position: top;
  border-radius: 100%;
  cursor: pointer;
`;

export const DefaultImage = styled.img`
  width: 90%;
`;

export const ContainerImage = styled.div`
  border: 2px solid #e4e4e7;
  border-radius: 100%;
  background-color: #e9e9e9;
  padding: 1.5rem;
  height: 7rem;
  width: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Error = styled.span`
  color: red;
  font-size: small;
`;




