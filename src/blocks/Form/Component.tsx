'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import React from 'react'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { defaultSocialLinks, SocialLinks } from '@/components/SocialLinks'
import { useFormSubmission } from '@/hooks/useFormSubmission'
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

  const t = useTranslations('ContactPage')

  const {
    formMethods,
    isLoading,
    hasSubmitted,
    error,
    control,
    errors,
    handleSubmit,
    register,
    onSubmit
  } = useFormSubmission(formFromProps, formID!, confirmationType!, redirect)

  return (
    <div className='relative mb-16'>
      <div className="container flex flex-col lg:flex-row gap-14">
        {/* Left Column: Form */}
        <div className="w-full lg:max-w-[515px] flex-shrink-0">
          <div className="p-4 pt-14 mx-auto bg-purple border border-border rounded-lg max-w-xl lg:px-6 lg:pb-10">
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
              <RichText className="mb-4 lg:my-8 text-white" data={content?.intro} enableGutter={false} />
            )}
              <div className="flex gap-10 items-end text-sm">
                <div className="mt-6 max-w-[300px]">
                  <h3 className="text-lg mb-3">¡Síguenos en nuestras redes sociales y no te pierdas nada!</h3>
                  <SocialLinks
                    color='text-pink'
                    links={[ ...defaultSocialLinks, { platform: 'email', url: content?.email || '' } ]}
                  />
                </div>
              </div>
            {content?.address && (
              <div className="mt-4">
                <h3 className="text-lg">Dónde encontrarnos</h3>
                <p className="text-sm">{content.address}</p>
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
