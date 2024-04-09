import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.snow};
  width: 35rem;
  max-height: 93vh;
  padding: 2rem;
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
  overflow-y: auto;
`;

export const IconClose = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.brown};
  text-align: center;
`;

export const Subtitle = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray};
`;

export const NamePet = styled.span`
  text-align: center;
  color: ${(props) => props.theme.colors.yellow};
  font-size: medium;
  font-weight: 600;
`;

export const PetImage = styled.img`
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  object-position: top;
  transform: translate3d(0, 0, 1px);
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(84, 84, 84, 0.3);
  -moz-box-shadow: 0px 0px 8px 0px rgba(84, 84, 84, 0.3);
  box-shadow: 0px 0px 8px 0px rgba(84, 84, 84, 0.3);
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const DualInput = styled.div`
  display: flex;
  gap: 0.7rem;
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

export const ButtonSubmit = styled.button`
  background-color: ${(props) => props.theme.colors.yellow};
  border-radius: 8px;
  padding: 0.5rem 2rem;
  width: 18em;
  color: #ffff;
  font-size: smaller;
  font-weight: 500;

  &:hover {
    background-color: #e5ac58;
  }
`;

export const ButtonCancel = styled.span`
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.yellow};
  border-radius: 8px;
  padding: 0.5rem 2rem;
  width: 18em;
  color: ${(props) => props.theme.colors.yellow};
  font-size: smaller;
  font-weight: 500;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
`;
