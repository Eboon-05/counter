import { MouseEventHandler, ReactNode } from 'react'

interface Props {
    type: 'primary' | 'danger',
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
        p-2 font-semibold
        flex items-center justify-center

        ${type === 'primary' && `bg-black rounded-lg shadow-black shadow-sm 
        hover:shadow-md hover:shadow-black 
        transition-all duration-500 disabled:opacity-70 disabled:shadow-none`}

        ${type === 'danger' && `bg-red-500 text-black shadow-red-500 rounded-lg shadow-sm
        hover:shadow-md hover:shadow-red-500
        transition-all duration-500 disabled:opacity-70 disabled:shadow-none`}
        
        ${className}
    `} disabled={disabled} onClick={onClick} >
		{props.children}
	</button>)
}

export { Button }