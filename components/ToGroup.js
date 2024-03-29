import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Box,
  } from '@chakra-ui/react'
  import { ArrowForwardIcon } from '@chakra-ui/icons'
  import { Spinner } from '@chakra-ui/react'
  import { React, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

const toGroup = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const handleInputChange = (e) => setName(e.target.value);

    const validateName = () => {
        if(name === null || !/[a-zA-Z]/.test(name)){
          setError(true);
          return false;
        }
        setError(false);
        return true;
      };

    const createGroup = async () => {
      setLoading(true)
      axios.post(`/api/group/new`, {
        groupName: name,
      })
      .then(function (response) {
        console.log(response);
        router.push(`/group/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
      });
    }

    return (
        <>
        <Box background={'white'} _hover={{ borderColor: "teal.600" }} borderWidth='1px' borderRadius='lg'>
        <Box p={6} minWidth={400}  minHeight={200}>
        <FormControl isInvalid={isError}>
            <FormLabel>Group name</FormLabel>
            <Input
              id='name'
              type='name'
              value={name}
              onChange={handleInputChange}
            />
            {!isError ? (null) : (
              <FormErrorMessage>Please enter name</FormErrorMessage>
            )}
        </FormControl>
        {!isLoading ? (
          <Button mt={3} rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' onClick={() => {if(validateName()){createGroup();}}}>
          Go
          </Button>
        ) : (
          <Button mt={3} rightIcon={<Spinner />} colorScheme='teal' variant='outline'>
          Go
          </Button>
        )}
        </Box>
        </Box>
    </>
    );
}
export default toGroup;