import React, { useEffect, useState } from 'react';
import { Image, Flex, Heading, Text, HStack, VStack, Spinner, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Countdown from '../components/countdownComponent';
import styles from '../styles/home.module.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Home: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [countdownEnded, setCountdownEnded] = useState<boolean>(false);
    const [targetDate, setTargetDate] = useState<number | null>(null);

    const headingFontSize = useBreakpointValue({ base: "1.75rem", md: "3.3rem" });
    const textFontSize = useBreakpointValue({ base: "1rem", md: "1.5rem" });
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    const fetchDate = async () => {
        try {
            const response = await axios.get(`${backendUrl}/date`);
            const date = new Date(response.data).getTime();
            const now = Date.now();
            const distance = date - now;

            if (distance <= 0) {
                setCountdownEnded(true);
            }

            setTargetDate(date);
        } catch (error) {
            console.error('Error fetching date:', error);
        } finally {
            setLoading(true);
        }
    };

    useEffect(() => {
        fetchDate();
    }, []);

    const AfterCountDownEnds = () => (
        <main className={styles.maincontent}>
            <HStack>
                {isLargerThan768 && <IconComponent />}
                <VStack mx="24px">
                    {!isLargerThan768 && <IconComponent width={150} height={84} />}
                    <Heading mt={isLargerThan768 ? '0' : '32px'} fontSize={{ base: "2rem", md: "3rem" }} fontWeight='bold'>WAIT IS OVER!</Heading>
                    <Text fontSize={{ base: "1.3rem", md: "1.5rem" }} mt={{ base: "4px", md: "12px" }}>Hackathon has already started</Text>
                </VStack>
                {isLargerThan768 && <IconComponent />}
            </HStack>
        </main>
    );

    if (loading) {
        return (
            <>
                <Navbar />
                <Flex direction="column" align="center" justify="center" height="calc(100vh - 94px)" textAlign="center">
                    <Spinner size="xl" />
                </Flex>
            </>
        );
    }

    
    if (!targetDate) {
        return (
            <>
                <Navbar />
                <Flex direction="column" align="center" justify="center" height="calc(100vh - 94px)" textAlign="center">
                    <Spinner size="xl" />
                    <Text mt="4">Fetching event details...</Text>
                </Flex>
            </>
        );
    }

    return (
        <>
        
        <Navbar />
            {countdownEnded ? <AfterCountDownEnds /> : <Countdown targetDate={targetDate} />}
        
            
        </>
    );
};

interface IconComponentProps {
    width?: number;
    height?: number;
}

const IconComponent: React.FC<IconComponentProps> = ({ width = 82, height = 79 }) => (
    <svg width={width} height={height} viewBox="0 0 82 79" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.0796 9.9741L50.0691 9.96209L50.0579 9.95077L44.3128 4.15182L47.7222 0.710425L53.4514 6.49317C55.3901 8.67566 56.3249 11.0936 56.3249 13.6472C56.3249 16.1989 55.3915 18.5786 53.4518 20.7623L40.0056 34.2596L36.8701 30.8415L50.0579 17.3052C50.0584 17.3048 50.0588 17.3043 50.0592 17.3039C50.4826 16.8764 50.855 16.4698 51.1041 15.8956C51.3524 15.3231 51.4596 14.6301 51.4596 13.6472C51.4596 12.2571 50.9965 11.0257 50.0796 9.9741ZM31.129 13.7182L31.1215 13.7106L31.1136 13.7033L29.1696 11.9019L32.5639 8.47588L34.3305 10.2591C36.2747 12.485 37.2436 14.8665 37.2436 17.4915C37.2436 20.0008 36.2751 22.3461 34.325 24.5381C34.3244 24.5388 34.3238 24.5394 34.3232 24.5401L32.5484 26.4914L29.1696 23.0811L31.1136 21.2796L31.1215 21.2724L31.129 21.2648C32.0786 20.3063 32.5307 19.016 32.5307 17.4915C32.5307 15.9669 32.0786 14.6767 31.129 13.7182ZM44.3261 38.6209L65.3974 17..." />
    </svg>
);

export default Home;
