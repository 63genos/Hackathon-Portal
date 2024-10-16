import React from 'react';
import { Button } from '@chakra-ui/react';

type ButtonProps = {
    w: string;
    h: string;
    text: string;
    onClick: () => void;
    fontWeight: string;
    fontSize?: string;
    fontWeightH: string;
    isLoading: boolean;
    isDisabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({ 
    fontWeight, 
    w, 
    h, 
    text, 
    onClick, 
    fontSize, 
    fontWeightH, 
    isLoading, 
    isDisabled 
}) => {
    return (
        <Button
            background="#5134A4"
            colorScheme="purple"
            fontWeight={fontWeight}
            fontSize={fontSize}
            fontFamily="Montserrat, sans-serif"
            h={h}
            w={w}
            onClick={onClick}
            color="#FFFFFF"
            borderRadius={8}
            _hover={{
                color: "#06081A",
                backgroundColor: "#F3F3F3",
                fontWeight: fontWeightH,
            }}
            isLoading={isLoading}
            isDisabled={isDisabled}
        >
            {text}
        </Button>
    );
}

const SecondaryButton: React.FC<ButtonProps> = ({ 
    fontWeight, 
    w, 
    h, 
    text, 
    onClick, 
    fontSize, 
    fontWeightH, 
    isLoading 
}) => {
    return (
        <Button
            color="#F3F3F3"
            variant="outline"
            borderRadius={8}
            h={h}
            w={w}
            fontWeight={fontWeight}
            fontSize={fontSize}
            colorScheme="whiteAlpha"
            onClick={onClick}
            _hover={{
                backgroundColor: "#1D1E37",
                borderColor: "#707392",
                fontWeight: fontWeightH,
            }}
        >
            {text}
        </Button>
    );
}

export default PrimaryButton;
export { SecondaryButton };
