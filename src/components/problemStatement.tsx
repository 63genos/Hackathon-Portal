import React from 'react';
import renderProblemData from './renderProblemData';
import { Flex, Spinner, Text } from '@chakra-ui/react';

type JSONData = {
    [key: string]: string | string[];
};

interface Props {
    isLoading: boolean;
    jsonData: JSONData | null; // Allow null to handle cases where data might not be available
}

const ProblemStatementComponent: React.FC<Props> = ({ isLoading, jsonData }) => {
    return (
        <div>
            {isLoading ? (
                <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                    <Spinner size="xl" />
                </Flex>
            ) : jsonData ? (
                renderProblemData(jsonData)
            ) : (
                <Text color="white">Error fetching data (or no data available)</Text>
            )}
        </div>
    );
};

export default ProblemStatementComponent;
