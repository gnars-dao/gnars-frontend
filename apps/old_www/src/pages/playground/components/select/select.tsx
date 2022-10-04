import { FC, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
	height: 64px;
	background-color: #fff;
	border: 1px solid #e2e3e8;
	border-radius: 12px;
	padding-left: 12px;
	cursor: pointer;
	appearance: none;
	background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 5px center;
	background-size: 16px 12px;
	width: 100%;
`;

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: FC<ISelectProps> = ({ children, ...props }) => {
	return <StyledSelect {...props}>{children}</StyledSelect>;
};
