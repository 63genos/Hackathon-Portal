import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import ProtectedRoute from "./components/protectedRoutes";
import CustomHead from "./components/customHead";
import ProblemStatementComponent from "./components/problemStatement";
import SubmitAnswer from "./components/submitAnswer";
import axios from "axios";
import DashboardLayout from "./components/DashboardLayout";
import RoundSelector from "./components/roundHeading";
import Navbar from "./components/Navbar";
import CustomModal from "./components/customModal";
import { useNavigate } from "react-router-dom";
import styles from './styles/home.module.css';

// Replace with actual backend URL
const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface QuestionData {
    problem: string;
    current_round: number;
    last_submission: number | null;
}

interface CustomApiError extends Error {
    status?: number;
    data?: any;
}

function Portal() {
    const [jsonData, setJsonData] = useState<QuestionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeRound, setActiveRound] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const getData = async () => {
        setIsLoading(true);
        try {
            const resp = await axios.get(`${backendUrl}/question`);
            if (resp.status === 418) {
                setModalMessage(resp.data.msg);
                setShowModal(true);
            }
            setJsonData(resp.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            if ((error as CustomApiError)?.status === 418) {
                setModalMessage((error as CustomApiError).data.msg);
                setShowModal(true);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (showModal && !isLoading) {
        return (
            <div className={styles.home}>
                <Navbar />
                <CustomModal
                    title="Cannot Access!"
                    isOpen={true}
                    onClose={() => navigate('/')}
                    description={modalMessage}
                />
            </div>
        );
    }

    return (
        <Box>
            <CustomHead
                title="Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI"
                description="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon."
            />
            <DashboardLayout>
                {isLoading ? (
                    <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                        <Spinner size="xl" />
                    </Flex>
                ) : (
                    <Flex direction="column" w="100%" h="100vh" pb={{ base: "80px", md: "0" }}>
                        <RoundSelector activeRound={jsonData?.current_round || 1} onRoundChange={setActiveRound} />

                        <Box flex="1" w="100%" bgColor="#0B0E29" overflow="auto">
                            <Flex align="center" justifyContent="center">
                                <Box w="85%">
                                    <ProblemStatementComponent
                                        isLoading={isLoading}
                                        jsonData={jsonData ? JSON.parse(jsonData.problem) : null}
                                    />
                                </Box>
                            </Flex>
                        </Box>
                        <Flex
                            pt={3}
                            bgColor="#0B0E29"
                            align="center"
                            justifyContent="center"
                            position={{ base: "fixed", md: "relative" }}
                            bottom={{ base: 0, md: "auto" }}
                            width="100%"
                            zIndex={5}
                        >
                            <Box w="95%">
                                <SubmitAnswer last_submission={jsonData?.last_submission ?? 0} current_round={jsonData?.current_round ?? 1} />
                            </Box>
                        </Flex>
                    </Flex>
                )}
            </DashboardLayout>
        </Box>
    );
}

export default ProtectedRoute(Portal);
