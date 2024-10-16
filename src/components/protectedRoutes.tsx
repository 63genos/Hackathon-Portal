import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
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
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isSessionExists) {
                router.push({
                    pathname: '/login',
                    query: { redirectTo: router.asPath }
                });
            }
        }, [loading, isSessionExists, router]);

        if (loading) {
            return <LoadingPortal />;
        }

        const onClose = async () => {
            // Perform any cleanup or sign-out logic if needed
            router.replace("/register");
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
