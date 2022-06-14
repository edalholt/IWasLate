import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import { Box, HStack, Text, Flex, Spacer, Menu, Wrap, WrapItem, MenuButton, MenuList, IconButton, MenuItem } from '@chakra-ui/react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { HamburgerIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons';
import axios from 'axios';

const groupPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [groupData, setGroupData] = useState(null);

    const myFunction = async () => {
        const res = await axios.get(`/api/group/${id}/`);
        setGroupData(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        if (router.isReady) {
            myFunction();
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
                <MenuItem icon={<AddIcon />}>
                Add member
                </MenuItem>
                <MenuItem icon={<SettingsIcon />}>
                Settings
                </MenuItem>
            </MenuList>
        </Menu>
        </Flex>
        </Box>

        <Wrap spacing='30px' m={5} justify='center'>
        {groupData.memberData.map(member => 
        <WrapItem>
        <Box _hover={{ borderColor: "teal.600" }} minWidth={300} minHeight={150} p={5} borderWidth='1px' borderRadius='lg' align={'center'}>
        <Text fontSize="xl">{member.name}</Text>
        
        <HStack justify={'center'} pt={3}>
        <RemoveCircleIcon/>
        <Text pl={3} pr={3} fontSize="2xl">{member.amount * groupData.penaltySize}</Text>
        <AddCircleIcon/>
        </HStack>
        </Box>
        </WrapItem>
        )}

        <WrapItem >
        <Box _hover={{ borderColor: "teal.600" }} minWidth={300} minHeight={150} p={5} borderWidth='1px' borderRadius='lg' align={'center'}>
        <Text pt={7} fontSize="xl">Add member</Text>
        <AddIcon/>
        </Box>
        </WrapItem>
       </Wrap>
    </>
    )
};

export default groupPage;