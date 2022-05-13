import { extractRepoDataFromURL } from '../../utils/helpers'
import { TextInput } from '../UI/Forms/TextInput'
import { Button } from '../UI/Button'
import { useSearchContext } from '../../context/search-context'
import { STATUSES } from '../../utils/constants/statuses'
import { REPO_REGEX_VALIDATOR } from '../../utils/constants/regex'

import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  searcher: Yup.string()
    .matches(REPO_REGEX_VALIDATOR, 'Introduce una URL de repositorio válida')
})

export const Searcher = () => {
  const { searchHandler, status } = useSearchContext()

  const handleSubmit = (values) => {
    const { searcher } = values
    const repoData = extractRepoDataFromURL(searcher)
    searchHandler(repoData)
  }

  return (
    <Formik
      initialValues={{ searcher: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className='mb-10'
    >
      {({ values, handleChange }) => (
        <Form className='flex mb-4'>
          <Field
            name='searcher'
            component={TextInput}
            value={values.email}
            onChange={handleChange}
          />
          <Button
            type='submit'
            className='ml-1'
            loading={status === STATUSES.LOADING}
          >
            Buscar
          </Button>
        </Form>
      )}
    </Formik>
  )
}
