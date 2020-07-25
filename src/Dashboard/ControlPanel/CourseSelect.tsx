import React, { useMemo } from 'react'
import type { FC } from 'react'
import recoil from 'recoil'
import { coursesSelector, selectedCoursesAtom } from 'src/state'
import type { Courses } from 'src/types'
import { FormControl, FormLabel } from '@chakra-ui/core'
import Multiselect from 'src/components/Multiselect'

const { useRecoilValue, useRecoilState } = recoil

const generateOptions = (courses: Courses) =>
  Object.entries(courses)
    .reduce<[string, string][]>(
      (arr, [course, layouts]) => [
        ...arr,
        ...layouts.map((layout): [string, string] => [course, layout]),
      ],
      [],
    )
    .map((tuple) => {
      const [course, layout] = tuple

      return {
        label: `${course}: ${layout}`,
        value: tuple,
      }
    })

const CourseSelect: FC = () => {
  const courses = useRecoilValue(coursesSelector)
  const [, setSelectedCourses] = useRecoilState(selectedCoursesAtom)
  const options = useMemo(() => generateOptions(courses), [courses])

  return (
    <FormControl>
      <FormLabel htmlFor="courses">Course</FormLabel>
      <Multiselect
        id="courses"
        options={options}
        isMulti
        hideSelectedOptions
        onChange={(value) => {
          const options = value || ([] as any)

          setSelectedCourses(options.map((option: any) => option.value))
        }}
      />
    </FormControl>
  )
}

export default CourseSelect
