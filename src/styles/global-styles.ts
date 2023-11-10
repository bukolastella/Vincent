import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }


  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    scroll-behavior: smooth;
  }

  a {
      text-decoration: none;
  }

  a {
      text-decoration: none;
  }

  ul {
      list-style: none;
  }

   button{
    border: none;
    cursor: pointer;
    background-color: transparent;
   }

`;
