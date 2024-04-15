import styled from "styled-components";

export const Container = styled.div`
  width: 400px;
  height: 100vh;
  overflow-y: hidden;
  background-color: ${(props) => props.theme.colors.snow};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999999;
  padding: 1rem 0 1rem 1rem;
  -webkit-box-shadow: -5px 2px 21px -6px rgba(0, 0, 0, 0.56);
  -moz-box-shadow: -5px 2px 21px -6px rgba(0, 0, 0, 0.56);
  box-shadow: -5px 2px 21px -6px rgba(0, 0, 0, 0.56);

`;

export const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.5rem;
  padding-right: 1rem;
`;

export const ContainerNotifications = styled.div`
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  padding: 0;
`;

export const Title = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.brown};
`;

export const ContainerDefault = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 8rem;
  height: 8rem;
`;

export const Span = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.colors.gray2};
  margin-top: 1rem;
`;
