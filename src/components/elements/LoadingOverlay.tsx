import React from 'react';
import styled from 'styled-components';
import { RotatingSquare } from 'react-loader-spinner';

type Props = {
  active: boolean;
  text?: string;
};

export function LoadingOverlay({ active, text }: Props) {
  if (!active) return null;

  return (
    <LoadingOverlayStyled>
      <RotatingSquare color="black"/>
      {text}
    </LoadingOverlayStyled>
  );
}

export const LoadingOverlayStyled = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;  
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;
