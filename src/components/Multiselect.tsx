import React, { ComponentProps } from 'react'
import type { FC } from 'react'
import ReactSelect, { components } from 'react-select'
import { Icon, Box, Flex, useColorMode } from '@chakra-ui/core'
import customTheme from 'src/theme'

/**
 * Multiselect wraps the react-select component and adds custom components and
 * styles
 */

// type ReactSelectProps = ComponentProps<typeof ReactSelect>

// type Components = Exclude<ReactSelectProps['components'], undefined>

// const ClearIndicator: FC<Components['ClearIndicator']> = ({ innerProps}) => {

// }

// const ClearIndicator: FC<ComponentProps<typeof components.ClearIndicator>> = ({
//   innerProps,
// }) => (
//   <Flex {...innerProps} mr={2}>
//     <Icon name="small-close" />
//   </Flex>
// )

const Multiselect: FC<ComponentProps<typeof ReactSelect>> = (props) => {
  const { colorMode } = useColorMode()
  const {
    colors: { gray, whiteAlpha },
  } = customTheme
  const primaryColor = colorMode === 'light' ? gray[800] : whiteAlpha[800]

  return (
    <ReactSelect
      {...props}
      components={{
        ClearIndicator: ({ innerProps }) => (
          <Flex {...innerProps} mr={2}>
            <Icon name="small-close" />
          </Flex>
        ),
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            <Box color={primaryColor}>
              <Icon name="chevron-down" size="1.25em" />
            </Box>
          </components.DropdownIndicator>
        ),
      }}
    />
  )
}

export default Multiselect
