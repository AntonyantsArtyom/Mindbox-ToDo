import { Card, Tabs, Typography } from "antd";
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
  width: 340px;
`;

export const TabsStyled = styled(Tabs)`
  .ant-tabs-nav-list {
    display: flex;
    width: 100%;
  }
  .ant-tabs-tab {
    flex: 1;
    justify-content: center;
  }
  .ant-tabs-nav::before {
    display: none;
  }
`;

export const TasksListStyled = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 350px;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #fff transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #fff;
  }
`;

export const TaskTextStyled = styled.span<{ checked: boolean }>`
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  opacity: ${(props) => (props.checked ? 0.5 : 1)};
`;

export const FooterStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SettingsAreaStyled = styled.div`
  width: 340px;
  margin: auto;
`;
