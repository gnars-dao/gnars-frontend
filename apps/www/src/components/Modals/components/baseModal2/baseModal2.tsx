import { FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import xIcon from '../../../../assets/images/x-icon.png';

const Background = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	align-items: center;
	justify-content: center;
`;

const CloseButton = styled.button`
	position: fixed;
	top: 16px;
	right: 32px;
	display: flex;
	box-sizing: border-box;
	flex-direction: row;
	border: none;
	cursor: pointer;
	height: 40px;
	width: 40px;
	border-radius: 40px;
	background-color: #f4f4f8;
	padding: 12px;
	align-items: center;
	justify-content: center;

	&:hover {
		opacity: 0.7;
	}
`;

const ModalWrapper = styled.div`
	display: flex;
	max-height: 80vh;
	max-width: 100vw;
`;

interface IBaseModal2Props {
	children?: ReactNode;
	className?: string;
	blur?: boolean;
	closeButton?: boolean;
	onClose: () => void;
}

export const BaseModal2: FC<IBaseModal2Props> = ({ children, className, blur, closeButton, onClose }) => {
	const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

	useEffect(() => {
		if (blur) {
			const styleElement = document.createElement('style');
			styleElement.textContent = `
				#root {
					filter: blur(10px);
				}
			`;
			document.head.append(styleElement);

			return () => {
				document.head.removeChild(styleElement);
			};
		}
	}, [blur]);

	const handlePropagation = useCallback((event: MouseEvent<HTMLDivElement>) => event.stopPropagation(), []);

	if (!modalRoot) {
		return null;
	}

	return createPortal(
		<Background className={className} onClick={onClose}>
			{closeButton && (
				<CloseButton>
					<img src={xIcon} alt="Button to close modal" />
				</CloseButton>
			)}
			<ModalWrapper onClick={handlePropagation}>{children}</ModalWrapper>
		</Background>,
		modalRoot
	);
};
