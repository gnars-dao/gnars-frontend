import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

const StyledBaseButton = styled.button`
	/* display: flex; */
	/* flex-direction: row; */
	/* outline: none; */
	/* background-color: transparent; */
	height: 40px;
	/* border: 1px solid #bdc0cf; */
	border-radius: 10px;
`;

interface IBaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	noPadding?: boolean;
}

export const BaseButton: FC<IBaseButtonProps> = ({ children, className, noPadding, ...props }) => {
	return (
		<StyledBaseButton
			className={clsx('flex flex-row justify-center items-center', !noPadding && 'px-3', className)}
			{...props}
		>
			{children}
		</StyledBaseButton>
	);
};
