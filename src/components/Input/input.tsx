import { IconProp } from '@fortawesome/fontawesome-svg-core'
import React, {
	ChangeEvent,
	FC,
	InputHTMLAttributes,
	ReactElement
} from 'react'
import classNames from 'classnames'
import Icon from '../icon/icon'
type InputSize = 'lg' | 'sm'

export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
	disabled?: boolean
	size?: InputSize
	icon?: IconProp
	prepend?: string | ReactElement
	append?: string | ReactElement
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
	const { disabled, size, icon, prepend, append, style, ...restProps } = props
	const classes = classNames('viking-input-wrapper', {
		[`input-size-${size}`]: size,
		'is-disabled': disabled,
		'input-group': prepend || append,
		'input-group-append': !!append,
		'input-group-prepend': !!prepend
	})
	return (
		// 根据属性判定是否要加特定的节点
		<div className={classes} style={style} {...restProps}>
			{prepend && <div className="viking-input-group-prepend">{prepend}</div>}
			{icon && (
				<div className="icon-wrapper">
					<Icon icon={icon} title={`title-${icon}`} />
				</div>
			)}
			<input
				className="viking-input-inner"
				disabled={disabled}
				{...restProps}
			/>
			{append && <div className="viking-input-group-append">{append}</div>}
		</div>
	)
}

export default Input
