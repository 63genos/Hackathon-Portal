import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AdminLoadingPortal } from './loadingPortal';
import { useAdminAuth } from '../hooks/useAdminAuth';
import NotRegisteredModal from './notRegistered';
import styles from '@/styles/home.module.css';
import Navbar from './Navbar';
import { Text } from '@chakra-ui/react';

interface AdminProtectedRouteProps {
    WrappedComponent: React.ComponentType<any>;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ WrappedComponent }) => {
    const { isSessionExists, isAuthenticated, loading } = useAdminAuth();
    const [isModalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isSessionExists) {
            router.push({
                pathname: '/login',
                query: { redirectTo: router.asPath },
            });
        }
    }, [loading, isSessionExists, router]);

    const onClose = () => {
        setModalVisible(false);
        router.replace("/");
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
