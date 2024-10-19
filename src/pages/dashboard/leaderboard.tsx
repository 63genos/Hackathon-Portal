import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import ProtectedRoute from '../../components/protectedRoutes';
import DashboardLayout from '../../components/DashboardLayout';
import Table from '../../components/Table';
import LeaderboardTable from '../../components/Table';
import axios from 'axios';

// Replace this with actual backend URL
const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface CustomHeadProps {
    title: string;
    description: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
};

type Team = {
    rank: number;
    name: string;
    currentRound: number;
};

const demo: Team[] = [
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
];

const LeaderboardPage: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);
        try {
            const resp = await axios.get(`${backendUrl}/leaderboard`);
            const data: Team[] = resp.data as Team[];
            setTeams(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <CustomHead title='Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <DashboardLayout>
                {isLoading ? (
                    <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                        <Spinner size="xl" />
                    </Flex>
                ) : (
                    <>
                        <Heading fontSize={{ base: "1.5rem", lg: "2rem" }} color="white" textAlign="center" fontWeight="semibold" mt={{ base: "70px", lg: "36px" }} mb={{ base: "0px", lg: "36px" }}>
                            LEADERBOARD
                        </Heading>
                        <LeaderboardTable teams={teams} />
                    </>
                )}
            </DashboardLayout>
        </div>
    );
};

export default ProtectedRoute(LeaderboardPage);
