import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import { Box, HStack, Text, FormControl, FormLabel, Flex, FormErrorMessage, FormHelperText, Spacer, Menu, Wrap, WrapItem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, MenuButton, MenuList, IconButton, MenuItem, Input } from '@chakra-ui/react'
import { HamburgerIcon, AddIcon, DeleteIcon, CloseIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import axios from 'axios';

const groupPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [groupData, setGroupData] = useState(null);
    const [name, setName] = useState(null);
    const [isError, setError] = useState(false);
    const {isOpen, onOpen, onClose } = useDisclosure();
    const handleInputChange = (e) => setName(e.target.value);

    const validateName = () =>{
      if(name === null || !/[a-zA-Z]/.test(name)){
        setError(true);
        return false;
      }
      setError(false);
      return true;
    };

    const deleteGroup = async () => {
      axios.delete(`/api/group/${id}/`)
      .then(function (response) {
        console.log(response);
        router.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    const fetchGroup = async () => {
        const res = await axios.get(`/api/group/${id}/`);
        setGroupData(res.data);
        console.log(res.data);
    };

    const penaltyUpdate = async (key, amount) => {
        axios.post(`/api/group/${id}/penalty`, {
            memberID: key,
            amount: amount
          })
          .then(function (response) {
            console.log(response);
            fetchGroup();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const removeMember = async (key) => {
      axios.delete(`/api/group/member`, {data: {
          memberID: key,
          groupID: id
        }})
        .then(function (response) {
          console.log(response);
          fetchGroup();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

    const newMember = async () => {
      axios.post(`/api/group/member`, {
          groupId: id,
          name: name
        })
        .then(function (response) {
          console.log(response);
          fetchGroup();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(() => {
        if (router.isReady) {
            fetchGroup();
        }
    }, [router.isReady]);

    return !(groupData && router.isReady) ? (
        "loading"
      ) : (
    <>
        <Box p={3} bgGradient='linear(to-r, #2b92ba, #033f57)'>
        <Flex>
        <Text fontSize="xl" color={"white"}>{groupData.groupName}</Text>
        <Spacer />
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                color={'white'}
            />
            <MenuList>
                <MenuItem onClick={onOpen} icon={<AddIcon />}>
                Add member
                </MenuItem>
                <MenuItem onClick={deleteGroup} icon={<DeleteIcon />}>
                Delete group
                </MenuItem>
            </MenuList>
        </Menu>
        </Flex>
        </Box>

        <Wrap spacing='30px' m={5} justify='center'>
        {groupData.memberData.map(member => 
        <WrapItem>
        <Box _hover={{ borderColor: "teal.600" }} borderWidth='1px' borderRadius='lg'  minHeight={150}>
        <CloseIcon w={3} h={3} ml={2} _hover={{ color: "teal.600" }} onClick={() => removeMember(member.id)} />
        <Box minWidth={300} p={5} align={'center'}>
        <Text fontSize="xl">{member.name}</Text>
        
        <HStack justify={'center'} pt={3}>
        <ChevronDownIcon w={7} h={7} _hover={{ color: "teal.600" }} onClick={() => penaltyUpdate(member.id, -1)}/>
        <Text pl={3} pr={3} fontSize="2xl">{member.amount * groupData.penaltySize}</Text>
        <ChevronUpIcon w={7} h={7} _hover={{ color: "teal.600" }} onClick={() => penaltyUpdate(member.id, 1)}/>
        </HStack>
        </Box>
        </Box>
        </WrapItem>
        )}

        <WrapItem >
        <Box _hover={{ borderColor: "teal.600" }} onClick={onOpen} minWidth={300} minHeight={150} p={5} borderWidth='1px' borderRadius='lg' align={'center'}>
        <Text pt={7} fontSize="xl">Add member</Text>
        <AddIcon/>
        </Box>
        </WrapItem>
       </Wrap>

       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isInvalid={isError}>
            <FormLabel>Name</FormLabel>
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
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>Close</Button>
            <Button type="submit" colorScheme='blue' onClick={() => {if(validateName()){newMember(); onClose(); setName(null);}}}>Add</Button>       
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
};

export default groupPage;