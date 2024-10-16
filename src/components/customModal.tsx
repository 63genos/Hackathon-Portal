import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Center,
  Text,
  ModalHeader
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean; // Determines if the modal is open
  onClose: () => void; // Function to close the modal
  title: string; // Title of the modal
  description: string; // Description of the modal content
  time?: number; // Optional timer in seconds for auto close
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, description, time }) => {
  useEffect(() => {
    // Automatically close the modal after 'time' seconds if it is open
    if (isOpen && time) {
      const timer = setTimeout(() => {
        onClose();
      }, time * 1000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount or when dependencies change
    }
  }, [isOpen, time, onClose]);

  if (!isOpen) return null; // If modal is not open, render nothing

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#101232" borderRadius="md">
          <ModalHeader textAlign="center" color="white" fontSize="2rem" fontWeight="medium">{title}</ModalHeader>
          <ModalBody textAlign="center" mt={2}>
            <Text color="white" fontWeight="normal" fontSize="1.25rem">{description}</Text>
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
              CLOSE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default CustomModal;
