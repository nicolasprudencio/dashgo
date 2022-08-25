import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  theme,
  useBreakpointValue
} from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'

// tabela
const options: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    foreColor: theme.colors.gray[500]
  },
  grid: { show: false },
  dataLabels: { enabled: false },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },

    axisTicks: {
      color: theme.colors.gray[600]
    },

    categories: [
      '2022-05-03T00:00:00.000Z',
      '2022-05-04T00:00:00.000Z',
      '2022-05-05T00:00:00.000Z',
      '2022-05-06T00:00:00.000Z',
      '2022-05-07T00:00:00.000Z',
      '2022-05-08T00:00:00.000Z',
      '2022-05-09T00:00:00.000Z'
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const series = [
  {
    name: 'series1',
    data: [0, 240, 220, 400, 353, 500, 160]
  }
]

export default function Dashboard() {
  const [card, setCard] = useState(false)

  useEffect(() => {
    setCard(true)
  }, [])

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            {card && (
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            )}
          </Box>
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            {card && (
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            )}
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
