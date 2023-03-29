export interface ButtonProps {
  label: string
  onClick: (e: Event) => void
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      class="focus:shadow-outline whitespace-nowrap rounded-full bg-lime-400 py-2 px-4 font-bold text-white hover:bg-lime-500 focus:outline-none"
    >
      {props.label}
    </button>
  )
}
