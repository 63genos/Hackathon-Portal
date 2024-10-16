import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    Box, Flex, Image, Text, VStack, Divider, IconButton, useDisclosure,
    Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, useMediaQuery, Button
} from '@chakra-ui/react';
import SignOutModal from './signOutModal'; // Assuming you have this component
import { signOut } from 'supertokens-auth-react/recipe/thirdparty';

const AdminSideBar = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargerThan768] = useMediaQuery("(min-width: 992px)");
    const [activePath, setActivePath] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setActivePath(router.pathname);
    }, [router.pathname]);

    const confirmSignOut = async () => {
        await signOut();
        router.replace('/');
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
                        <Link href="/admin/responses" passHref>
                            <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px" bg={activePath === '/admin/responses' ? '#3A3154' : 'transparent'}>
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
