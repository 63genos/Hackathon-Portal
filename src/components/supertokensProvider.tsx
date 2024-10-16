import React, { useEffect } from 'react';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import SuperTokensReact from 'supertokens-auth-react';
import { frontendConfig, setRouter } from '../config/supertoken';

if (typeof window !== 'undefined') {
    // Initialize SuperTokens only on the client-side
    SuperTokensReact.init(frontendConfig());
}

export const SuperTokensProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    useEffect(() => {
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
    }, []);

    return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};
