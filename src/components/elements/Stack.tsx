import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  direction?: 'vertical' | 'horizontal';
  children?: React.ReactNode;
};

export function Stack({ children, direction = 'vertical' }: Props) {
  return <StyledStack direction={direction}>{children}</StyledStack>;
}

export const StyledStack = styled.div<Record<'direction', 'vertical' | 'horizontal'>>`
  width: 100%;
  display: flex;
  ${({ direction }) =>
    direction === 'vertical' &&
    css({
      flexDirection: 'column',
    })}

  ${({ direction }) =>
    direction === 'horizontal' &&
    css({
      flexDirection: 'row',
    })}
`;
