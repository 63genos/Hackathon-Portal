import React from 'react';
import { Flex, Image, Stack, Box, useMediaQuery } from '@chakra-ui/react';

interface RoundSelectorProps {
    activeRound: number;
    onRoundChange: (round: number) => void;
}

const RoundSelector: React.FC<RoundSelectorProps> = ({ activeRound, onRoundChange }) => {
    const [isLargerThanBase] = useMediaQuery("(min-width: 800px)");

    const handleRoundChange = (round: number) => {
        if (activeRound !== round) {
            onRoundChange(round);
        }
    };

    return (
        <Box mb="12px" h="110px">
            <Flex height="100%" justify="center" align={{ base: "end", md: "center" }}>
                {isLargerThanBase ? (
                    <Stack direction='row' spacing={{ base: "30px", md: "50px", lg: "100px", xl: "160px", "2xl": "220px" }}>
                        {[1, 2, 3].map(round => (
                            <Image
                                key={round}
                                onClick={() => handleRoundChange(round)}
                                _hover={{ cursor: activeRound === round ? "pointer" : "not-allowed" }}
                                mt={activeRound === round ? "10px" : "0px"}
                                src={activeRound === round ? `/rounds/r${round}-active.svg` : `/rounds/r${round}.svg`}
                                alt={`Round ${round} ${activeRound === round ? 'active' : 'inactive'}`}
                            />
                        ))}
                    </Stack>
                ) : (
                    <Box>
                        {activeRound === 1 && (
                            <svg width="123" height="52" viewBox="0 0 123 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58172 0 0 3.58173 0 8.00001V35.46C0 39.8783 3.58172 43.46 8 43.46H55.0083C55.0139 43.4688 55.0196 43.4775 55.0254 43.4863L59.8313 50.7698C60.6218 51.9678 62.3795 51.9678 63.17 50.7698L67.9759 43.4863C67.9817 43.4775 67.9873 43.4688 67.993 43.46H115C119.418 43.46 123 39.8783 123 35.46V8C123 3.58172 119.418 0 115 0H8Z" fill="#5134A4" />
                                {/* Add the rest of the SVG path here */}
                            </svg>
                        )}
                        {activeRound === 2 && (
                            <svg width="123" height="52" viewBox="0 0 123 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* SVG paths for round 2 */}
                            </svg>
                        )}
                        {activeRound === 3 && (
                            <svg width="123" height="52" viewBox="0 0 123 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* SVG paths for round 3 */}
                            </svg>
                        )}
                    </Box>
                )}
            </Flex>
        </Box>
    );
};

export default RoundSelector;
