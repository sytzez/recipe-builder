export const CancelButton = (props) => (
  <button
    onClick={props.onClick}
    class="focus:shadow-outline rounded-full bg-gray-100 py-2 px-4 font-bold text-black hover:bg-gray-300 focus:outline-none"
  >
    Cancel
  </button>
)
