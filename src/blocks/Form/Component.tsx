'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { useTranslations } from 'next-intl'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableContactInfo: boolean
  form: FormType
  content?: {
    intro: SerializedEditorState
    email: string
    phone: string
    address: string
  }
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableContactInfo,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    content,
  } = props


  const t = useTranslations('ContactPage');

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
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

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className='relative mb-16'>
      <div className="container flex gap-14">
        {/* Left Column: Form */}
        <div className="w-full lg:max-w-[515px] flex-shrink-0">
          <div className="p-4 lg:px-6 lg:py-10 border border-border rounded-xl bg-purple">
            <h2 className="text-3xl text-white mb-6 text-center">
              {t('title')}
            </h2>
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText data={confirmationMessage} />
              )}
              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
              {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-10 last:mb-0">
                    {formFromProps &&
                      formFromProps.fields &&
                      formFromProps.fields?.map((field, index) => {
                        const Field: React.FC<any> = fields?.[field.blockType]
                        if (Field) {
                          return (
                            <div className="mb-6 last:mb-0" key={index}>
                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                              />
                            </div>
                          )
                        }
                        return null
                      })}
                  </div>
                  <div className='w-full flex justify-center'>
                    <Button form={formID} type="submit" variant="pink" className='text-xl px-14 h-12 mx-auto'>
                      {submitButtonLabel}
                    </Button>
                  </div>
                </form>
              )}
            </FormProvider>
          </div>
        </div>
        {/* Right Column: Content */}
        {enableContactInfo && !hasSubmitted && (
          <div className="w-full">
            {content?.intro && (
              <RichText className="mb-8 lg:mb-12" data={content?.intro} enableGutter={false} />
            )}
            {(content?.email || content?.phone || content?.address) && (
              <div className="space-y-2 text-sm text-muted-foreground">
                {content?.email && <p>Email: {content.email}</p>}
                {content?.phone && <p>Phone: {content.phone}</p>}
                {content?.address && <p>Address: {content.address}</p>}
              </div>
            )}
          </div>
        )}
      </div>
      <Image
        src="/img/isotype.svg"
        alt="Logo"
        width={472}
        height={622}
        className="absolute right-[-135px] bottom-0 -z-10 hidden lg:block"
      />
    </div>
  )
}
