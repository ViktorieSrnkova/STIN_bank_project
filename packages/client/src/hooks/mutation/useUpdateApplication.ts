import useRequest from './useRequest';

type Hook = (id: string, replicas?: number, version?: string) => Promise<void>;

export const useUpdateApplication = (): Hook => {
	const request = useRequest();

	const fn = async (id: string, replicas?: number, version?: string): Promise<void> => {
		const p = {
			query: `
				mutation updateApplication ($id: String!, $replicas: Int!, $version: String!) {
					updateApplication (id: $id, replicas: $replicas, version: $version)
				}
			`,
			variables: { id, replicas, version },
		};

		const r = await request({ payload: p });
		return r.updateApplication;
	};
	return fn;
};
