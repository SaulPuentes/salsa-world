import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { getClientSideURL } from '@/utilities/getURL'
import { buildInitialFormState } from '@/blocks/Form/buildInitialFormState'

export const useFormSubmission = (formFromProps: any, formID: string, confirmationType: string, redirect: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const { control, formState: { errors }, handleSubmit, register } = formMethods

  const onSubmit = useCallback(
    async (data: any) => {
      setError(undefined)

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))
      
      const loadingTimerID: ReturnType<typeof setTimeout> = setTimeout(() => {
        setIsLoading(true)
      }, 1000)

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        clearTimeout(loadingTimerID)

        if (req.status >= 400) {
          setIsLoading(false)
          setError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          })
          return
        }

        setIsLoading(false)
        setHasSubmitted(true)

        if (confirmationType === 'redirect' && redirect) {
          const { url } = redirect
          if (url) router.push(url)
        }
      } catch (err) {
        setIsLoading(false)
        setError({ message: 'Something went wrong.' })
      }
    },
    [formID, confirmationType, redirect, router],
  )

  return {
    formMethods,
    isLoading,
    hasSubmitted,
    error,
    control,
    errors,
    handleSubmit,
    register,
    onSubmit
  }
}
