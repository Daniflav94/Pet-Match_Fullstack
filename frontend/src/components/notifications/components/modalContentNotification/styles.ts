import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.snow};
  width: 40rem;
  height: fit-content;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  --tw-translate-x: -50%;
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-radius: 8px;
  gap: 0.5rem;
`;

export const IconClose = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.brown};
  text-align: center;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.blue};
  text-align: center;
  margin-bottom: 1rem;
`;

export const NamePet = styled.span`
  text-align: center;
  color: ${(props) => props.theme.colors.gray};
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 1rem;
`;

export const PetImage = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
  transform: translate3d(0, 0, 1px);
  -webkit-box-shadow: 0px 0px 8px 0px rgba(84, 84, 84, 0.4);
  -moz-box-shadow: 0px 0px 8px 0px rgba(84, 84, 84, 0.4);
  box-shadow: 0px 0px 8px 0px rgba(84, 84, 84, 0.4);
  margin: 0 auto;
`;

export const DataPet = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataUser = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.gray};
  gap: 0.3rem;
  align-items: center;
`;

export const DualInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
`;

export const ContentOrganization = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const ContainerDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NameOrganization = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.yellow};
  text-align: center;
  margin-bottom: 1rem;
`;

export const Description = styled.span`
  color: ${(props) => props.theme.colors.gray};
  font-size: 0.9rem;
`;

export const ContainerImage = styled.div`
  background-color: ${(props) => props.theme.colors.yellow};
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const Image = styled.img`
  width: 8rem;
  border-radius: 50%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

export const Icon = styled.img`
  width: 2.5rem;
  position: absolute;
`;

export const Button = styled.span`
  background-color: ${props => props.theme.colors.yellow};
  color: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #e5ac58;
  }
`;