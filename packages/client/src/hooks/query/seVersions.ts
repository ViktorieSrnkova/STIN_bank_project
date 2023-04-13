import useAxios from 'axios-hooks';
import type { UseQueryResponse } from 'const/types';
import { API_URL } from 'const/config';
import useApp from 'hooks/useApp';

export interface Version {
	id: string;
	created: string;
	version: string;
}

const useVersions = (): UseQueryResponse<Version[]> => {
	const { userJWT } = useApp();
	const [{ data, loading, error }, refetch] = useAxios(
		{
			url: `${API_URL}/graphql`,
			method: 'POST',
			data: {
				query: `{ versions { id version created } }`,
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

	return { isLoading: loading, error, data: data?.data.versions, refetch: refetch as any };
};

export default useVersions;
