import useAxios from 'axios-hooks';
import type { UseQueryResponse } from 'const/types';
import { API_URL } from 'const/config';
import useApp from 'hooks/useApp';

export interface User {
	email: string;
	id: string;
	instanceCount: number;
	state: string;
	created: string;
}

const useUsers = (): UseQueryResponse<User[]> => {
	const { userJWT } = useApp();
	const [{ data, loading, error }, refetch] = useAxios(
		{
			url: `${API_URL}/graphql`,
			method: 'POST',
			data: {
				query: `{ users { created activeInstances inactiveInstances id email instanceCount state } }`,
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

	return { isLoading: loading, error, data: data?.data.users, refetch: refetch as any };
};

export default useUsers;
