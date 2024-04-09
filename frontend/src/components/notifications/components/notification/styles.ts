import styled from "styled-components";

export const Container = styled.div`
  margin-top: 1rem;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 1rem;
`;

export const ContentNotification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const Img = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  transform: translate3d(0, 0, 1px);
  object-position: top;
  margin-right: 1rem;
`;

export const Title = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.blue};
`;

export const Date = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.gray2};
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  max-width: 60%;
  margin-right: 1rem;
`;

export const Description = styled.span`
  font-size: 0.8rem;
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.gray};
`;

export const Success = styled.span`
  font-size: 0.8rem;
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.green};
  font-weight: 600;
  margin: 0.3rem 0;
`;

export const Denied = styled(Success)`
  color: ${(props) => props.theme.colors.red};
`;

export const Button = styled.span`
  font-size: 0.8rem;
  font-family: "Poppins", sans-serif;
  border: 1px solid;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  color: ${(props) => props.theme.colors.yellow};
  width: 13rem;
  margin-top: 0.5rem;
  padding: 0.3rem 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;
