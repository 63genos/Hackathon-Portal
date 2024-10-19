import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getUserStatus = async (): Promise<number> => {
    try {
        const response = await axios.get(`${backendUrl}/exists`);
        if (response.status === 200) {
            return response.data.isAdmin ? 1 : 2;
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
    return 0; // Return 0 if there is an error or no admin status
}

export const getSessionUser = async (): Promise<any | null> => {
    try {
        const response = await axios.get(`${backendUrl}/session-info`);
        console.log(response.data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
    return null; // Return null if there is an error or no session user
}
