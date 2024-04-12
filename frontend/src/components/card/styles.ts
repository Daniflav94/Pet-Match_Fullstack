import styled from "styled-components";

export const ContainerCard = styled.div`
  width: 15rem;
  background-color: ${(props) => props.theme.colors.snow};
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  justify-content: space-between;
  position: relative;
  -webkit-box-shadow: 0px 0px 5px 3px rgba(224,215,208,1);
-moz-box-shadow: 0px 0px 5px 3px rgba(224,215,208,1);
box-shadow: 0px 0px 5px 3px rgba(224,215,208,1);

@media only screen and (max-width: 700px){
    width: 11.5rem;
  }
`;

export const ContentCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: start;
  margin: 0.6rem 1.5rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center top;
  margin-right: 0.4rem;
`;

export const Title = styled.span`
  text-align: center;
  font-weight: 500;
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

export const Icon = styled.img`
  width: 1.3rem;
  margin-right: 0.4rem;
`;

export const Text = styled.span`
  font-size: small;
  color: ${(props) => props.theme.colors.brown};
`;

export const ContainerItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerPersonality = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
  gap: 0.5rem;
`;

export const ItemPersonality = styled.div`
  text-align: center;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.colors.yellow};
  padding: 0.2rem 0.6rem;
  font-size: 0.65rem;
  color: ${(props) => props.theme.colors.brown};
`;

export const Button = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  background-color: ${(props) => props.theme.colors.yellow};
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: white;
  font-size: smaller;
  gap: 1rem;

  &:hover {
    background-color: #e5ac58;
  }
`;

export const ButtonDisabled = styled(Button)`
 opacity: 0.7;
 cursor: default;
`;

export const Button2 = styled.button`
  color: ${(props) => props.theme.colors.blue};
  font-family: "Poppins", sans-serif;
  text-decoration: underline;
  font-size: small;
`;

export const Lottie = styled.div`
  position: absolute;
  bottom: -1rem;
  left: 3rem;
  z-index: 9999999;
  width: 10rem;
  height: 10rem;
`;





