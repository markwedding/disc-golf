import React from 'react'
import type { FC } from 'react'
import recoil from 'recoil'
import { sortedRoundsSelector, roundSortAtom } from 'src/state'
import {
  Heading,
  Box,
  Badge,
  Text,
  Stack,
  useColorMode,
  Flex,
  IconButton,
} from '@chakra-ui/core'
import { formatToPar, formatDate } from 'src/utils'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

const { useRecoilValue, useRecoilState } = recoil

const getBadgeColor = (toPar: number): string => {
  if (toPar > 0) return 'red'
  if (toPar < 0) return 'green'
  return 'gray'
}

const BestRounds: FC = () => {
  const [sort, setSort] = useRecoilState(roundSortAtom)
  const rounds = useRecoilValue(sortedRoundsSelector)
  const { colorMode } = useColorMode()
  const headingColor = { light: 'gray.600', dark: 'gray.400' }

  const handleClick = () => {
    setSort((current) => (current === 'asc' ? 'desc' : 'asc'))
  }

  const headingText = sort === 'asc' ? 'Best Rounds 🔥' : 'Worst Rounds 💩'
  const icon = sort === 'asc' ? FaCaretUp : FaCaretDown

  return (
    <Box shadow="md" borderWidth="1px" p={3} rounded="lg" maxWidth="400px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading
          size="sm"
          textTransform="uppercase"
          color={headingColor[colorMode]}
        >
          {headingText}
        </Heading>
        <IconButton
          variant="outline"
          size="sm"
          aria-label="Sort"
          icon={icon}
          onClick={handleClick}
        />
      </Flex>
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
