import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.snow};
`;

export const ContainerImage = styled.div`
  min-width: 40rem;
  height: 100vh;
  overflow: hidden;

  @media only screen and (max-width: 700px){
    display: none;
  }
 
`;

export const ContainerForm = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 700px){
    width: 100%;
  }
`;

export const ContainerLogin = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 6rem;

  @media only screen and (max-width: 700px){
    padding: 0 2rem;
  }
`;

export const Image = styled.img`
  width: 100%;
   object-fit: cover;
`;

export const ContainerLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

export const Logo = styled.img`
  width: 5rem;
`;

export const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.blue};
`;

export const Text = styled.span`
    font-family: "Poppins", sans-serif;
    margin-bottom: 2rem;
    font-size: 1.2rem;
    text-align: center;
    color: ${(props) => props.theme.colors.gray};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 30rem;
  gap: 1rem;

`;

export const TextSignUp = styled.span`
    font-family: "Poppins", sans-serif;
    font-size: 0.8rem;
`;

export const ButtonSignUp = styled.button`
    color:  ${props => props.theme.colors.yellow};
    font-weight: 600;
`;

export const ForgetPassword = styled.button`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 0.7rem;
    text-align: start;
    width: 100%;
    color: ${props => props.theme.colors.gray};

    &:hover {
      color: ${props => props.theme.colors.gray2};
    }
`;
