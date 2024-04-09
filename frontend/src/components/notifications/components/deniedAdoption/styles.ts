import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
`;

export const Image = styled.img`
  width: 8rem;
  position: absolute;
  top: 0rem;
  right: 1rem;
`;

export const Rounded = styled.div`
    background-color: #ECB159;
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    position: relative;
`;

export const Title = styled.h3`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.yellow};
  font-weight: 600;
  text-align: center;
`;

export const Description = styled.span`
    text-align: center;
    color: ${props=> props.theme.colors.gray};
    font-size: 0.9rem;
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

