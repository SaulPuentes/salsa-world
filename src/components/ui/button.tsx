import { cn } from 'src/utilities/cn'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const underlineAnimation = "no-underline hover:no-underline after:content-[''] after:absolute after:bottom-[-3px] after:right-0 after:w-0 after:h-[1.5px] after:bg-pink after:transition-all after:duration-300 hover:after:w-full hover:after:right-auto"

const buttonVariants = cva(
  'inline-flex font-lilita uppercase items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3',
      },
      variant: {
        pink: 'bg-pink hover:bg-pink/90 text-white',
        orange: 'bg-orange hover:bg-orange/90 text-white',
        violet: 'bg-violet hover:bg-violet/90 text-white',
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-pink bg-transparent hover:bg-pink rounded',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      animatedUnderline: {
        true: underlineAnimation,
        false: '',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  animatedUnderline,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={cn(buttonVariants({ className, size, variant, animatedUnderline }))}
      ref={ref}
      {...props}
    />
  )
}

export { Button, buttonVariants }
