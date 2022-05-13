import { Box, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";


interface NavProps {
  title: String
  children: ReactNode
}

export function NavSection({title, children}: NavProps) {
  return(
    <Box>
     <Text fontWeight="bold" color="gray.400" fontSize="small">{title}</Text>
     <Stack spacing="4" mt="8" align="stretch">
       {children}
     </Stack>
    </Box>
  );
}