import styled from "styled-components";

export const H1 = styled.h1`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  line-height: 1.2;
  color: ${(props) => (props.color ? props.color : "#000")};
`;

export const H1Bold = styled.h1`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  line-height: 1.2;
`;

export const H2 = styled.h1(`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 600;
  line-height: 1.2;
`);

export const H2Purple = styled.h2`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  line-height: 1.57;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  color: #3e41a5;
`;

export const PBold = styled.p`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 2.5;
  color: #6c737f;
  margin-bottom: 10px;
  text-transform: ${(props) => (props.tt ? props.tt : "uppercase")};
  text-align: center;
`;

export const H3Bold = styled.h3`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  line-height: 1.2;
`;

export const P = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.57;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
`;

export const H1Span = styled.span`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  line-height: 1.2;
  color: ${(props) => (props.color ? props.color : "#fff")};
`;

export const H3Span = styled.span`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 400;
  line-height: 1.2;
  border: 1px solid;
  padding: 1rem;
  margin-right: 1rem;
  color: ${(props) => (props.color ? props.color : "#fff")};
`;
