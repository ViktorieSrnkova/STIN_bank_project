import { Button, Collapse, Form, Input, InputNumber, Modal, Popconfirm, Select, Spin, notification } from 'antd';
import { useDeleteApplication } from 'hooks/mutation/useDeleteApplication';
import { useUpdateApplication } from 'hooks/mutation/useUpdateApplication';
import useVersions from 'hooks/query/seVersions';
import { Application } from 'hooks/query/useApplicationts';
import { useState } from 'react';
import dayjs from 'dayjs';
import { slowMe } from 'utils/promise';

const { Panel } = Collapse;

interface Props {
	item?: Application | undefined;
	setItem: (item?: Application | undefined) => void;
	refetch: () => Promise<any>;
}

const DetailApplication: React.FC<Props> = ({ refetch, setItem, item }) => {
	const { data, isLoading } = useVersions();
	const [saving, setSaving] = useState(false);
	const updateApplication = useUpdateApplication();
	const [api, contextHolder] = notification.useNotification();
	const [deletingMap, setDeletingMap] = useState<Record<string, boolean>>({});
	const deleteApplication = useDeleteApplication();

	const onSaveFormFinish = async (values: { replicas: number; version: string }): Promise<void> => {
		if (!item) {
			return;
		}
		setSaving(true);
		const fn = async (): Promise<void> => {
			await updateApplication(item.id, values.replicas, values.version);
		};
		await slowMe(fn);
		await refetch();
		api.success({
			message: <>Application has been updated!</>,
			placement: 'topRight',
		});

		setSaving(false);
	};
	return (
		<>
			{contextHolder}

			<Modal
				width="40%"
				title={`Detail ${item?.name}`}
				open={!!item}
				onCancel={() => setItem(undefined)}
				footer={<Button onClick={() => setItem(undefined)}>Close</Button>}
			>
				{isLoading ? (
					<Spin />
				) : (
					<Form
						layout="vertical"
						initialValues={{
							replicas: item?.config.replicas,
							version: item?.version,
						}}
						onFinish={onSaveFormFinish}
						autoComplete="off"
					>
						<Form.Item label="Replicas" name="replicas">
							<InputNumber min={0} max={10} style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item label="Version" name="version">
							<Select
								style={{ width: '100%' }}
								options={[
									{
										value: 'latest',
										label: 'latest',
									},
									...(data?.map(d => ({
										value: d.version,
										label: `${d.version} (${dayjs(d.created).format('HH:MM MM-DD-YYYY')})`,
									})) ?? []),
								]}
							/>
						</Form.Item>
						<Form.Item>
							<Button loading={saving} type="primary" htmlType="submit" style={{ width: '100%' }}>
								Save
							</Button>
						</Form.Item>
					</Form>
				)}
				<Collapse>
					<Panel header={<span style={{ color: 'red', fontWeight: 'bold' }}>Danger zone</span>} key="1">
						<Popconfirm
							placement="left"
							title="Are you sure to delete this Apengine server?"
							onConfirm={() => {
								if (!item) {
									return;
								}
								setTimeout(async () => {
									const fn = async (): Promise<void> => {
										setDeletingMap({ ...deletingMap, [item.id]: true });
										await deleteApplication(item!.id);
									};
									await slowMe(fn);
									await refetch();
									setDeletingMap({ ...deletingMap, [item.id]: false });
									setItem(undefined);
									api.success({
										message: (
											<>
												{'Application '}
												<b key="text">{item.name}</b>
												{' has been deleted!'}
											</>
										),
										placement: 'topRight',
									});
								}, 1);
							}}
							okText="Yes"
							cancelText="No"
						>
							<Button loading={deletingMap[item?.id ?? 'err']}>Delete</Button>
						</Popconfirm>
					</Panel>
				</Collapse>
			</Modal>
		</>
	);
};

export default DetailApplication;
