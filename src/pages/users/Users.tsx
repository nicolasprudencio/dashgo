import { Box, Button, Checkbox, Td, Tr, Text, Icon, useBreakpointValue, Link } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface UserProps {
  name: string,
  mail: string,
  data: string,
  id: string,
}

export function UserList({name, mail, data, id}: UserProps) {
  const isWideVersion = useBreakpointValue({
    base:false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutes
    })
  }
  
  return (
  
    <Tr>
      <Td px={['4', '4', '6']}>
        <Checkbox colorScheme='pink'/>
      </Td>
      <Td>
        <Box>
          <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(id)}>
            <Text fontWeight='bold'>{name}</Text>
          </Link>
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