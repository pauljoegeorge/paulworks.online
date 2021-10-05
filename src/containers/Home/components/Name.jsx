import styled from 'styled-components';

export const MovingNameWrapper = styled.div`
  margin: 0;
  font-size: 4em;
  padding: 0;
  color: white;
  text-shadow: 0 0.1em 20px rgba(0, 0, 0, 1), 0.05em -0.03em 0 rgba(0, 0, 0, 1),
    0.05em 0.005em 0 rgba(0, 0, 0, 1), 0em 0.08em 0 rgba(0, 0, 0, 1),
    0.05em 0.08em 0 rgba(0, 0, 0, 1), 0px -0.03em 0 rgba(0, 0, 0, 1),
    -0.03em -0.03em 0 rgba(0, 0, 0, 1), -0.03em 0.08em 0 rgba(0, 0, 0, 1), -0.03em 0 0 rgba(0, 0, 0, 1);
  span {
    transform: scale(0.9);
    display: inline-block;
  }
  span:first-child {
    animation: bop 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite
      alternate;
  }
  span:nth-child(2) {
    animation: bop 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite
      alternate;
  }
  span:last-child {
    animation: bop 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite
      alternate;
  }
  }

  @keyframes bop {
  0% {
    transform: scale(0.9);
  }
  50%,
  100% {
    transform: scale(1);
  }
  }

  @keyframes bopB {
  0% {
    transform: scale(0.9);
  }
  80%,
  100% {
    transform: scale(1) rotateZ(-3deg);
  }
`;

export const MovingName = styled.span`
  padding-right: 10px;
`;
