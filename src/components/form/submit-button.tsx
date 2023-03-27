export const SubmitButton = (props) => (
  <input
    type="submit"
    value={props.label}
    class="focus:shadow-outline mr-2 cursor-pointer rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
  />
)
