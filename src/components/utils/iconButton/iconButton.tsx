import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, useMemo } from 'react';
import Svg from 'react-inlinesvg';
import styled from 'styled-components';
import bidsIcon from '../../../assets/images/bids.svg';
import bookIcon from '../../../assets/images/book.svg';
import peopleIcon from '../../../assets/images/people.svg';
import playIcon from '../../../assets/images/play.svg';
import tickIcon from '../../../assets/images/tick.svg';
import { BaseButton } from '../baseButton/baseButton';

type IIconType = 'bids' | 'book' | 'people' | 'play' | 'tick';

const Icon = styled(Svg)`
	width: 20px;
	max-height: 17px;
	max-width: 20px;
`;

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	icon: IIconType;
	design: 'transparent' | 'primary';
}

export const IconButton: FC<IIconButtonProps> = ({ text, icon, design, ...props }) => {
	const iconData = useMemo(() => {
		switch (icon) {
			case 'bids':
				return bidsIcon;
			case 'book':
				return bookIcon;
			case 'people':
				return peopleIcon;
			case 'play':
				return playIcon;
			case 'tick':
				return tickIcon;
		}
	}, [icon]);

	return (
		<BaseButton
			className={clsx(
				design === 'primary' ? 'bg-primary' : 'border border-borderColor',
				'text-primaryText hover:bg-hoverLight w-full lg:w-auto'
			)}
			{...props}
		>
			<div className="flex flex-row items-center gap-1 max-w-20px">
				<Icon className={clsx(design === 'transparent' && 'opacity-50 dark:text-white')} src={iconData} />
				<div className={clsx('flex font-bold', design === 'transparent' && 'dark:text-white')}>{text}</div>
			</div>
		</BaseButton>
	);
};
