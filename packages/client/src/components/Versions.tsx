import { Table } from 'antd';
import useVersions, { Version } from 'hooks/query/seVersions';
import dayjs from 'dayjs';
import CreateVersion from './CreateVersion';

const Versions: React.FC = () => {
	const { data, refetch, isLoading } = useVersions();

	const columns = [
		{
			title: 'Created',
			render: (item: Version) => <>{dayjs(item.created).format('HH:MM DD-MM-YYYY')}</>,
		},
		{
			title: 'Version',
			dataIndex: 'version',
			key: 'version',
		},
	];

	return (
		<>
			<CreateVersion refetch={refetch} />
			<br />
			<Table loading={isLoading} rowKey="id" dataSource={data} columns={columns} />
		</>
	);
};

export default Versions;
