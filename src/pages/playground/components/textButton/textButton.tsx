import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

const StyledTextButton = styled.button`
	display: flex;
	height: 64px;
	color: #fff;
	background-color: #d63c5e;
	border-radius: 12px;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 700;

	&:hover {
		box-shadow: 0 0 0 0.2rem rgba(214, 60, 94, 0.75);
	}
`;

interface ITextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
}

export const TextButton: FC<ITextButtonProps> = ({ text, ...props }) => {
	return <StyledTextButton {...props}>{text}</StyledTextButton>;
};
