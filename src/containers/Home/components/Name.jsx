import styled, { keyframes } from "styled-components";

const flicker = keyframes`
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 1;
    transform: none;
  }

  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0;
    transform: translate3d(0, -1px, 0);
  }
`;

export const MovingNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
`;

export const MovingName = styled.h1`
  display: inline-block;
  position: relative;
  padding: 20px 0;
  font-size: min(max(22px, 4vw), 42px);
  text-align: center;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  animation: ${flicker} 3s ease-in-out infinite;
`;
