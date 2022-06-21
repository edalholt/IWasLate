import { useRouter } from "next/router";
import { Image } from '@chakra-ui/react'
import { React, useEffect, useState } from "react";
import { Box, HStack, Text, FormControl, Progress, FormLabel, Flex, FormErrorMessage, Alert, AlertIcon, AlertTitle, Spacer, Menu, Wrap, WrapItem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, MenuButton, MenuList, IconButton, MenuItem, Input } from '@chakra-ui/react'
import { SettingsIcon, HamburgerIcon, AddIcon, DeleteIcon, CloseIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import UrlBox from "../../components/URL";

const groupPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [groupData, setGroupData] = useState(null);
    const [name, setName] = useState(null);
    const [penaltySize, setPenaltySize] = useState();
    const [isError, setError] = useState(false);
    const {isOpen, onOpen, onClose } = useDisclosure();
    const {isOpen: isOpenPenalty, onOpen: onOpenPenalty, onClose: onClosePenalty } = useDisclosure();
    const handleInputChange = (e) => setName(e.target.value);
    const handlePenaltyChange = (e) => setPenaltySize(e.target.value);

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
        axios.get(`/api/group/${id}/`)
        .then(function (response) {
          setGroupData(response.data);
        });
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
    const groupUpdate = async (data) => {
      axios.put(`/api/group/${id}/`, data)
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

    useEffect(() => {
      if(groupData){
        setPenaltySize(groupData.penaltySize);
      }
  }, [groupData]);

    return !(groupData && router.isReady) ? (
      <Progress size='lg' isIndeterminate />
      ): !(groupData.groupName) ? (
        <Alert
          status='error'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='100vh'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Invalid group URL
          </AlertTitle>
        </Alert>
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
                {groupData.icon ? (
                <MenuItem onClick={() => groupUpdate({icon: false })} icon={<AttachMoneyIcon fontSize="small" sx={{ m: -0.3, marginTop: 0.2 }}/>}>
                Cash mode
                </MenuItem>
                ) : (
                <MenuItem onClick={() => groupUpdate({icon: true })} icon={<Image src="/beer.png" width={4}/>}>
                Beer mode
                </MenuItem>
                )}
                <MenuItem onClick={onOpenPenalty} icon={<SettingsIcon />}>
                Change penalty size
                </MenuItem>
                <MenuItem onClick={deleteGroup} icon={<DeleteIcon />}>
                Delete group
                </MenuItem>
            </MenuList>
        </Menu>
        </Flex>
        </Box>

        <Flex direction={'column'} minHeight={'90vh'}>
        <Wrap spacing='70px' m={5} justify='center'>
        {groupData.memberData.map(member => 
        <WrapItem>
        <Box _hover={{ borderColor: "teal.600" }} borderWidth='1px' borderRadius='lg'  minHeight={150}>
        <CloseIcon w={3} h={3} ml={2} _hover={{ color: "teal.600" }} onClick={() => removeMember(member.id)} />
        <Box minWidth={300} p={5} align={'center'}>
        <Text fontSize="xl">{member.name}</Text>
        
        <HStack justify={'center'} pt={3}>
        <ChevronDownIcon w={7} h={7} _hover={{ color: "teal.600" }} onClick={() => penaltyUpdate(member.id, -1)}/>
        {!groupData.icon ? (
          <Text pl={3} pr={3} fontSize="2xl">{member.amount * groupData.penaltySize}</Text>
        ) : (
          <>
          <Text pl={3} pr={3} fontSize="2xl">{member.amount}</Text>
          <Image src="/beer.png" width={6}/>
          </>
        )}
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

      <Spacer/>
      <UrlBox />
      </Flex>

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

      <Modal isOpen={isOpenPenalty} onClose={onClosePenalty}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change penalty size</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input
              id='name'
              type='number'
              value={penaltySize}
              onChange={handlePenaltyChange}
            />
          </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClosePenalty}>Close</Button>
            <Button type="submit" colorScheme='blue' onClick={() => {onClosePenalty(); groupUpdate({penaltySize: penaltySize})}}>Update</Button>       
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
};

export default groupPage;