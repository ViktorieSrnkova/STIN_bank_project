import { Button, Space, Table, Tag } from 'antd';
import { Application } from 'hooks/query/useApplicationts';
import React, { useState } from 'react';
import { DatabaseOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import SizeBar from './SizeBar';
import DetailApplication from './DetailApplication';
import Box from './Box';

interface Props {
	loading: boolean;
	data: Application[];
	refetch: () => Promise<any>;
}

const ApplicationsTable: React.FC<Props> = ({ refetch, loading, data }) => {
	const [itemModal, setItemModal] = useState<Application | undefined>(undefined);
	return (
		<>
			<DetailApplication
				item={itemModal}
				setItem={setItemModal}
				refetch={refetch}
				key={itemModal?.id ?? 'empty'}
			/>

			<Table
				loading={loading}
				rowKey="id"
				dataSource={data}
				columns={[
					{
						title: '',
						render: (item: Application) => (
							<Space direction="vertical">
								<img src="/logo.png" alt="apengine logo" style={{ width: 25 }} />
								<Tag>{item.type}</Tag>
								{item.isDeleted === true && <Tag color="red">DELETED</Tag>}
							</Space>
						),
					},
					{
						title: 'Domain',
						render: (item: Application) => (
							<Box display="flex" flexDirection="column">
								<a href={item.domain} target="_blank" rel="noreferrer">
									{item.domain}
								</a>
								<a href={item.adminDomain} target="_blank" rel="noreferrer">
									{item.adminDomain}
								</a>
							</Box>
						),
					},
					{
						title: 'Name',
						dataIndex: 'name',
						key: 'name',
					},
					{
						title: 'Version',
						dataIndex: 'realVersion',
						key: 'realVersion',
					},
					{
						title: 'Size [MB]',
						render: (item: Application) => (
							<div
								style={{
									width: 150,
								}}
							>
								<SizeBar
									size={item.size.dbSize}
									maxSize={item.maxSize.dbSize}
									title="Database usage"
									icon={<DatabaseOutlined />}
								/>
								<SizeBar
									size={item.size.reqSizeIn}
									maxSize={item.maxSize.reqSizeIn}
									title="Request transfer input usage"
									icon={<LoginOutlined />}
								/>
								<SizeBar
									size={item.size.reqSizeOut}
									maxSize={item.maxSize.reqSizeOut}
									title="Request transfer output usage"
									icon={<LogoutOutlined />}
								/>
							</div>
						),
					},
					{
						title: 'Action',
						render: (item: Application) => (
							<Button disabled={item.isDeleted === true} onClick={() => setItemModal(item)}>
								Detail
							</Button>
						),
					},
				]}
			/>
		</>
	);
};

export default ApplicationsTable;
