import React, { FC, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Playground } from '../../pages/playground/playground';
import { Footer } from '../Footer/Footer';
import { NoMatch } from './components/NoMatch';
import { Monitoring } from './Monitoring';
import { Top } from './Top';

export const Content: FC = () => (
	<Fragment>
		<Monitoring />
		<Routes>
			<Route path="/connect_wallet" element={<Top />} />
			<Route path="/playground" element={<Playground />} />
			<Route path="/gnar/:linkId" element={<Top />} />
			<Route path="/" element={<Top />} />
			<Route path="*" element={<NoMatch />} />
		</Routes>
		<div className="py-8">
			<Footer />
		</div>
	</Fragment>
);
