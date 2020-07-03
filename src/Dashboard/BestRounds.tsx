import React from 'react'
import type { FC } from 'react'
import recoil from 'recoil'
import { bestRoundsSelector } from 'src/state'
import { Heading, Box, Badge, Text, Stack, useColorMode } from '@chakra-ui/core'
import { formatToPar, formatDate } from 'src/utils'

const { useRecoilValue } = recoil

const getBadgeColor = (toPar: number): string => {
  if (toPar > 0) return 'red'
  if (toPar < 0) return 'green'
  return 'gray'
}

const BestRounds: FC = () => {
  const rounds = useRecoilValue(bestRoundsSelector)
  const { colorMode } = useColorMode()
  const headingColor = { light: 'gray.600', dark: 'gray.400' }

  return (
    <Box shadow="md" borderWidth="1px" p={3} rounded="lg">
      <Heading
        size="sm"
        mb={2}
        textTransform="uppercase"
        color={headingColor[colorMode]}
      >
        Best Rounds 🔥
      </Heading>
      {rounds.map(({ toPar, course, date }) => (
        <Stack isInline alignItems="baseline" spacing={3}>
          <Badge rounded="full" px="2" variantColor={getBadgeColor(toPar)}>
            {formatToPar(toPar)}
          </Badge>
          <Text as="span">{course}</Text>
          <Text
            as="span"
            color="gray.500"
            letterSpacing="wide"
            fontWeight="bold"
            fontSize="xs"
          >
            {formatDate(date)}
          </Text>
        </Stack>
      ))}
    </Box>
  )
}

export default BestRounds
