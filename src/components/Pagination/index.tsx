import { Box, Stack } from '@chakra-ui/react'
import { PaginationItem } from './PagintionItem'


export default function Pagination() {
  return (
  
    <Stack 
    direction={['column', 'row']}
    justify='space-between' 
    spacing='6' 
    mt='8'
    align='center'>

      <Box>
        <strong>0</strong> - <strong> 10 </strong> <strong> de </strong> <strong>100</strong>
      </Box>

      <Stack direction ='row'spacing='2' >
        <PaginationItem number={1} isCurrent/>
        <PaginationItem number={2}/>
        <PaginationItem number={3}/>
        <PaginationItem number={4}/>
      </Stack>
    </Stack>
  )
}