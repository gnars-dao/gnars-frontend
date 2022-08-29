import React, { FC } from 'react';
import { useReverseENSLookUp } from './ensLookup';

interface IShortAddressProps {
	address: string;
}

export const ShortAddress: FC<IShortAddressProps> = ({ address }) => {
	const shortAddress = address && [address.substr(0, 6), address.substr(38, 4)].join('...');
	const ens = useReverseENSLookUp(address);
	return <>{ens ? ens : shortAddress}</>;
};
