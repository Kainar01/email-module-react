import React from 'react';
import styled from 'styled-components';

type Props = {
  onSave: () => void;
};

export function EditorHeader({ onSave }: Props) {
  return (
    <StyledHeader>
      <StyledHeaderButton onClick={onSave}>Save</StyledHeaderButton>
    </StyledHeader>
  );
}

export const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledHeaderButton = styled.button`
  width: max-width;
  padding: 0.5rem 1rem;
`;
