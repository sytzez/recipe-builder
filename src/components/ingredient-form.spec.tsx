import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "solid-testing-library";
import { IngredientForm } from "./ingredient-form";
import { waitForEvent } from "../utilities/test-utils";

describe('<IngredientForm />', () => {
  const setup = () => {
    const onSubmitMock = vi.fn()

    const rendered = render(() =>
      <IngredientForm
        ingredient={null}
        title="New ingredient"
        submitLabel="Create ingredient"
        onSubmit={onSubmitMock}
      />
    )

    const submitButton = rendered.queryByText('Create ingredient')!
    const nameInput = rendered.queryByLabelText<HTMLInputElement>('Name')!
    const unitTypeInput = rendered.queryByLabelText<HTMLSelectElement>('Unit of measurement')!
    const costInput = rendered.queryByLabelText<HTMLInputElement>('Cost per unit of measurement')!

    return { ...rendered, onSubmitMock, submitButton, nameInput, unitTypeInput, costInput }
  }

  it('renders', () => {
    const { container, unmount } = setup()
    expect(container.innerHTML).toMatchSnapshot()
    unmount()
  })

  it('does not fire submit when incomplete', async () => {
    const { container, unmount, queryByText, onSubmitMock } = setup()

    const submitButton = queryByText('Create ingredient')!

    const buttonClicked = waitForEvent(submitButton, 'click')
    fireEvent.click(submitButton)
    await buttonClicked

    expect(onSubmitMock).not.toHaveBeenCalled()

    expect(container.innerHTML).toMatchSnapshot()

    unmount()
  })

  it('show validation errors', async () => {
    const { container, unmount, queryByText, queryByLabelText, onSubmitMock, submitButton, nameInput, unitTypeInput, costInput } = setup()

    fireEvent.change(nameInput, {target: {value: 'A name'}})
    fireEvent.change(unitTypeInput, {target: {value: 'units'}})
    fireEvent.change(costInput, {target: {value: '-2'}})

    const buttonClicked = waitForEvent(submitButton, 'click')
    fireEvent.click(submitButton)
    await buttonClicked

    expect(onSubmitMock).not.toHaveBeenCalled()

    const errorElement = container.querySelector('.font-bold.text-red-600')
    expect(errorElement).toBeTruthy()
    expect(errorElement!.textContent).toBeTruthy()

    expect(container.innerHTML).toMatchSnapshot()

    unmount()
  })

  it('emits an onSubmit event when valid and submitted', async () => {
    const { unmount, queryByText, queryByLabelText, onSubmitMock, submitButton, nameInput, unitTypeInput, costInput } = setup()

    fireEvent.change(nameInput, {target: {value: 'A name'}})
    fireEvent.change(unitTypeInput, {target: {value: 'units'}})
    fireEvent.change(costInput, {target: {value: '2'}})

    const buttonClicked = waitForEvent(submitButton, 'click')
    fireEvent.click(submitButton)
    await buttonClicked

    expect(onSubmitMock).toHaveBeenCalled()

    unmount()
  })
})
