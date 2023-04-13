import useRequest from './useRequest';

type Hook = (version: string) => Promise<void>;

export const useCreateVersion = (): Hook => {
	const request = useRequest();

	const fn = async (version: string): Promise<void> => {
		const p = {
			query: `
				mutation createVersion ($version: String!) {
					createVersion (version: $version)
				}
			`,
			variables: { version },
		};

		const r = await request({ payload: p });
		return r.createVersion;
	};
	return fn;
};
