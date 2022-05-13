import { UseDisclosureReturn, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useContext, createContext, ReactNode, useEffect } from 'react' 

// estudar useContext modulo 02

interface SideBarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)


export function SideBarDrawerProvider({children}: SideBarDrawerProviderProps) {
  const disclosure = useDisclosure()

  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSideBarDrawer = () => useContext(SidebarDrawerContext)