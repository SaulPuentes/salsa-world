import React from 'react'

import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQsBlock as FAQsBlockProps } from '@/payload-types'

export const FAQsBlock: React.FC<FAQsBlockProps> = (props) => {
  const { items } = props

  console.log('items', items)
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className='bg-violet'>
      <div className="container py-16">
        <h2 className="text-3xl text-white">
          Preguntas Frecuentes
        </h2>
        <Accordion type="multiple" className="space-y-4">
          {items.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-item-${index}`}
              className="border-b border-b-white"
            >
              <AccordionTrigger className="text-left text-lg font-mulish font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-2 text-muted-foreground">
                {faq.answer && (
                  <RichText data={faq.answer} enableGutter={false} />
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
