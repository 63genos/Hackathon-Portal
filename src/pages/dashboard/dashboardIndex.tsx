import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replaced useHistory with useNavigate
import axios from 'axios';
import { Flex, Spinner } from '@chakra-ui/react';

import CustomModal from '../../components/customModal';
import ProtectedRoute from '../../components/protectedRoutes';
import Session from 'supertokens-auth-react/recipe/session';
import { Helmet } from 'react-helmet'; // To handle meta information
import styles from './styles/home.module.css';
import Navbar from '../../components/Navbar';

// Define the backend URL as an environment variable
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Props for CustomHead component
interface CustomHeadProps {
    title: string;
    description: string;
}

// CustomHead component using Helmet for handling title and description
const CustomHead: React.FC<CustomHeadProps> = ({ title, description }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
);

// Dashboard component
const Dashboard: React.FC = () => {
    const navigate = useNavigate(); // useNavigate instead of useHistory
    const [loading, setLoading] = useState(true);
    const [cantAccess, setCantAccess] = useState(true);

    // Fetch date from backend
    const fetchDate = async () => {
        try {
            const response = await axios.get(`${backendUrl}/date`);
            const targetDate = new Date(response.data).getTime();
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                setCantAccess(false); // User can access dashboard
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Loading is complete
        }
    };

    useEffect(() => {
        fetchDate();
    }, []);

    // Check if the user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            const status = await Session.doesSessionExist();
            if (status) {
                if (!loading) {
                    if (!cantAccess) {
                        navigate('/dashboard/portal'); // Redirect to the portal if the user can access it
                    }
                }
            } else {
                navigate('/login'); // Redirect to login if the session does not exist
            }
        };
        checkAuth();
    }, [loading, cantAccess, navigate]);

    // Display loading spinner while fetching data
    if (loading) {
        return (
            <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    // Show modal if the user cannot access the dashboard
    if (cantAccess) {
        return (
            <div className={styles.home}>
                <Navbar />
                <CustomModal
                    title="Cannot Access!"
                    isOpen={true}
                    onClose={() => navigate('/')} // Redirect to home
                    description="Cannot access the dashboard right now, wait till the hackathon starts."
                />
            </div>
        );
    }

    // Render the dashboard with the custom title and description
    return (
        <>
            <CustomHead
                title="Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI"
                description="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon."
            />
            {/* Add other dashboard components here */}
        </>
    );
};

// Protect the Dashboard route with ProtectedRoute
export default ProtectedRoute(Dashboard);
