import React, { ComponentProps } from 'react'
import type { FC } from 'react'
import ReactSelect from 'react-select'
import type { PropsOf } from 'emotion-theming/types/helper'
import { Icon, Box, Flex } from '@chakra-ui/core'

/**
 * Multiselect wraps the react-select component and adds custom components and
 * styles
 */

// type ReactSelectProps = ComponentProps<typeof ReactSelect>

// type Components = Exclude<ReactSelectProps['components'], undefined>

// const ClearIndicator: FC<Components['ClearIndicator']> = ({ innerProps}) => {

// }

const Multiselect: FC<ComponentProps<typeof ReactSelect>> = (props) => {
  return (
    <ReactSelect
      {...props}
      components={{
        ClearIndicator: ({ innerProps }) => (
          <Flex {...innerProps} mr={2}>
            <Icon name="small-close" />
          </Flex>
        ),
      }}
    />
  )
}

export default Multiselect
