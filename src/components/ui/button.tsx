import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'sheen relative overflow-hidden bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.6)] hover:bg-primary/90 active:translate-y-px',
        accent:
          'sheen relative overflow-hidden bg-accent text-accent-foreground shadow-[0_10px_28px_-12px_hsl(var(--accent)/0.5)] hover:brightness-105 active:translate-y-px',
        gold:
          'sheen relative overflow-hidden bg-[hsl(var(--gold))] text-[hsl(var(--navy))] shadow-[0_10px_28px_-12px_hsl(var(--gold)/0.5)] hover:brightness-105 active:translate-y-px',
        navy:
          'sheen relative overflow-hidden bg-[hsl(var(--navy))] text-white shadow-[0_10px_28px_-12px_hsl(var(--navy)/0.6)] hover:bg-[hsl(var(--navy))]/90 active:translate-y-px',
        outline:
          'border border-foreground/15 bg-transparent text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04]',
        ghost: 'text-foreground/70 hover:bg-foreground/[0.05] hover:text-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-[hsl(var(--surface-2))]',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        default: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  },
)
Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components -- shadcn pattern: variants shared from the component file
export { Button, buttonVariants }
