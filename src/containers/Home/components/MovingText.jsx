import styled from 'styled-components';

export const MovingText = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  font-weight: 700;
  text-align: center;
  font-size: min(max(16px, 4vw), 32px);
  text-transform: none;
  background: linear-gradient(90deg, #000, #fff, #000);
  letter-spacing: 5px;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-repeat: no-repeat;
  background-size: 80%;
  animation: shine 5s linear infinite;
  position: relative;
  }

  @keyframes shine {
  0% {
    background-position-x: -500%;
  }
  100% {
    background-position-x: 500%;
  }
`;
