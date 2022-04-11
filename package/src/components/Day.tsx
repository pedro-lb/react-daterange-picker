/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, IconButton, Typography, // eslint-disable-next-line no-unused-vars
} from '@mui/material';

const Root = styled(Box)<{
  leftBorderRadius?: boolean;
  rightBorderRadius?: boolean;
  highlighted?: boolean;
}>(({
  theme, leftBorderRadius, rightBorderRadius, highlighted,
}) => ({
  ...(leftBorderRadius && {
    borderRadius: '50% 0 0 50%',
  }),
  ...(rightBorderRadius && {
    borderRadius: '0 50% 50% 0',
  }),
  display: 'flex',
  ...(highlighted && {
    backgroundColor: theme.palette.action.hover,
  }),
}));

const StyledIconButton = styled(IconButton)<{
  outlined?: boolean;
  filled?: boolean;
}>(({ theme, outlined, filled }) => ({
  height: 36,
  width: 36,
  padding: 0,
  ...(outlined && {
    border: `1px solid ${theme.palette.primary.dark}`,
  }),
  ...(filled && {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    backgroundColor: theme.palette.primary.dark,
  }),
}));

const StyledTypography = styled(Typography)<{contrast?:boolean;}>(({ theme, contrast }) => ({
  lineHeight: 1.6,
  ...(contrast && {
    color: theme.palette.primary.contrastText,
  }),
}));

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}

const Day: React.FunctionComponent<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
}: DayProps) => (
  <Root
    leftBorderRadius={startOfRange}
    rightBorderRadius={endOfRange}
    highlighted={!disabled && highlighted}
  >
    <StyledIconButton
      outlined={!disabled && outlined}
      filled={!disabled && filled}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={onHover}
      size="large"
    >
      <StyledTypography
        color={!disabled ? 'textPrimary' : 'textSecondary'}
        contrast={!disabled && filled}
        variant="body2"
      >
        {value}
      </StyledTypography>
    </StyledIconButton>
  </Root>
);

export default Day;
