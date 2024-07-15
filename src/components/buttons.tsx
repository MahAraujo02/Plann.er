
import { ComponentProps, ReactNode } from "react";
import {tv,VariantProps} from 'tailwind-variants'

const buttonsVariants = tv({
    base:'rounded-lg px-5 py-2 font-medium flex items-center gap-2 justify-center',
    variants: {
        variant:{
            primary:'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary:'bg-zinc-800 text-zinc-2000 hover:bg-zinc-700',
        },
        size: {
            default:"py-2",
            full:"w-full h-11",
        }
    },

    defaultVariants:{
        variant: 'primary',
        size: 'default',
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonsVariants>{
    children:ReactNode
}
export function Button ({children, variant,size,...props}:ButtonProps) {
    return (
        <button {...props} className={buttonsVariants({variant,size})}>
        {children}
       </button>
    )
}