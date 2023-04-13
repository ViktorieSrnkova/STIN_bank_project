import useRequest from './useRequest';

type Hook = (userEmail: string, userPassword: string) => Promise<string>;

export const useLoginUser = (): Hook => {
	const request = useRequest();

	const fn = async (userEmail: string, userPassword: string): Promise<string> => {
		const p = {
			query: `
				mutation loginUser ($userEmail: String!, $userPassword: String!) {
					loginUser (userPassword: $userPassword, userEmail: $userEmail)
				}
			`,
			variables: {
				userEmail,
				userPassword,
			},
		};

		const r = await request({ payload: p });
		return r.loginUser;
	};
	return fn;
};
