import React, { FC } from 'react';
import loading_image from '../../assets/images/loadingV2.gif';

export const LoadingV2: FC = () => (
	<div className="flex justify-center items-center">
		<img src={loading_image} alt={'loading gnar'} className="w-full" />
	</div>
);
