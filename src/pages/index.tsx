import { Flex, Button, Stack, FormLabel} from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


type SignInFormData = {
  email: string;
  password: string

}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')})

export default function SignIn() {
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const errors = formState.errors

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log(data)
  } 

  return (
   <Flex 
   w="100vw"
   h='100vh'
   align="center"
   justify="center"
   >
     <Flex
     as="form"
     width="100%"
     maxWidth={360}
     bg="gray.800"
     p="8"
     borderRadius={10}
     flexDir="column"
     onSubmit={handleSubmit(handleSignIn)}
     >
       <Stack spacing={4}>
         <FormLabel fontSize="20">Login</FormLabel>
         <Input 
          type='email' 
          name='email' 
          placeholder="Email"
          error={errors.email} 
          {...register('email')}
         />
         <Input 
          type='password' 
          name='password' 
          placeholder="Senha"
          error={errors.password} 
          {...register('password')}
         />  
          
       </Stack> 
       <Button
        type="submit"
        colorScheme="pink"
        mt={6}
        isLoading={formState.isSubmitting}
        >Entrar</Button>
     </Flex>
   </Flex>
  )
}
