import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FormControl, FormErrorMessage, Input as ChakraInput, InputProps as ChakraInputProps } from 
'@chakra-ui/react'
import { FieldError } from 'react-hook-form'


interface InputProps extends ChakraInputProps {
  name: string,
  placeholder: string,
  error: FieldError
}
 

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
= ({name, placeholder, error, ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput 
        name={name} 
        focusBorderColor='pink.500'
        bgColor="gray.900"
        variant="filled"
        placeholder={placeholder}
        _hover={{
          bgColor: "gray.900"
        }}
        ref={ref}
        {...rest} />

        {!!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
    </FormControl>   


  )
}

export const Input = forwardRef(InputBase)