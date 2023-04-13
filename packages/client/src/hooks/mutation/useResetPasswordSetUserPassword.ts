import useRequest from './useRequest';

type Hook = (token: string, password: string) => Promise<void>;

export const useResetPasswordSetUserPassword = (): Hook => {
	const request = useRequest();

	const fn = async (token: string, password: string): Promise<void> => {
		const p = {
			query: `
				mutation resetPasswordSetUserPassword ($token: String!, $password: String!) {
					resetPasswordSetUserPassword (token: $token, password: $password)
				}
			`,
			variables: {
				token,
				password,
			},
		};

		await request({ payload: p });
	};
	return fn;
};
