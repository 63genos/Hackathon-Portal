import React, { useEffect } from 'react';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import SuperTokensReact from 'supertokens-auth-react';
import { frontendConfig, setRouter } from '../config/supertoken';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

if (typeof window !== 'undefined') {
    // Initialize SuperTokens only on the client-side
    // You will modify this later to use navigate
}

export const SuperTokensProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const navigate = useNavigate(); // Get navigate function from useNavigate

    useEffect(() => {
        // Pass navigate to frontendConfig
        SuperTokensReact.init(frontendConfig(navigate)); // Pass navigate as parameter

        const currentPath = window.location.pathname;
        // Here, you can set the router with the current path
        setRouter({
            // Example router methods you may need to implement
            push: (path: string) => {
                window.history.pushState({}, '', path);
                // Optionally trigger any state change if required
            },
            replace: (path: string) => {
                window.history.replaceState({}, '', path);
                // Optionally trigger any state change if required
            },
            pathname: currentPath,
        });
    }, [navigate]); // Add navigate to the dependency array

    return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};
