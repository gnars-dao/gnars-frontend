import { FC, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Top } from '../Top';

export const NoMatch: FC = () => {
	const { addToast } = useToasts();

	useEffect(() => {
		addToast('There is no matched url', {
			appearance: 'error',
			autoDismiss: true,
		});
	}, [addToast]);
	return <Top />;
};
