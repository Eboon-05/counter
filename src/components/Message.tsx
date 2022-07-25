import { XIcon } from '@heroicons/react/solid'

interface Props {
    title: string,
    description?: string,
    type: 'error',
    className?: string,
    onClose?: (value: false) => void,
}

function Message(props: Props) {
        const {
                title,
                description,
                type,
                className,
                onClose
        } = props

        return (<div className={`w-full rounded-md p-3 relative
        ${type === 'error' && 'bg-red-400 text-white'}

        ${className}
    `} >
                <h2 className='text-lg font-semibold'>
                        {title}
                </h2>
                {description && <p>
                        {description}
                </p>}
                <button onClick={() => onClose && onClose(false)} className='absolute top-1 right-1'>
                        <XIcon className='w-4' />
                </button>
        </div>)
}

export { Message }