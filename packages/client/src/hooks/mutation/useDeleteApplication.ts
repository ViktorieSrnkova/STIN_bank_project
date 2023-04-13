import useRequest from './useRequest';

type Hook = (id: string) => Promise<void>;

export const useDeleteApplication = (): Hook => {
	const request = useRequest();

	const fn = async (id: string): Promise<void> => {
		const p = {
			query: `
				mutation deleteApplication ($id: String!) {
					deleteApplication (id: $id)
				}
			`,
			variables: {
				id,
			},
		};

		await request({ payload: p });
	};
	return fn;
};
