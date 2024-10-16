import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Flex, Image, Text, VStack, Divider, useDisclosure, Drawer, DrawerBody,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useMediaQuery,
} from '@chakra-ui/react';
import SignOutModal from './SignOutModal'; // Assuming you have this component
import { signOut } from 'supertokens-auth-react/recipe/thirdparty'; // Keep this if using supertokens

interface SidebarLink {
  href: string;
  label: string;
  icon: JSX.Element;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate instead of history
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 992px)");
  const [activePath, setActivePath] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const confirmSignOut = async () => {
    await signOut();
    navigate('/'); // Use navigate here
  };

  const SidebarContent: React.FC = () => (
    <Flex flexDirection="column" h="full">
      <Flex align="center" mb="24px" justifyContent="center">
        <Image src="https://res.cloudinary.com/dqyxqfvnv/image/upload/v1720208328/joint-icon_lsgi3s.png" alt="E-Cell IIT Hyderabad" h="40px" />
      </Flex>

      <Divider borderColor="white" />

      <VStack mt="24px" align="start" spacing={4} w="240px" flex="1">
        {[
          { href: '/dashboard/portal', label: 'Portal', icon: <PortalIcon /> },
          { href: '/dashboard/myteam', label: 'My Team', icon: <MyTeamIcon /> },
        ].map(({ href, label, icon }: SidebarLink) => (
          <Link key={href} to={href} style={{ width: '100%', textDecoration: 'none' }}>
            <Box display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px"
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
      {/* Sidebar for larger screens */}
      <Flex display={{ base: 'none', md: 'flex' }} bg="#2D2D2D" w="240px" p={4}>
        <SidebarContent />
      </Flex>
      
      {/* Mobile Drawer */}
      {!isLargerThan768 && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>E-Cell IIT Hyderabad</DrawerHeader>
            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
      
      {/* Sign Out Modal */}
      <SignOutModal isVisible={isModalVisible} onConfirm={confirmSignOut} onCancel={() => setModalVisible(false)} />
    </>
  );
};

const PortalIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* SVG Path */}
  </svg>
);

const MyTeamIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* SVG Path */}
  </svg>
);

export default Sidebar;
