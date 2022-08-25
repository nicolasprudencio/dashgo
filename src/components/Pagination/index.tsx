import { Box, Stack, Text } from '@chakra-ui/react'
import { PaginationItem } from './PagintionItem'


interface paginationProps {
  totalCountOfRegisters: number; 
  currentPage?: number;
  registersPerPage?: number;
  onPageChange: (page: number) => void

}

const siblingsCount = 1;

function generatePagesArray(from:number, to:number) {
  // define quais "paginas" serão mostradas por vez
  return [...new Array(to - from)]
  .map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0)
}

export default function Pagination({
    totalCountOfRegisters,
    currentPage = 1,
    registersPerPage = 10,
    onPageChange  
  }:paginationProps) {

    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

    //define as paginas mostradas antes da pagina atual
    const previousPages = currentPage > 1 
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];
    
    //define as paginas mostradas depois da pagina atual
    const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

    // logica de renderização da paginação 
  return (
  
    <Stack 
    direction={['column', 'row']}
    justify='space-between' 
    spacing='6' 
    mt='8'
    align='center'>

      <Box>
        <strong>           
          {currentPage * registersPerPage - registersPerPage + 1}
         </strong> - <strong>           
           {currentPage === lastPage ? totalCountOfRegisters : registersPerPage * currentPage}         
          </strong> de <strong>           
            {totalCountOfRegisters}         
          </strong> 
      </Box>

      <Stack direction ='row'spacing='2' >
        
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1}/>
            { currentPage > (2 + siblingsCount) &&
            <Text color='gray.300' fontSize='24'>...</Text> }
          </>
        )}

        

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} number={page} key={page} />
        })}
        
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} number={page} key={page} />
        })}

        

        {(currentPage + siblingsCount) < lastPage && (
          <>
            { currentPage + 1 < lastPage &&
            <Text color='gray.300' fontSize='24'>...</Text> }
            <PaginationItem onPageChange={onPageChange} number={lastPage}/>
          </>
        )}

      </Stack>
    </Stack>
  )
}