import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingPortal from './loadingPortal';
import NotRegisteredModal from './notRegistered';
import { Text } from '@chakra-ui/react';

type WrappedComponentProps = {
    // Define any props that the wrapped component might accept
};

const ProtectedRoute = (WrappedComponent: React.ComponentType<WrappedComponentProps>) => {
    const Wrapper: React.FC = (props) => {
        const { isSessionExists, isAuthenticated, loading } = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (!loading && !isSessionExists) {
                navigate('/login', { state: { redirectTo: window.location.pathname } });
            }
        }, [loading, isSessionExists, navigate]);

        if (loading) {
            return <LoadingPortal />;
        }

        const onClose = async () => {
            // Perform any cleanup or sign-out logic if needed
            navigate("/register");
        };

        return (
            <>
                {isAuthenticated ? (
                    <WrappedComponent {...(props as WrappedComponentProps)} />
                ) : isSessionExists ? (
                    <NotRegisteredModal
                        button="Register"
                        isOpen={true}
                        onClose={onClose}
                        description={
                            <Text color="white" fontWeight="normal" fontSize="1.25rem">
                                You are not in any registered team. Please register your team first.
                            </Text>
                        }
                    />
                ) : null}
            </>
        );
    };

    return Wrapper;
};

export default ProtectedRoute;
