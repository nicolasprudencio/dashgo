import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";


interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType,
  text: String,
  href: string,
}

export function NavLink({icon, text, href, ...rest}: NavLinkProps) {
  return(
    <ActiveLink href={href}>  
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20"/>
        <Text ml="4" fontWeight="medium">{text}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}