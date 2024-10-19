import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLoadingPortal } from './loadingPortal'; 
import { useAdminAuth } from '../hooks/useAdminAuth'; 
import NotRegisteredModal from './notRegistered'; 
import styles from './home.module.css'; 
import Navbar from './Navbar'; 
import { Text } from '@chakra-ui/react'; 

interface AdminProtectedRouteProps {
    WrappedComponent: React.ComponentType<any>;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ WrappedComponent }) => {
    const { isSessionExists, isAuthenticated, loading } = useAdminAuth(); 
    const [isModalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isSessionExists) {
           
            navigate('/login', { state: { redirectTo: window.location.pathname } });
        }
    }, [loading, isSessionExists, navigate]);

    const onClose = () => {
        setModalVisible(false);
        navigate('/');
    };

    if (loading) {
        return <AdminLoadingPortal />; 
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
