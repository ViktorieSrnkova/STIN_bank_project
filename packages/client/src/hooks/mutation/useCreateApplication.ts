import useRequest from './useRequest';

type Hook = (serverName: string) => Promise<void>;

export const useCreateApplication = (): Hook => {
	const request = useRequest();

	const fn = async (serverName: string): Promise<void> => {
		const p = {
			query: `
				mutation createApplication ($serverName: String!) {
					createApplication (serverName: $serverName)
				}
			`,
			variables: {
				serverName,
			},
		};

		await request({ payload: p });
	};
	return fn;
};
