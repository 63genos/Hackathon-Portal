import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use React Router's navigate hook
import { AdminLoadingPortal } from './loadingPortal';
import { useAdminAuth } from '../hooks/useAdminAuth'; // Adjust this import based on your project structure
import NotRegisteredModal from './notRegistered';
import styles from './home.module.css'; // Adjust import path for CSS
import Navbar from './Navbar';
import { Text } from '@chakra-ui/react';

const AdminProtectedRoute = (WrappedComponent: React.ComponentType) => {
    const Wrapper: React.FC = (props) => {
        const { isSessionExists, isAuthenticated, loading } = useAdminAuth();
        const [isModalVisible, setModalVisible] = useState(false);
        const navigate = useNavigate(); // React Router's equivalent for navigation

        useEffect(() => {
            if (!loading && !isSessionExists) {
                navigate('/login', { state: { redirectTo: window.location.pathname } });
            }
        }, [loading, isSessionExists, navigate]);

        if (loading) {
            return <AdminLoadingPortal />;
        }

        const onClose = async () => {
            // signOut logic if required
            setModalVisible(false);
            navigate('/'); // Navigate to the homepage
        };

        return (
            <>
                {isAuthenticated ? (
                    <WrappedComponent {...props} />
                ) : isSessionExists ? (
                    <NotAdminModal isVisible={true} onClose={onClose} />
                ) : null}
            </>
        );
    };

    return Wrapper;
};

interface NotAdminModalProps {
    isVisible: boolean;
    onClose: () => void;
}

function NotAdminModal({ isVisible, onClose }: NotAdminModalProps) {
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
                    <Text
                        color="white"
                        fontWeight="normal"
                        fontSize="1.25rem">
                        {"You are not an Admin. If you are, then please contact us at "}
                        <a style={{ color: '#007BFF', textDecoration: 'none' }}
                            href="mailto:ecell@iith.ac.in">ecell@iith.ac.in</a>
                    </Text>
                }
            />
        </div>
    );
}

export default AdminProtectedRoute;
