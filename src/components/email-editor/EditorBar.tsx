import React from 'react';
import styled from 'styled-components';

type Props = {
  onSave: VoidFunction;
  onSend: VoidFunction;
  isLoading?: boolean;
};

export const EditorBar = ({ onSave, onSend, isLoading = false }: Props) => {
  return (
    <StyledBar>
      <StyledBarButtonMenu>
        <StyledSaveButton onClick={onSave} disabled={isLoading}>Save Template</StyledSaveButton>
        <StyledBarButton onClick={onSend} disabled={isLoading}>Send Template</StyledBarButton>
      </StyledBarButtonMenu>
    </StyledBar>
  );
};

const StyledBar = styled.nav`
  width: 100%;
  height: 60px;
  background: white;
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  box-sizing: border-box;
`;

const StyledBarButtonMenu = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

const StyledBarButton = styled.button`
  color: #ffffff;
  background-color: #3aaee0;
  border-radius: 4px;
  line-height: 120%;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  padding: 10px 20px;
  width: auto;
  max-width: 100%;
  word-wrap: break-word;
  cursor: pointer;
  outline: 0;
  border: 0;

  &:disabled {
    opacity: 0.5;
  }
`;


const StyledSaveButton = styled(StyledBarButton)`
    background-color: #428bca;
`

const StyledSendButton = styled(StyledBarButton)`
    background-color: #5bc0de;
`