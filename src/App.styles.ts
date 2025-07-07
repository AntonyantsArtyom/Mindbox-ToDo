import { Typography } from "antd";
import styled from "styled-components";

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
