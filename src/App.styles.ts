import { Card, Typography } from "antd";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #000;
  }
`;

export const themeConfig = {
  token: {
    colorText: "#ffffff",
    colorTextPlaceholder: "#ffffff",
    colorBgContainer: "#19191b",
    colorPrimary: "#087829",
  },
};

export const ContainerStyled = styled.div`
  justify-items: center;
  display: grid;
  gap: 10px;
`;

export const TitleStyled = styled(Typography.Title)`
  && {
    padding: 0px;
    margin: 0px;
    font-weight: 300;
    font-size: 64px;
  }
`;

export const TextStyled = styled(Typography.Paragraph)`
  && {
    padding: 0px;
    margin: 0px;
    font-size: 12px;
  }
`;

export const CardStyled = styled(Card)`
  width: 360px;
`;
