import styled from "styled-components";

export const H1 = styled.h1`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: ${(props) => (props.color ? props.color : "var(--foreground)")};
`;

export const H1Bold = styled.h1`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: var(--foreground);
`;

export const H2 = styled.h2`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.3px;
  color: var(--foreground);
`;

export const H2Purple = styled.h2`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.3px;
  color: var(--primary);
`;

export const H3Bold = styled.h3`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.4;
  color: var(--foreground);
  text-align: ${(props) => (props.align ? props.align : "left")};
`;

export const PBold = styled.p`
  font-size: ${(props) => (props.size ? props.size : "11px")};
  font-weight: 600;
  letter-spacing: 0.6px;
  line-height: ${(props) => (props.height ? props.height : "1.5")};
  color: var(--muted-foreground);
  margin-bottom: ${(props) => (props.mb ? props.mb : "6px")};
  text-transform: ${(props) => (props.tt ? props.tt : "uppercase")};
  text-align: ${(props) => (props.align ? props.align : "center")};
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  width: 100%;
  word-break: ${(props) => (props.wordBreak ? props.wordBreak : "normal")};
`;

export const P = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 400;
  line-height: 1.6;
  color: var(--foreground);
  text-align: ${(props) => (props.align ? props.align : "left")};
  text-transform: ${(props) => (props.tt ? props.tt : "none")};
  width: 100%;
  font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  word-break: ${(props) => (props.wordBreak ? props.wordBreak : "normal")};
`;

export const H1Span = styled.span`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 700;
  line-height: 1.2;
  color: ${(props) => (props.color ? props.color : "var(--primary-foreground)")};
`;

export const H3Span = styled.span`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 400;
  line-height: 1.2;
  border: ${(props) => (props.border ? props.border : "1px solid var(--border)")};
  padding: 1rem;
  margin-right: 1rem;
  color: ${(props) => (props.color ? props.color : "var(--foreground)")};
`;

export const PText = styled.span`
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  font-weight: ${(props) => (props.weight ? props.weight : 400)};
  line-height: ${(props) => (props.height ? props.height : 1.5)};
  text-align: ${(props) => (props.align ? props.align : "left")};
  text-transform: ${(props) => (props.tt ? props.tt : "none")};
  background: ${(props) => (props.bg ? props.bg : "unset")};
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  border-radius: ${(props) => (props.br ? props.br : "0px")};
  color: ${(props) => (props.color ? props.color : "var(--foreground)")};
  font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
`;
