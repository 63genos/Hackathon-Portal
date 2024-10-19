import React, { useEffect, useState } from 'react';
import { Box, Flex, Link, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Image, useMediaQuery } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PrimaryButton from './buttons';
import Session from 'supertokens-auth-react/recipe/session';
import SignOutModal from './signOutModal';
import { signOut } from 'supertokens-auth-react/recipe/thirdparty';
import { useNavigate } from 'react-router-dom';
import AboutPage from '../pages/about';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionButton, setSessionButton] = useState<string>('Sign In');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLargerThan1310] = useMediaQuery("(min-width: 1310px)");
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const checkSession = async () => {
    if (await Session.doesSessionExist()) {
      setSessionButton('Sign Out');
      setIsLoading(false);
    } else {
      setSessionButton('Sign In');
      setIsLoading(false);
    }
  };

  const sessionButtonClicked = async () => {
    if (await Session.doesSessionExist()) {
      setModalVisible(true);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const confirmSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <>
      <SignOutModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmSignOut}
        title="Are you sure you want to sign out?"
      />
      <Box position="fixed" top="0" left="0" right="0" zIndex="1000" bg="#08091C" h={{ base: '64px', lg: '94px' }} color="#F3F3F3">
        <Flex alignItems="center" justifyContent="space-between" h="100%" px={{ base: '20px', lg: '80px' }}>
          <Image _hover={{ cursor: 'pointer' }} onClick={() => { navigate('/'); }} src="https://res.cloudinary.com/dqyxqfvnv/image/upload/v1720208901/logo_iz4r4y.png" alt="Logo" h="42px" />

          <Flex display={isLargerThan1310 ? 'flex' : 'none'} alignItems="center" fontWeight="normal" color="white" fontSize="1rem" fontFamily="Montserrat, sans-serif">
            <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/" mx="20px" w="53px" textAlign="center">Home</Link>
            <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/dashboard" mx="20px" w="99px" textAlign="center">Dashboard</Link>
            <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/about" mx="20px" w="158px" textAlign="center">About Hackathon</Link>
            <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/register" mx="20px" w="77px" textAlign="center">Register</Link>
            <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/faqs" mx="20px" w="52px" textAlign="center">FAQs</Link>
            <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="https://ecell.iith.ac.in" target="_blank" mx="20px" w="130px" textAlign="center">E-Cell Website</Link>
            <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="https://www.npci.org.in/" target="_blank" mx="20px" w="122px" textAlign="center">NPCI Website</Link>
            <Box ml="20px">
              <PrimaryButton
                isLoading={isLoading}
                onClick={sessionButtonClicked}
                h="40px"
                w="104px"
                fontSize="1rem"
                fontWeight="600"
                text={sessionButton}
                fontWeightH="600"
              />
            </Box>
          </Flex>

          <IconButton
            display={isLargerThan1310 ? 'none' : 'flex'}
            aria-label="Open Menu"
            icon={<HamburgerIcon boxSize={8} />}
            onClick={handleMenuClick}
            color="white"
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            size="lg"
          />
        </Flex>

        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent bg="#08091C" color="white">
              <DrawerHeader borderBottomWidth="1px">
                <Flex justifyContent="space-between" alignItems="center">
                  <Image src="https://res.cloudinary.com/dqyxqfvnv/image/upload/v1720208901/logo_iz4r4y.png" alt="Logo" h="42px" />
                  <IconButton
                    aria-label="Close Menu"
                    icon={<CloseIcon />}
                    onClick={onClose}
                    color="white"
                    bg="transparent"
                    _hover={{ bg: 'transparent' }}
                  />
                </Flex>
              </DrawerHeader>
              <DrawerBody>
                <Flex direction="column" alignItems="center" fontWeight="normal" fontSize="1rem" fontFamily="Montserrat, sans-serif">
                  <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/" mb="20px" textAlign="center">Home</Link>
                  <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/dashboard" mb="20px" textAlign="center">Dashboard</Link>
                  <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/about" mb="20px" textAlign="center">About Hackathon</Link>
                  <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/register" mb="20px" textAlign="center">Register</Link>
                  <Link _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} href="/faqs" mb="20px" textAlign="center">FAQs</Link>
                  <Link href="https://ecell.iith.ac.in" target="_blank" mb="20px" textAlign="center">E-Cell Website</Link>
                  <Link href="https://www.npci.org.in/" target="_blank" mb="20px" textAlign="center">NPCI Website</Link>
                  <PrimaryButton
                    isLoading={isLoading}
                    onClick={sessionButtonClicked}
                    h="40px"
                    w="104px"
                    fontSize="1rem"
                    fontWeight="600"
                    text={sessionButton}
                    fontWeightH="600"
                  />
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
