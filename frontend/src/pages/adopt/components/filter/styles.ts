import styled from "styled-components";

export const ContainerSearch = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.snow};
  gap: 1rem;

  @media only screen and (max-width: 700px){
   flex-direction: column;
   
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  gap: 2rem;

  @media only screen and (max-width: 700px){
   flex-direction: column;
   gap: 1rem;
   
  }
`;


export const H3 = styled.h3`
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.brown};
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ContentIcon = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
`;

export const ContainerIcons = styled.div`
  display: flex;
  gap: 0.8rem;

  @media only screen and (max-width: 700px){
   width: 100%;
   align-items: center;
   justify-content: center;
  }
`;

export const Icon = styled.img`
  width: 4rem;
`;

export const IconText = styled.span`
  font-size: small;
  color: ${(props) => props.theme.colors.brown};
  text-align: center;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
`;

export const ContainerSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;


`;

export const ContentSelect = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TitleSelect = styled.span`
  color: ${(props) => props.theme.colors.brown};
  font-size: 0.9rem;
  font-weight: 600;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const ClearButton = styled.span`
  font-size: 0.8rem;
  text-decoration: underline;
  color: ${(props) => props.theme.colors.brown};
  cursor: pointer;
`;
