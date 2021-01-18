import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationProps =
	| 'zoom-in-top'
	| 'zoom-in-left'
	| 'zoom-in-right'
	| 'zoom-in-bottom'

/* interface TransitionProps extends CSSTransitionProps {
	animation?: AnimationProps
} */
interface props {
	animation?: AnimationProps
	wrapper?: boolean
}
type TransitionProps = props & CSSTransitionProps
const Transition: FC<TransitionProps> = (props) => {
	const { children, animation, classNames, wrapper, ...restProps } = props

	return (
		<CSSTransition
			classNames={classNames ? classNames : animation}
			{...restProps}
		>
			{wrapper ? <div>{children}</div> : children}
		</CSSTransition>
	)
}

Transition.defaultProps = {
	unmountOnExit: true,
	appear: true
}

export default Transition
