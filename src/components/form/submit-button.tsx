export const SubmitButton = (props) => (
  <input
    type="submit"
    value={props.label}
    class="focus:shadow-outline mr-2 cursor-pointer rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 focus:outline-none"
  />
)
