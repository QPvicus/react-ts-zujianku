import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

const testProps: ButtonProps = {
	size: ButtonSize.Large,
	btnType: ButtonType.Primary,
	className: 'customer'
}

const disabledProps: ButtonProps = {
	disabled: true,
	onClick: jest.fn()
}
test('our first test', () => {
	const wrapper = render(<Button>Nice</Button>)
	const element = wrapper.queryAllByText('Nice')
	expect(element).toBeTruthy()
	// expect(element).toBeInTheDocument()
	// expect(element.tagName).toEqual('BUTTON')
	// expect(element).toHaveAttribute('btn btn-default')
})

describe('test Button component', () => {
	it('should render the correct default component', () => {
		const wrapper = render(<Button>Nice</Button>)
		const element = wrapper.getByText('Nice')
		expect(element).toBeTruthy()
		expect(element).toBeInTheDocument()
		// expect(element.tagName).toEqual('BUTTON')
		expect(element).toHaveClass('btn btn-default')
	})
	it('should render the correct component based on different props', () => {
		const wrapper = render(<Button {...testProps}>Nice</Button>)
		const element = wrapper.getByText('Nice')
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('btn btn-primary btn-lg')
	})
	it('should render a link like when btnType equals link and href is provide', () => {
		const wrapper = render(
			<Button btnType={ButtonType.Link} href="http://www.abnc.com">
				Link
			</Button>
		)
		const element = wrapper.getByText('Link')
		expect(element).toBeInTheDocument()
		expect(element.tagName).toEqual('A')
		expect(element).toHaveClass('btn btn-link')
	})
	it('should render disabled button when disabled set to true', () => {
		const wrapper = render(<Button {...disabledProps}>Nice</Button>)
		const element = wrapper.getByText('Nice') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element.disabled).toBeTruthy()
		fireEvent.click(element)
		expect(disabledProps.onClick).not.toHaveBeenCalled()
	})
})
