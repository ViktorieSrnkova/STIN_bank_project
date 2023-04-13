import { Button, Table } from 'antd';
import useUsers, { User } from 'hooks/query/useUsers';
import dayjs from 'dayjs';
import { useState } from 'react';
import useAdminApplicationts from 'hooks/query/useAdminApplicationts';
import ApplicationsTable from './ApplicationsTable';

const Users: React.FC = () => {
	const [activeUserId, setActiveUserId] = useState<undefined | string>();
	const { data: appData, isLoading: appIsLoading, refetch } = useAdminApplicationts(activeUserId);
	const { data, isLoading } = useUsers();

	const columns = [
		{
			title: 'Created',
			render: (item: User) => <>{dayjs(item.created).format('HH:MM DD-MM-YYYY')}</>,
		},
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'State',
			dataIndex: 'state',
			key: 'state',
		},
		{
			title: 'inactiveInstances',
			dataIndex: 'inactiveInstances',
			key: 'inactiveInstances',
		},
		{
			title: 'activeInstances',
			dataIndex: 'activeInstances',
			key: 'activeInstances',
		},
		{
			title: 'instanceCount',
			dataIndex: 'instanceCount',
			key: 'instanceCount',
		},
	];
	return (
		<>
			<Table
				expandable={{
					expandedRowRender: () => (
						<ApplicationsTable refetch={refetch} data={appData ?? []} loading={appIsLoading} />
					),
					onExpand: (_, record: User) => setActiveUserId(record.id),
				}}
				loading={isLoading}
				rowKey="id"
				dataSource={data}
				columns={columns}
			/>
		</>
	);
};

export default Users;
