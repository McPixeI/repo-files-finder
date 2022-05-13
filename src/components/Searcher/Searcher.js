import { useState } from 'react'
import { getURLdata } from '../../utils/helpers'
import { TextInput } from '../UI/Forms/TextInput'
import { Button } from '../UI/Button'
import { useSearchContext } from '../../context/search-context'
import { STATUSES } from '../../utils/constants/statuses'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  searcher: Yup.string().min(2)
})

export const Searcher = () => {
  const { searchHandler, status } = useSearchContext()

  const handleSubmit = (values) => {
    const { searcher } = values
    searchHandler(getURLdata(searcher))
  }

  return (
    <Formik
      initialValues={{ searcher: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className='mb-10'
    >
      {({ values, handleChange, errors, touched }) => (
        <Form className='flex mb-4'>
          <Field
            name='searcher'
            component={TextInput}
            value={values.email}
            onChange={handleChange}
          />
          <Button type='submit' disabled={status === STATUSES.LOADING}>Search</Button>
        </Form>
      )}
    </Formik>
  )
}
