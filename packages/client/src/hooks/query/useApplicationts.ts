import useAxios from 'axios-hooks';
import type { UseQueryResponse } from 'const/types';
import { API_URL } from 'const/config';
import useApp from 'hooks/useApp';

interface Size {
	dbSize: number;
	reqSizeIn: number;
	reqSizeOut: number;
}

export interface Application {
	config: any;
	id: string;
	maxSize: Size;
	size: Size;
	name: string;
	version: string;
	isDeleted?: boolean;
	type: string;
	domain: string;
	adminDomain: string;
	realVersion: string;
}

const useApplicationts = (): UseQueryResponse<Application[]> => {
	const { userJWT } = useApp();
	const [{ data, loading, error }, refetch] = useAxios(
		{
			url: `${API_URL}/graphql`,
			method: 'POST',
			data: {
				query: `
					{
						applications {
							type
							id
							size { dbSize reqSizeIn reqSizeOut }
							maxSize { dbSize reqSizeIn reqSizeOut }
							realVersion
							adminDomain
							version
							domain
							name
							config
						}
					}
			`,
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

	return { isLoading: loading, error, data: data?.data.applications, refetch: refetch as any };
};

export default useApplicationts;
