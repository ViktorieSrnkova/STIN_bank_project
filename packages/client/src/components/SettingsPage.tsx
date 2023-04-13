import { Button, Card, Form, Input, notification } from 'antd';
import { useUpdateUser } from 'hooks/mutation/useUpdateUser';
import { useState } from 'react';
import Page from './Page';

const SettingsPage: React.FC = () => {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const updateUser = useUpdateUser();
	const [saving, setSaving] = useState(false);
	const onFinish = async (values: { oldPassword: string; newPassword: string }): Promise<void> => {
		setSaving(true);
		try {
			await updateUser(values.oldPassword, values.newPassword);
			api.info({
				message: 'Password has been changed!',
				placement: 'topRight',
			});
			form.resetFields();
		} finally {
			setSaving(false);
		}
	};

	return (
		<>
			{contextHolder}
			<Page breadcrumb={[{ title: 'Settings' }]}>
				<Card>
					<Form form={form} onFinish={onFinish} autoComplete="off">
						<Form.Item
							name="oldPassword"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password placeholder="Old Password" />
						</Form.Item>
						<Form.Item
							name="newPassword"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password placeholder="New Password" />
						</Form.Item>

						<Form.Item
							name="newConfirmPassword"
							rules={[
								{ required: true, message: 'Please input your confirm password!' },
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('newPassword') === value) {
											return Promise.resolve();
										}
										// eslint-disable-next-line prefer-promise-reject-errors
										return Promise.reject('The two passwords that you entered do not match!');
									},
								}),
							]}
						>
							<Input.Password placeholder="New Password Confirm" />
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit" loading={saving}>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Page>
		</>
	);
};

export default SettingsPage;
