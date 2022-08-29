import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import xIcon from '../../../../assets/images/x-icon.png';
import classes from './baseModal.module.css';

interface IBackdropProps {
	onDismiss: () => void;
}

export const Backdrop: FC<IBackdropProps> = ({ onDismiss }) => {
	return <div className={classes.backdrop} onClick={onDismiss} />;
};

interface IBaseModalOverlayProps {
	title?: string;
	content?: ReactNode;
	transparent: boolean;
	closeButton: boolean;
	onDismiss: () => void;
}

const BaseModalOverlay: FC<IBaseModalOverlayProps> = ({ title, content, transparent, closeButton, onDismiss }) => (
	<div className={clsx(classes.modal, !transparent && 'bg-modalBackground')}>
		{closeButton && (
			<button className={classes.closeButton} onClick={onDismiss}>
				<img src={xIcon} alt="Button to close modal" />
			</button>
		)}
		{title && <h3 className="pt-10">{title}</h3>}
		<div className={classes.content}>{content}</div>
	</div>
);

interface IBaseModalProps {
	title?: string;
	content?: ReactNode;
	transparent: boolean;
	closeButton: boolean;
	onDismiss: () => void;
}

export const BaseModal: FC<IBaseModalProps> = ({ title, content, transparent, closeButton, onDismiss }) => (
	<>
		{ReactDOM.createPortal(<Backdrop onDismiss={onDismiss} />, document.getElementById('backdrop-root')!)}
		{ReactDOM.createPortal(
			<BaseModalOverlay
				title={title}
				content={content}
				transparent={transparent}
				closeButton={closeButton}
				onDismiss={onDismiss}
			/>,
			document.getElementById('overlay-root')!
		)}
	</>
);
