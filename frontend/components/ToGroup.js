import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    InputGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  import { ArrowForwardIcon } from '@chakra-ui/icons'
  import styles from '../styles/Home.module.css'
  import { React, useEffect, useRef, useState } from "react";

const toGroup = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
        <div className={styles.card}>
        <form>
        <FormControl>
        <FormLabel htmlFor='group'>Group name</FormLabel>
        <InputGroup size='sm'>
        <Input id='group' type='text' />
        <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' type='submit'>
            Go
        </Button>
        </InputGroup>
        <FormHelperText>Choose available name</FormHelperText>
        </FormControl>
        </form>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Make new group</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Creation a new group named ...
            </ModalBody>

            <ModalFooter>
            <Button variant='ghost' mr={2}>No</Button>
            <Button colorScheme='blue' onClick={onClose}>
                Yes
            </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    );
}
export default toGroup;