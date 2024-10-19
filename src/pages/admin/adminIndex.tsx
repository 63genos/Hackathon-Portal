import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import AdminSideBar from '../../components/adminSidebar';
import { useNavigate } from 'react-router-dom';
import Session from 'supertokens-auth-react/recipe/session';
import AdminProtectedRoute from '../../components/adminProtectedRoute';

//problem with sidebar
interface CustomHeadProps {
    title: string;
    description: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({ title, description }) => {
    useEffect(() => {
        document.title = title;
        
    }, [title]);

    return null;
};

const AdminPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            const status = await Session.doesSessionExist();
            if (status) {
                navigate('/admin/responses');
            } else {
                navigate('/login');
            }
        }
        checkAuth();
    }, [navigate]);

    return (
        <div className="dashboardBG">
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Admin Portal of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <Flex height="100vh">
                <AdminSideBar />
            </Flex>
        </div>
    );
};

export default AdminProtectedRoute(AdminPage);
