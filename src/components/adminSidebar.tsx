import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box, Flex, Image, Text, VStack, Divider, IconButton, useDisclosure,
    Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, useMediaQuery, Button
} from '@chakra-ui/react';
import SignOutModal from './signOutModal'; // Adjust this path to your project structure
import { signOut } from 'supertokens-auth-react/recipe/thirdparty'; // Assuming you're still using Supertokens

const AdminSideBar: React.FC = () => {
    const navigate = useNavigate(); // React-router-dom's useNavigate replaces Next.js useRouter
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargerThan768] = useMediaQuery("(min-width: 992px)");
    const [activePath, setActivePath] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // Set activePath based on current location (equivalent to router.pathname)
        setActivePath(window.location.pathname);
    }, [window.location.pathname]);

    const confirmSignOut = async () => {
        await signOut();
        navigate('/'); // Navigate back to home after sign-out
    };

    return (
        <Flex>
            {isLargerThan768 ? (
                <Flex flexDirection="column" h="full" w="240px">
                    <Flex align="center" mb="24px" justifyContent="center">
                        <Image src="https://res.cloudinary.com/dqyxqfvnv/image/upload/v1720208328/joint-icon_lsgi3s" alt="E-Cell IIT Hyderabad" h="40px" />
                    </Flex>
                    <Divider borderColor="white" />
                    <VStack mt="24px" align="start" spacing={4} flex="1">
                        {/* Sidebar Links */}
                        <Link to="/admin/responses">
                            <Box as="div" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px" bg={activePath === '/admin/responses' ? '#3A3154' : 'transparent'}>
                                <Box maxW="24px">{/* SVG icon */}</Box>
                                <Text ml={4}>Responses</Text>
                            </Box>
                        </Link>
                        {/* Add more links similarly */}
                        
                        <Button onClick={onOpen} mt="24px">Sign Out</Button>
                    </VStack>
                </Flex>
            ) : (
                <IconButton onClick={onOpen} aria-label="Open Sidebar" />
            )}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Your Menu</DrawerHeader>
                        <DrawerBody>
                            {/* Similar links go here */}
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
            <SignOutModal isVisible={isModalVisible} onConfirm={confirmSignOut} onClose={() => setModalVisible(false)} />
        </Flex>
    );
};

export default AdminSideBar;
