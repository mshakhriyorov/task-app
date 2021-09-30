import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    .header, body, .content, h1, input, button, main, .ant-layout, ul{
        background : ${({theme}) => theme.body} !important;
        color: ${({theme}) => theme.text} !important;
        transition: 0.7s;
    }

    .ant-layout-sider {
        background : ${({theme}) => theme.body} !important;
        color: ${({theme}) => theme.text} !important;
        transition: 0.7s;
        border-right: 1px solid ${({theme}) => theme.text} !important;
    }

`;

export const lightTheme = {
    body: "#f3f5f0",
    text: "#161b22",
}

export const darkTheme = {
    text: "#f3f5f0",
    body: "#161b22",
}
