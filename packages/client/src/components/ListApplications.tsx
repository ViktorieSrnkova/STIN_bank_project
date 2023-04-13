import { Divider } from 'antd';
import useApplicationts from 'hooks/query/useApplicationts';
import useUserMe from 'hooks/query/useUserMe';
import NewApplication from './NewApplication';
import ApplicationsTable from './ApplicationsTable';

const ListApplications: React.FC = () => {
	const { data, isLoading, refetch } = useApplicationts();
	const { data: dataUserMe, isLoading: isLoadingUserMe, refetch: refetchUserMer } = useUserMe();
	return (
		<>
			<NewApplication
				refetch={async () => {
					await refetch();
					await refetchUserMer();
					return Promise.resolve();
				}}
				dataUserMe={dataUserMe}
				isLoadingUserMe={isLoadingUserMe}
			/>
			<Divider />
			<ApplicationsTable
				refetch={async () => {
					await refetch();
					await refetchUserMer();
					return Promise.resolve();
				}}
				data={data ?? []}
				loading={isLoading}
			/>
		</>
	);
};
export default ListApplications;
