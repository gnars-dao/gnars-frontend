import { ComponentType, FC } from 'react';
import { Location, NavigateFunction, Params, useLocation, useNavigate, useParams } from 'react-router-dom';

export interface IRouterProps<T extends string = string> {
	location: Location;
	navigate: NavigateFunction;
	params: Readonly<Params<T>>;
}

export const withRouter = <
	T extends string,
	P extends IRouterProps<T> = IRouterProps<T>,
	R = Omit<P, keyof IRouterProps<T>>
>(
	Component: ComponentType<P>
): ComponentType<R> => {
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	const Wrapper: FC<R> = (props: any) => {
		const location = useLocation();
		const navigate = useNavigate();
		const params = useParams<T>();

		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Component location={location} navigate={navigate} params={params} {...props} />;
	};

	return Wrapper;
};
