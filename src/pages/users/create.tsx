import {Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack} from '@chakra-ui/react';
import {SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link';
import { useMutation } from 'react-query'


import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router';

type CreateUserFormData = {
  name: string;
  password: string;
  email: string;
  password_confirmation: string;

}

const createInFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'mínimo de 6 caractéres'),
  password_confirmation: yup.string().oneOf([
  , null ,yup.ref('password')], 'As senhas precisam ser iguais'
   )
})
  
 
export default function createUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const {handleSubmit ,register ,formState} = useForm({
    resolver: yupResolver(createInFormSchema)
  })
  
  const errors = formState.errors

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/users')
  }


  return (
    <Box>
      
      <Header />

      <Flex w="100%" my="6" maxWidth={1480}  mx='auto' px='6'>
        <Sidebar />

        <Box 
        as='form'
        flex='1' 
        borderRadius={8} 
        bg='gray.800' 
        p={8}
        onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size='lg' fontWeight='bold'>
            Criar usuário
          </Heading>

          <Divider my='6' borderColor='gray.700'/>

          <VStack spacing='8'>
            
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>             
              <Input 
              name='name' 
              placeholder='Nome Completo' 
              error={errors.name}
              {...register('name')}
              />
              <Input 
              name='email' 
              placeholder='Email' 
              type='email'
              error={errors.email}
              {...register('email')} 
              />   
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>             
              <Input 
              name='password' 
              placeholder='senha' 
              type='password'
              error={errors.password}
              {...register('password')}
              />
              <Input 
              name='password_confirmation' 
              placeholder='Confirmar senha' 
              type='password' 
              error={errors.password_confirmation}
              {...register('password_confirmation')}
              />             
            </SimpleGrid>

          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4' >
            <Link href='/users'> 
              <Button colorScheme='whiteAlpha'>Cancelar</Button>
            </ Link>  
              <Button 
              colorScheme='pink'
              isLoading={formState.isSubmitting}
              type='submit' 
               >Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex> 
    </Box>
  );
}