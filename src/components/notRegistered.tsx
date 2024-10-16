import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    Center,
} from '@chakra-ui/react';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    description: React.ReactNode; // Allow any valid React node as description
    button: string; // Button text
}

const NotRegisteredModal: React.FC<CustomModalProps> = ({ isOpen, onClose, description, button }) => {
    return (
        <Center>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="#101232" borderRadius="md">
                    <ModalBody textAlign="center" mt={4}>
                        {description}
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <Button
                            color="white"
                            borderRadius={8}
                            fontWeight="500"
                            fontSize="1.25rem"
                            w="200px"
                            h="48px"
                            backgroundColor="#5134A4"
                            colorScheme="purple"
                            onClick={onClose}
                        >
                            {button}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
};

export default NotRegisteredModal;
