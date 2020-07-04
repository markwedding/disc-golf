import React, { ComponentProps } from 'react'
import type { FC } from 'react'
import ReactSelect, { components } from 'react-select'
import {
  Icon,
  Flex,
  useColorMode,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/core'
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
    colors: { white, gray, whiteAlpha, blackAlpha },
  } = customTheme
  const primaryColor = colorMode === 'light' ? gray[800] : whiteAlpha[800]

  return (
    <ReactSelect
      {...props}
      styles={{
        control: (provided, state) => ({
          ...provided,
          minHeight: '2.5rem',
          borderColor: colorMode === 'light' ? gray[200] : whiteAlpha[50],
          paddingLeft: 'calc(1rem - 2px)',
          backgroundColor: colorMode === 'light' ? white : whiteAlpha[100],
          '&:hover': {
            borderColor: colorMode === 'light' ? gray[300] : whiteAlpha[200],
          },
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          paddingLeft: 0,
        }),
        multiValue: () => ({ display: 'flex', alignItems: 'center' }),
        multiValueLabel: () => ({}),
        multiValueRemove: () => ({}),
      }}
      components={{
        ClearIndicator: ({ innerProps }) => (
          <Flex {...innerProps} mr={2}>
            <Icon name="small-close" />
          </Flex>
        ),
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            <Flex color={primaryColor}>
              <Icon name="chevron-down" size="1.25em" />
            </Flex>
          </components.DropdownIndicator>
        ),
        MultiValueContainer: (props) => (
          <Tag
            size="sm"
            rounded="full"
            variant="solid"
            variantColor="cyan"
            mx="1px"
            my="2px"
          >
            <components.MultiValueContainer {...props} />
          </Tag>
        ),
        MultiValueLabel: (props) => (
          <TagLabel>
            <components.MultiValueLabel {...props} />
          </TagLabel>
        ),
        MultiValueRemove: (props) => (
          <components.MultiValueRemove {...props}>
            <TagCloseButton />
          </components.MultiValueRemove>
        ),
      }}
    />
  )
}

export default Multiselect
