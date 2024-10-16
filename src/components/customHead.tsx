import React from 'react';
import { Helmet } from 'react-helmet';

interface CustomHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title || 'Hackathon | E-Cell IIT Hyderabad - NPCI'}</title>
            <meta 
                name="description" 
                content={description || 'Join the hackathon conducted by E-Cell IIT Hyderabad and NPCI. Showcase your skills and get chance to win exciting prizes'} 
            />
            <meta 
                name="keywords" 
                content={keywords || 'Hackathon IITH, Hackathon Ecell, IIT Hyderabad, E-Cell, NPCI Hackathon, NPCI , coding, competition, contest'} 
            />
            <meta name="author" content='Web Team E-Cell' />
        </Helmet>
    );
};

export default CustomHead;
