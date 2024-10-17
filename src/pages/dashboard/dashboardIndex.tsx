import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Flex, Spinner } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import CustomModal from './components/customModal';
import ProtectedRoute from './components/protectedRoutes';
import Session from 'supertokens-auth-react/recipe/session';
import styles from './styles/home.module.css';

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

const Dashboard: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cantAccess, setCantAccess] = useState(true);

    const fetchDate = async () => {
        try {
            const response = await axios.get(`${backendUrl}/date`);
            const targetDate = new Date(response.data).getTime();
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                setCantAccess(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDate();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const status = await Session.doesSessionExist();
            if (status) {
                if (!loading) {
                    if (!cantAccess) {
                        history.replace('/dashboard/portal');
                    }
                }
            } else {
                history.push('/login');
            }
        };
        checkAuth();
    }, [loading, cantAccess, history]);

    if (loading) {
        return (
            <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (cantAccess) {
        return (
            <div className={styles.home}>
                <Navbar />
                <CustomModal title="Cannot Access!" isOpen={true} onClose={() => history.replace('/')} description="Cannot access the dashboard right now, wait till the hackathon starts." />
            </div>
        );
    }

    return (
        <>
            <CustomHead title="Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI" description="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon." />
        </>
    );
};

export default ProtectedRoute(Dashboard);
