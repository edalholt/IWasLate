import { useState } from "react";
import { VStack, Image, Editable, EditableInput, EditablePreview, Wrap, Box, CloseButton, Text, HStack, WrapItem } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

function BoxDemo() {

  const [amount, setAmount] = useState(50);
  const [beer, setBeer] = useState(2);

    return (
      <>
      <Wrap spacing='50px' justify='center'>
        <WrapItem>
        <VStack>
          <Text color={'white'} fontSize='xl' mb={3}>Set your preferred amount</Text>
          <Box _hover={{ borderColor: "teal.600" }} borderWidth='1px' borderRadius='lg'  minHeight={150}>
          <CloseButton size={'md'}  />
          <Box minWidth={280} p={5} align={'center'}>
          <Text fontSize="xl">
          <Editable defaultValue='Jakob'>
            <EditablePreview />
            <EditableInput />
          </Editable>
          </Text>
          
          <HStack justify={'center'} pt={3}>
          <ChevronDownIcon cursor={'pointer'} w={7} h={7} _hover={{ color: "teal.600" }} onClick={() => setAmount(amount-50)}/>
          <Text pl={3} pr={3} fontSize="2xl">{amount}</Text>
          <ChevronUpIcon cursor={'pointer'} w={7} h={7} _hover={{ color: "teal.600" }} onClick={() => setAmount(amount+50)}/>
          </HStack>
          </Box>
          </Box>
        </VStack>
        </WrapItem>

        <WrapItem>
        <VStack>
          <Text color={'white'} fontSize='xl' mb={3}>Or count in beers</Text>
          <Box _hover={{ borderColor: "teal.600" }} borderWidth='1px' borderRadius='lg'  minHeight={150}>
          <CloseButton size={'md'}  />
          <Box minWidth={280} p={5} align={'center'}>
          <Text fontSize="xl">
          <Editable defaultValue='Emma'>
            <EditablePreview />
            <EditableInput />
          </Editable>
          </Text>
          
          <HStack justify={'center'} pt={3}>
          <ChevronDownIcon cursor={'pointer'} w={7} h={7} _hover={{ color: "teal.600" }} onClick={() => setBeer(beer-1)}/>
          <Text pl={3} pr={3} fontSize="2xl">{beer}</Text>
          <Image src="/beer.png" width={6}/>
          <ChevronUpIcon cursor={'pointer'} w={7} h={7} _hover={{ color: "teal.600" }} onClick={() => setBeer(beer+1)}/>
          </HStack>
          </Box>
          </Box>
        </VStack>
        </WrapItem>
      </Wrap>
      </>
    )
  }
  export default BoxDemo;