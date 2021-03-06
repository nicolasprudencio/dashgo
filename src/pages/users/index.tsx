import {Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue} from '@chakra-ui/react'
import Link from 'next/link';
import { useEffect } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import Pagination from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { UserList } from './Users';
 
export default function userList() {
  const isWideVersion = useBreakpointValue({
    base:false,
    lg: true
  })

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
  }, [])

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480}  mx='auto' px='6'>
        <Sidebar />

      <Box flex='1' borderRadius={8} bg='gray.800' p={8}>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>Usuários</Heading>

           <Link href='/users/create'> 
              <Button
                
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} 
                fontSize='20'
                 />}
              >Criar novo</Button>
            </Link>
          </Flex>

          <Table colorScheme='whiteAlpha'>
            <Thead>
              <Tr>
                <Th px='6' color='gray.300' width='8'>
                  <Checkbox colorScheme='pink' />                 
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th> }
                <Th width='8'></Th>
              </Tr>
            </Thead>
            
            <Tbody>
              <UserList name='Claudio Barbosa' mail='claudio@hotmail.com' data='06 de Maio, 
              2022'/>
                
              <UserList name='Claudio Barbosa' mail='claudio@hotmail.com' data='06 de Maio, 2022'/>

              <UserList name='Claudio Barbosa' mail='claudio@hotmail.com' data='06 de Maio, 2022'/>

            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex> 
    </Box>
  );
}