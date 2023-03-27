export interface ButtonProps {
    label: string
    onClick: (e: Event) => void
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-nowrap"
        >
            {props.label}
        </button>
    )
}
