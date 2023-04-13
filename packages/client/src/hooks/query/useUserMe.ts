import useAxios from 'axios-hooks';
import type { UseQueryResponse } from 'const/types';
import { API_URL } from 'const/config';
import useApp from 'hooks/useApp';

export interface User {
	email: string;
	id: string;
	state: string;
	created: string;
	instanceCount: number;
	activeInstances: number;
}

const useUserMe = (): UseQueryResponse<User> => {
	const { userJWT } = useApp();
	const [{ data, loading, error }, refetch] = useAxios(
		{
			url: `${API_URL}/graphql`,
			method: 'POST',
			data: {
				query: `{ userMe { created activeInstances inactiveInstances id email, state instanceCount activeInstances } }`,
				variables: {},
			},
			headers: {
				Authorization: userJWT,
			},
		},
		{
			useCache: false,
		},
	);

	return { isLoading: loading, error, data: data?.data.userMe, refetch: refetch as any };
};

export default useUserMe;
