import {Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner} from '@chakra-ui/react'
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';


import { Header } from '../../components/Header';
import Pagination from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { getUsers, useUsers } from '../../services/hooks/useUsers';
import { UserList } from './Users';
 
export default function userList() {
  const [ page, setPage ] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page)
  
  const isWideVersion = useBreakpointValue({
    base:false,
    lg: true
  })


  useEffect(() => {
    
  }, [])

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480}  mx='auto' px='6'>
        <Sidebar />

      <Box flex='1' borderRadius={8} bg='gray.800' p={8}>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg'
             fontWeight='normal'
             >
               Usuários
               {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='2'/>}
               </Heading>

           <NextLink href='/users/create'> 
              <Button
                
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} 
                fontSize='20'
                 />}
              >Criar novo</Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify='center' >
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao carregar lista de usuários.</Text>
            </Flex>
          ) : (
          <>
            <Table colorScheme='whiteAlpha'>
              <Thead>
                <Tr>
                  <Th px='6' color='gray.300' width='8'>
                    <Checkbox colorScheme='pink' />                 
                  </Th>
                  <Th>
                    Usuário
                      
                  </Th>
                  {isWideVersion && <Th>Data de cadastro</Th> }
                  <Th width='8'></Th>
                </Tr>
              </Thead>
              
              <Tbody>
                {data.users.map(user => {
                  return (
                     <UserList key={user.id} id={user.id} name={user.name} mail={user.email} data={user.createdAt}/>
                  )
                })}

              </Tbody>
            </Table>
            <Pagination 
            totalCountOfRegisters={data.totalCount}
            currentPage={page} 
            onPageChange={setPage}/>
          </>
          )}
        </Box>
      </Flex> 
    </Box>
  );
}

