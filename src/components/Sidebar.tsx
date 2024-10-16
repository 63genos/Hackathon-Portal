import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box, Flex, Image, Text, VStack, Divider, useDisclosure, Drawer, DrawerBody,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useMediaQuery,
} from '@chakra-ui/react';
import SignOutModal from './signOutModal';
import { signOut } from 'supertokens-auth-react/recipe/thirdparty';

const Sidebar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 992px)");
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  const confirmSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  const SidebarContent = () => (
    <Flex flexDirection="column" h="full">
      <Flex align="center" mb="24px" justifyContent="center">
        <Image src="https://res.cloudinary.com/dqyxqfvnv/image/upload/v1720208328/joint-icon_lsgi3s.png" alt="E-Cell IIT Hyderabad" h="40px" />
      </Flex>

      <Divider borderColor="white" />

      <VStack mt="24px" align="start" spacing={4} w="240px" flex="1">
        {[
          { href: '/dashboard/portal', label: 'Portal', icon: <PortalIcon /> },
          { href: '/dashboard/myteam', label: 'My Team', icon: <MyTeamIcon /> },
          // Add more links as needed
        ].map(({ href, label, icon }) => (
          <Link key={href} href={href} passHref>
            <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px"
              bg={activePath === href ? '#3A3154' : 'transparent'}>
              {icon}
              <Text ml={4}>{label}</Text>
            </Box>
          </Link>
        ))}
      </VStack>
    </Flex>
  );

  return (
    <>
      <Flex display={{ base: 'none', md: 'flex' }} bg="#2D2D2D" w="240px" p={4}>
        <SidebarContent />
      </Flex>
      
      {/* Mobile Drawer */}
      <Drawer isOpen={!isLargerThan768 && isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>E-Cell IIT Hyderabad</DrawerHeader>
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
      {/* Sign Out Modal */}
      <SignOutModal isVisible={isModalVisible} onConfirm={confirmSignOut} onCancel={() => setModalVisible(false)} />
    </>
  );
};

const PortalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* SVG Path */}
  </svg>
);

const MyTeamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* SVG Path */}
  </svg>
);

export default Sidebar;
