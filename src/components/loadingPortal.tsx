import React from "react";
import Sidebar from "./Sidebar";
import CustomHead from "./customHead"; // Ensure the naming is consistent with your file structure
import AdminSideBar from "./adminSidebar"; // Ensure the naming is consistent with your file structure

// LoadingPortal Component
const LoadingPortal: React.FC = () => {
    return (
        <div>
            <CustomHead 
                title='Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI' 
                description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' 
            />
            <Sidebar />
        </div>
    );
};

// AdminLoadingPortal Component
const AdminLoadingPortal: React.FC = () => {
    return (
        <div>
            <CustomHead 
                title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' 
                description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' 
            />
            <AdminSideBar />
        </div>
    );
};

export default LoadingPortal;
export { AdminLoadingPortal };
