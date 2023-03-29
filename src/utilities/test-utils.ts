export const waitForEvent = async (element: Element, event: string) => (
  new Promise<void>((resolve) => {
    const handler = () => {
      element.removeEventListener(event, handler)
      resolve()
    }
    element.addEventListener(event, handler)
  })
)
