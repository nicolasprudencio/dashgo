import { Box, Button, Checkbox, Td, Tr, Text, Icon, useBreakpointValue } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";

interface UserProps {
  name: string,
  mail: string,
  data: string
}

export function UserList({name, mail, data}: UserProps) {
  const isWideVersion = useBreakpointValue({
    base:false,
    lg: true
  })
  
  return (
  
    <Tr>
      <Td>
        <Checkbox colorScheme='pink'/>
      </Td>
      <Td>
        <Box>
          <Text fontWeight='bold'>{name}</Text>
          <Text fontSize='small' color='gray.300'>{mail}</Text>
        </Box>
      </Td>
      {isWideVersion && <Td>{data}</Td>}
      <Td>
     {isWideVersion && <Button
        
        size='sm'
        fontSize='sm'
        colorScheme='purple'
        leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
      >Editar</Button> }
      </Td>
    </Tr>
 )
}