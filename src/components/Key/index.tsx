import { Button, ButtonProps } from "@chakra-ui/react";
import React from 'react';
import { buttonVariantToColor } from "../../utils";

type Props = {
  children: string;
  variant?: string;
  onClick?: (value: string) => void;
}

const Key = ({ children, variant = 'primary', onClick, ...rest }: Props & Omit<ButtonProps, 'onClick'>) => {
  const { bgColor, hoverBgColor } = buttonVariantToColor[variant];

  return (
    <Button
      fontSize="18px"
      marginTop="16px"
      backgroundColor={bgColor}
      onClick={() => onClick && onClick(children)}
      _hover={{ backgroundColor: hoverBgColor }}
      _active={{ backgroundColor: bgColor }}
      {...rest}>
      {children}
    </Button>
  )
}

export default Key;