import { React, useEffect, useState } from "react";
import { useClipboard, FormLabel, Flex, Input, Button, Box } from '@chakra-ui/react'

function urlBox() {
    const [value, setValue] = useState('')
    const { hasCopied, onCopy } = useClipboard(value)

    useEffect(() => {
        setValue(window.location.href)
      }, [])

    return (
      <>
        <Box p={15}>
            <FormLabel>Copy your group URL</FormLabel>
            <Flex mb={2} maxW={500}>
            <Input fontSize={'sm'} value={value} isReadOnly placeholder='URL' />
            <Button onClick={onCopy} ml={2}>
                {hasCopied ? 'Copied' : 'Copy'}
            </Button>
            </Flex>
        </Box>
      </>
    )
  }
  export default urlBox;