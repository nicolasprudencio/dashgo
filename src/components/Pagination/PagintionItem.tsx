import { Button } from "@chakra-ui/react"

interface PaginationProps{
  isCurrent?: boolean,
  number: number
  onPageChange: (page: number) => void
}


export function PaginationItem({
  isCurrent = false, 
  number,
  onPageChange
}: PaginationProps) {
  if (isCurrent) {
    return(
      <Button
       size='sm'
       colorScheme='pink'
       width='4'
       fontSize='xs'
       disabled
       _disabled={{
         bgColor:'pink.500',
         cursor: 'default'
       }}
      >
         {number}
      </Button>
    )
  }

  return (
    <Button
      size='sm'
      bg='gray.700'
      width='4'
      fontSize='xs'
      _hover ={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
     >
      {number}
     </Button>
  );
}