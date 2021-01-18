import React, { FC, createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type onSelectCallback = (selectIndex: string) => void
export interface MenuProps {
	defaultIndex?: string
	className?: string
	mode?: MenuMode
	style?: React.CSSProperties
	onSelect?: (selectIndex: string) => void
	defaultOpenSubMenus?: string[]
}
interface IMenuContext {
	index: string
	onSelect?: onSelectCallback
	mode?: MenuMode
	defaultOpenSubMenus?: string[]
}
export const MenuContext = createContext<IMenuContext>({ index: '0' })
const Menu: FC<MenuProps> = (props) => {
	const {
		className,
		defaultIndex,
		mode,
		style,
		onSelect,
		children,
		defaultOpenSubMenus
	} = props
	const [currentActive, setCurrentActive] = useState(defaultIndex)
	const classes = classNames('viking-menu', className, {
		'menu-vertical': mode === 'vertical',
		'menu-horizontal': mode !== 'vertical'
	})
	const handleClick = (index: string) => {
		setCurrentActive(index)
		onSelect && onSelect(index)
	}
	const passedContext: IMenuContext = {
		index: currentActive ? currentActive : '0',
		onSelect: handleClick,
		mode,
		defaultOpenSubMenus
	}
	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<MenuItemProps>
			const { displayName } = childElement.type
			if (displayName === 'MenuItem' || displayName === 'SubMenu') {
				return React.cloneElement(childElement, {
					index: index.toString()
				})
			} else {
				console.error(
					'Warning: Menu must has a child which is not a MenuItem component'
				)
			}
		})
	}
	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={passedContext}>
				{renderChildren()}
			</MenuContext.Provider>
		</ul>
	)
}

Menu.defaultProps = {
	mode: 'horizontal',
	defaultIndex: '0',
	defaultOpenSubMenus: []
}

export default Menu
