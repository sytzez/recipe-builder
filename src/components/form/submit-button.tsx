export const SubmitButton = (props) => (
  <input
    type="submit"
    value={props.label}
    class="focus:shadow-outline cursor-pointer rounded-full bg-lime-400 py-2 px-4 font-bold text-white hover:bg-lime-500 focus:outline-none"
  />
)
