import React from 'react'

interface Props {
    type?: React.HTMLInputTypeAttribute,
    id?: string,
    placeholder?: string,
    className?: string,
    defaultValue?: string | number | readonly string[],
    autoFocus?: boolean
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {
        type,
        id,
        placeholder,
        className,
        defaultValue,
        autoFocus
    } = props

    return (<input ref={ref} type={type} id={id} placeholder={placeholder} defaultValue={defaultValue}
    autoFocus={autoFocus}
    className={`outline-none p-3 pb-1 border-solid border-white/30 border-b-2 
    transition duration-500 placeholder:text-slate-100/90 placeholder:font-mono
    bg-transparent text-white
    focus:border-white ${className}`}/>)
})

export { Input }