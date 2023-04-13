import axios from 'axios';
import { API_URL } from 'const/config';
import useApp from 'hooks/useApp';

type Hook = ({ payload }: { payload: { query: string } }) => Promise<any>;

const useRequest = (): Hook => {
	const { pushErrors, pushError, userJWT } = useApp();
	return async ({ payload }: { payload: { query: string } }): Promise<any> => {
		try {
			const { data } = await axios.post(`${API_URL}/graphql`, payload, { headers: { Authorization: userJWT } });

			if (Array.isArray(data.errors)) {
				const errs = data.errors.map(({ message }: { message: string }) => message).join(', ');
				pushError({ id: `id${Math.random()}`, message: errs });
				throw new Error(errs);
			}

			return data?.data;
		} catch (err: any) {
			if (err.response.data.errors && Array.isArray(err.response.data.errors)) {
				const errs = err.response.data.errors.map(({ message }: { message: string }) => ({
					message,
					d: `id${Math.random()}`,
				}));
				pushErrors(errs);
			}
			pushError({ id: `id${Math.random()}`, message: err.toString() });
			throw err;
		}
		return false;
	};
};

export default useRequest;
