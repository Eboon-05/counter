import React, { MouseEventHandler, ReactNode } from 'react'

interface Props {
    type: 'primary',
    children: ReactNode,
    onClick?: MouseEventHandler,
    className?: string,
    disabled?: boolean,
}

function Button(props: Props) {
    const {
        type,
        onClick,
        className,
        disabled
    } = props

    return (<button className={`
        p-2

        ${type === 'primary' && `bg-black rounded-lg shadow-md hover:shadow-lg 
        transition-all duration-500 disabled:opacity-70 disabled:shadow-none`}
        
        ${className}
    `} disabled={disabled} onClick={onClick} >
        {props.children}
    </button>)
}

export { Button }