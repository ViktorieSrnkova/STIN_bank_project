/* eslint-disable no-console */
import { Alert, Button, Collapse, Form, Input, notification, Spin } from 'antd';
import { useCreateApplication } from 'hooks/mutation/useCreateApplication';
import { User } from 'hooks/query/useUserMe';
import { useState } from 'react';
import { slowMe } from 'utils/promise';
import Box from './Box';

const { Panel } = Collapse;

interface Props {
	dataUserMe: User | undefined;
	isLoadingUserMe: boolean;
	refetch: () => Promise<any>;
}

const NewApplication: React.FC<Props> = ({ dataUserMe, isLoadingUserMe, refetch }) => {
	const [isError, setError] = useState(false);
	const [creating, setCreating] = useState(false);
	const [form] = Form.useForm();

	const createApplication = useCreateApplication();
	const [api, contextHolder] = notification.useNotification();

	const onFinish = async (values: { serverName: string }): Promise<void> => {
		setError(false);
		setCreating(true);
		try {
			const fn = async (): Promise<void> => {
				await createApplication(values.serverName);
			};
			await slowMe(fn);
			await refetch();

			api.info({
				message: (
					<>
						{'Application '}
						<b key="text">{values.serverName}</b>
						{' has been created!'}
					</>
				),
				placement: 'topRight',
			});

			form.resetFields();
		} catch {
			setError(true);
		} finally {
			setCreating(false);
		}
	};

	const onFinishFailed = (errorInfo: any): void => {
		console.log('Failed:', errorInfo);
	};

	if (isLoadingUserMe) {
		return <Spin />;
	}

	const limitInstancesError = dataUserMe?.instanceCount === dataUserMe?.activeInstances;
	return (
		<>
			{contextHolder}
			{!limitInstancesError ? (
				<Collapse>
					<Panel header="Create new Apengine server" key="1">
						<Box p={10}>
							<Alert
								message={
									isLoadingUserMe
										? 'Loading...'
										: `You can create up to ${dataUserMe?.instanceCount} instances.`
								}
								type="info"
							/>
						</Box>
						<Form
							form={form}
							// labelCol={{ span: 8 }}
							// wrapperCol={{ span: 16 }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
						>
							<Form.Item
								label="Server name"
								name="serverName"
								rules={[{ required: true, message: 'Please input your server name!' }]}
							>
								<Input />
							</Form.Item>
							{isError && (
								<Form.Item wrapperCol={{ offset: 0 }}>
									<Alert
										message="Limit reached"
										description={<>Want to get more instances? Read more here.</>}
										type="error"
										showIcon
									/>
								</Form.Item>
							)}
							<Form.Item>
								<Button type="primary" htmlType="submit" loading={creating}>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</Panel>
				</Collapse>
			) : (
				<Alert
					description={
						<>
							<p>
								{'You have reached the maximum number of instances '}
								{dataUserMe?.instanceCount}
								{' / '}
								{dataUserMe?.instanceCount}
							</p>
						</>
					}
					message="Instance limit reached"
					type="error"
					showIcon
				/>
			)}
		</>
	);
};

export default NewApplication;
