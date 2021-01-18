import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'
import classTypes from 'classnames'

export enum ButtonSize {
	Large = 'lg',
	Small = 'sm'
}

export enum ButtonType {
	Primary = 'primary',
	Default = 'default',
	Danger = 'danger',
	Link = 'link'
}

interface BaseButtonProps {
	className?: string
	disabled?: boolean
	size?: ButtonSize
	btnType?: ButtonType
	children?: React.ReactNode
	href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: FC<ButtonProps> = (props) => {
	const {
		className,
		disabled,
		size,
		btnType,
		children,
		href,
		...restProps
	} = props
	const classes = classTypes('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		disabled: btnType === ButtonType.Link && disabled
	})

	if (btnType === ButtonType.Link && href) {
		return (
			<a className={classes} href={href} {...restProps}>
				{children}
			</a>
		)
	} else {
		return (
			<button className={classes} disabled={disabled} {...restProps}>
				{children}
			</button>
		)
	}
}
Button.defaultProps = {
	btnType: ButtonType.Default,
	disabled: false
}

export default Button
