import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepNumber,
  StepSeparator,
  useSteps,
  StepIcon,
  InputGroup,
  Stack,
  Flex,
  Text,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  useMediaQuery,
} from '@chakra-ui/react';
import axios from 'axios';
import CustomModal from './customModal'; // Adjust path as needed

const steps = [
  { title: 'First', description: 'Email Verification' },
  { title: 'Second', description: 'Team Info' },
  { title: 'Third', description: 'Members Info' },
];

interface RegistrationFormProps {
  email: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ email }) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [leaderEmail, setLeaderEmail] = useState<string>('');
  const [leaderName, setLeaderName] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [teamNameError, setTeamNameError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isButtonLoading, setisButtonLoading] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeaderName(e.target.value);
    if (e.target.value.trim() !== '') {
      setNameError('');
    }
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTeamName(e.target.value);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const handleFirstNext = () => {
    if (leaderEmail.trim() !== '' && leaderName.trim() !== '') {
      handleNext();
    } else {
      if (leaderName.trim() === '') {
        setNameError('Please enter your name');
      } else {
        window.location.href = '/login';
      }
    }
  };

  const handleSecondNext = async () => {
    setisButtonLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validteam`,
        { team_name: teamName }
      );
      if (response.status === 200) {
        if (response.data.valid) {
          setTeamNameError('');
          handleNext();
        } else {
          setTeamNameError(
            'This name has already been taken, please consider a different team name.'
          );
        }
      }
    } catch (error) {
      setTeamNameError(
        'This name has already been taken, please consider a different team name.'
      );
    } finally {
      setisButtonLoading(false);
    }
  };

  const checkSession = async () => {
    if (email.length === 0) {
      setShowModal(true);
    } else {
      setLeaderEmail(email);
    }
  };

  useEffect(() => {
    checkSession();
  }, [leaderEmail]);

  const onClose = async () => {
    setShowModal(false);
    window.location.href = '/';
  };

  const [isLargerThan1010] = useMediaQuery('(min-width: 1010px)');

  return (
    <Box color="black" justifyContent="center" maxWidth="1000px" mx="auto" py={6}>
      <CustomModal
        isOpen={showModal}
        title="You are not eligible!"
        description="You are not eligible to participate in this hackathon. This hackathon is only for 3rd and 4th year B.tech students."
        onClose={onClose}
      />
      <Flex justifyContent="center">
        <Stepper
          alignContent="center"
          w="80%"
          className="Stepper"
          index={activeStep}
          size="lg"
          colorScheme="purple"
          orientation="horizontal"
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator
                color="black"
                sx={{
                  '[data-status=complete] &': {
                    background: '#5134A4',
                    borderColor: 'white',
                  },
                  '[data-status=active] &': {
                    background: 'white',
                    borderColor: 'white',
                  },
                  '[data-status=incomplete] &': {
                    borderColor: 'white',
                    background: 'transparent',
                  },
                }}
              >
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={
                    <Text
                      color="white"
                      fontSize="20px"
                      fontWeight="600"
                      fontFamily="Montserrat, sans-serif"
                    >
                      {index + 1}
                    </Text>
                  }
                  active={
                    <Text
                      fontSize="20px"
                      fontWeight="600"
                      fontFamily="Montserrat, sans-serif"
                    >
                      {index + 1}
                    </Text>
                  }
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle className="StepTitle">
                  {isLargerThan1010 ? (
                    <Text fontSize="1.25rem">{step.description}</Text>
                  ) : index === 0 ? (
                    <Text fontSize="0.75rem">Email<br />Verification</Text>
                  ) : index === 1 ? (
                    <Text fontSize="0.75rem">Team<br />Info</Text>
                  ) : (
                    <Text fontSize="0.75rem">Members<br />Info</Text>
                  )}
                </StepTitle>
              </Box>
              {activeStep > index && <StepSeparator />}
            </Step>
          ))}
        </Stepper>
      </Flex>

      <Flex justifyContent="center">
        <Box alignContent="center" mt={6}>
          {/* Your steps logic here */}
        </Box>
      </Flex>
    </Box>
  );
};

export default RegistrationForm;
