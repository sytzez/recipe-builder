export interface ButtonProps {
  label: string
  onClick: (e: Event) => void
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      class="focus:shadow-outline whitespace-nowrap rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
    >
      {props.label}
    </button>
  )
}
