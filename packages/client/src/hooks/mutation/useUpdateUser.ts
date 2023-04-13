import useRequest from './useRequest';

type Hook = (oldPassword: string, newPassword: string) => Promise<void>;

export const useUpdateUser = (): Hook => {
	const request = useRequest();

	const fn = async (oldPassword: string, newPassword: string): Promise<void> => {
		const p = {
			query: `
				mutation updateUser ($oldPassword: String!, $newPassword: String!) {
					updateUser (newPassword: $newPassword, oldPassword: $oldPassword)
				}
			`,
			variables: {
				oldPassword,
				newPassword,
			},
		};

		const r = await request({ payload: p });
		return r.updateUser;
	};
	return fn;
};
