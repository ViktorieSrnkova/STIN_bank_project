import { Button, Divider, Form, Input, notification, Alert, Card } from 'antd';
import { useResetPassword } from 'hooks/mutation/useResetPassword';
import { useResetPasswordSetUserPassword } from 'hooks/mutation/useResetPasswordSetUserPassword';

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
	const resetPasswordSetUserPassword = useResetPasswordSetUserPassword();
	const [form] = Form.useForm();
	const [saving, setSaving] = useState(false);
	const { code } = useParams();
	const [phase, setPhase] = useState(0);
	const [loading, setLoading] = useState(false);
	const resetPassword = useResetPassword();
	const [api, contextHolder] = notification.useNotification();
	const onFinish = async (values: any): Promise<void> => {
		try {
			setLoading(true);
			await resetPassword(values.email);
			setPhase(1);
		} catch (e) {
			api.error({
				message: `Reset password failed: ${e.toString()}`,
				placement: 'topRight',
			});
		} finally {
			setLoading(false);
		}
	};

	const onSetPswFinish = async (values: { newPassword: string }): Promise<void> => {
		setSaving(true);
		try {
			await resetPasswordSetUserPassword(code!, values.newPassword);
			setPhase(3);
			form.resetFields();
		} finally {
			setSaving(false);
		}
	};

	return (
		<>
			{contextHolder}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
					minHeight: '100vh',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<Card>
					<img
						src="/logo.png"
						alt="apengine logo"
						style={{ width: 90, paddingTop: '10px', paddingBottom: 30 }}
					/>
					{phase === 0 && !code && (
						<Form name="basic" style={{ width: '300px' }} onFinish={onFinish} autoComplete="off">
							<Form.Item
								name="email"
								rules={[{ required: true, type: 'email', message: 'Please input your valid e-mail!' }]}
							>
								<Input placeholder="E-mail" />
							</Form.Item>

							<Form.Item>
								<Button loading={loading} style={{ width: '100%' }} type="primary" htmlType="submit">
									Request new password
								</Button>
							</Form.Item>
						</Form>
					)}
					{phase === 1 && (
						<Alert
							message="Success"
							type="success"
							description="A message with instructions to reset your password has been sent to your e-mail!"
							showIcon
						/>
					)}
					{phase === 3 && (
						<Alert
							message="Success"
							type="success"
							description="Your password has been changed!"
							showIcon
						/>
					)}
					{code && phase !== 3 && (
						<Form style={{ width: '300px' }} form={form} onFinish={onSetPswFinish} autoComplete="off">
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
							<Form.Item>
								<Button style={{ width: '300px' }} type="primary" htmlType="submit" loading={saving}>
									Submit
								</Button>
							</Form.Item>
						</Form>
					)}
					<Divider />
					<Button type="link">
						<Link to="/login">Login</Link>
					</Button>
				</Card>
			</div>
		</>
	);
};

export default ResetPasswordPage;
