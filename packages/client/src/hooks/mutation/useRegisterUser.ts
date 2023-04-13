import useRequest from './useRequest';

type Hook = (userEmail: string, userPassword: string) => Promise<void>;

export const useRegisterUser = (): Hook => {
	const request = useRequest();

	const fn = async (userEmail: string, userPassword: string): Promise<void> => {
		const p = {
			query: `
				mutation registerUser ($userEmail: String!, $userPassword: String!) {
					registerUser (userPassword: $userPassword, userEmail: $userEmail)
				}
			`,
			variables: {
				userEmail,
				userPassword,
			},
		};

		const r = await request({ payload: p });
		return r.registerUser;
	};
	return fn;
};
