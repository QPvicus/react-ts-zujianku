import React from 'react'
import {
	fireEvent,
	render,
	RenderResult,
	cleanup,
	wait,
	waitFor
} from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
const testProps: MenuProps = {
	defaultIndex: '0',
	onSelect: jest.fn(),
	className: 'test'
}
const verticalMenu: MenuProps = {
	mode: 'vertical'
}
const generateMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem index={'0'}>active</MenuItem>
			<MenuItem disabled index={'1'}>
				disabled
			</MenuItem>
			<MenuItem index={'2'}>Link3</MenuItem>
			<SubMenu title="subMenu">
				<MenuItem>drop</MenuItem>
			</SubMenu>
		</Menu>
	)
}
const createStyleFile = () => {
	const cssFile: string = `
		.viking-submenu {
			display:none
		}
		.viking-submenu.menu-opened {
      display:block;
    }
	`
	const style = document.createElement('style')
	style.type = 'text/css'
	style.innerHTML = cssFile
	return style
}
let wrapper: RenderResult,
	MenuElement: HTMLElement,
	activeElement: HTMLElement,
	disabledElement: HTMLElement
describe('test menu and menuItem component', () => {
	beforeEach(() => {
		wrapper = render(generateMenu(testProps))
		wrapper.container.append(createStyleFile())
		MenuElement = wrapper.getByTestId('test-menu')
		activeElement = wrapper.getByText('active')
		disabledElement = wrapper.getByText('disabled')
	})
	it('should render correct Menu and MenuItem based on defaultProps', () => {
		expect(MenuElement).toBeInTheDocument()
		expect(MenuElement).toHaveClass('viking-menu test')
		// expect(MenuElement.getElementsByTagName('li').length).toEqual(3)
		expect(MenuElement.querySelectorAll(':scope > li').length).toEqual(4)
		expect(activeElement).toHaveClass('menu-item is-active')
		expect(disabledElement).toHaveClass('menu-item is-disabled')
	})

	it('click items should change active and call the right callback', () => {
		const thirdItem = wrapper.getByText('Link3')
		fireEvent.click(thirdItem)
		expect(thirdItem).toHaveClass('is-active')
		expect(activeElement).not.toHaveClass('is-active')
		expect(testProps.onSelect).toHaveBeenCalledWith('2')
		fireEvent.click(disabledElement)
		expect(disabledElement).not.toHaveClass('is-active')
		expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
	})

	it('should render vertical mode when mode is to call the vertical', () => {
		cleanup()
		const wrapper = render(generateMenu(verticalMenu))
		const menuElement = wrapper.getByTestId('test-menu')
		expect(menuElement).toHaveClass('menu-vertical')
	})
	it('should show dropdown items when hover on SubMenu', async () => {
		expect(wrapper.getByText('drop')).not.toBeVisible()
		const dropdownElement = wrapper.getByText('drop')
		fireEvent.mouseEnter(dropdownElement)
		await waitFor(() => {
			expect(dropdownElement).toBeVisible()
		})
		fireEvent.click(dropdownElement)
		expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
	})
})
