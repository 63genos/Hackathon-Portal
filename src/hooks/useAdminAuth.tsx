import { useEffect, useState } from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import axios from 'axios';

// Ensure you have your environment variables set up properly in React
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const useAdminAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSessionExists, setIsSessionExists] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const sessionExists = await Session.doesSessionExist();
                setIsSessionExists(sessionExists);
                if (sessionExists) {
                    const response = await axios.get(`${backendUrl}/exists`);
                    if (response.status === 200) {
                        if (response.data.isAdmin) {
                            setIsAuthenticated(true);
                        }
                    }
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    return { isSessionExists, isAuthenticated, loading };
};
