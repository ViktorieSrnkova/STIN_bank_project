import useRequest from './useRequest';

type Hook = (userEmail: string) => Promise<void>;

export const useResetPassword = (): Hook => {
	const request = useRequest();

	const fn = async (userEmail: string): Promise<void> => {
		const p = {
			query: `
				mutation resetPasswordUser ($userEmail: String!) {
					resetPasswordUser (userEmail: $userEmail)
				}
			`,
			variables: {
				userEmail,
			},
		};

		await request({ payload: p });
	};
	return fn;
};
