import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLoadingPortal } from './loadingPortal'; // Assuming this is a loading spinner component
import { useAdminAuth } from '../hooks/useAdminAuth'; // Adjust this based on your custom hook
import NotRegisteredModal from './notRegistered'; // Assuming this is your modal component
import styles from './home.module.css'; // Adjust this path to where your CSS file is located
import Navbar from './Navbar'; // Assuming Navbar is a component in your project
import { Text } from '@chakra-ui/react'; // Chakra UI is fine for both Next.js and React

interface AdminProtectedRouteProps {
    WrappedComponent: React.ComponentType<any>;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ WrappedComponent }) => {
    const { isSessionExists, isAuthenticated, loading } = useAdminAuth(); // Adjust based on how you're handling auth
    const [isModalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isSessionExists) {
            // Redirect to login if session doesn't exist
            navigate('/login', { state: { redirectTo: window.location.pathname } });
        }
    }, [loading, isSessionExists, navigate]);

    const onClose = () => {
        setModalVisible(false);
        navigate('/');
    };

    if (loading) {
        return <AdminLoadingPortal />; // Show loading state while auth status is being checked
    }

    return (
        <>
            {isAuthenticated ? (
                <WrappedComponent />
            ) : isSessionExists ? (
                <NotAdminModal isVisible={true} onClose={onClose} />
            ) : null}
        </>
    );
};

interface NotAdminModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const NotAdminModal: React.FC<NotAdminModalProps> = ({ isVisible, onClose }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className={styles.home}>
            <Navbar />
            <NotRegisteredModal
                button='CLOSE'
                isOpen={true}
                onClose={onClose}
                description={
                    <Text color="white" fontWeight="normal" fontSize="1.25rem">
                        {"You are not an Admin. If you are, then please contact us at "}
                        <a style={{ color: '#007BFF', textDecoration: 'none' }} href="mailto:ecell@iith.ac.in">
                            ecell@iith.ac.in
                        </a>
                    </Text>
                }
            />
        </div>
    );
};

export default AdminProtectedRoute;
