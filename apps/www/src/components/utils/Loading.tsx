import React, { FC } from 'react';
import loading_image from '../../assets/images/loading.gif';

export const Loading: FC = () => (
	<div className="flex justify-center items-center">
		<img src={loading_image} alt={'loading gnar'} className="w-full" />
	</div>
);
