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
	type: string;
	isDeleted?: boolean;
	domain: string;
	adminDomain: string;
	realVersion: string;
}

const useAdminApplicationts = (userId?: string): UseQueryResponse<Application[]> => {
	const { userJWT } = useApp();
	const [{ data, loading, error }, refetch] = useAxios(
		{
			url: `${API_URL}/graphql`,
			method: 'POST',
			data: {
				query: `
					query adminApplications ($userId: String!) {
						adminApplications (userId: $userId) {
							type
							isDeleted
							id
							size { dbSize reqSizeIn reqSizeOut }
							maxSize { dbSize reqSizeIn reqSizeOut }
							realVersion
							version
							adminDomain
							domain
							name
							config
						}
				}`,
				variables: { userId: userId ?? '-' },
			},
			headers: {
				Authorization: userJWT,
			},
		},
		{
			useCache: false,
		},
	);

	return { isLoading: loading, error, data: data?.data.adminApplications, refetch: refetch as any };
};

export default useAdminApplicationts;
