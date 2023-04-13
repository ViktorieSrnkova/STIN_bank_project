import { Button, Typography, Divider, Form, Input, notification, Card } from 'antd';
import { useRegisterUser } from 'hooks/mutation/useRegisterUser';
import { useLoginUser } from 'hooks/mutation/useLoginUser';
import { Link } from 'react-router-dom';
import useApp from 'hooks/useApp';
import { useState } from 'react';

const { Link: LinkAnt } = Typography;
const RegisterPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [api, contextHolder] = notification.useNotification();
	const registerUser = useRegisterUser();
	const loginUser = useLoginUser();
	const { setUserJWT } = useApp();

	const onFinish = async (values: { email: string; password: string }): Promise<void> => {
		try {
			setLoading(true);
			await registerUser(values.email, values.password);
			const token = await loginUser(values.email, values.password);
			setUserJWT(token);
		} catch (e) {
			setLoading(false);
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
						style={{ width: 90, paddingTop: '10px', marginBottom: 30 }}
					/>
					<Form name="basic" style={{ width: '300px' }} onFinish={onFinish} autoComplete="off">
						<Form.Item
							name="email"
							rules={[{ required: true, type: 'email', message: 'Please input your valid e-mail!' }]}
						>
							<Input placeholder="E-mail" />
						</Form.Item>

						<Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
							<Input.Password placeholder="Password" />
						</Form.Item>

						<Form.Item
							name="confirmPassword"
							rules={[
								{ required: true, message: 'Please input your confirm password!' },
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										// eslint-disable-next-line prefer-promise-reject-errors
										return Promise.reject('The two passwords that you entered do not match!');
									},
								}),
							]}
						>
							<Input.Password placeholder="Confirm Password" />
						</Form.Item>

						<Form.Item>
							<Button loading={loading} style={{ width: '100%' }} type="primary" htmlType="submit">
								Register
							</Button>
						</Form.Item>
					</Form>
					<Divider />
					<Button type="link">
						<Link to="/login">Login</Link>
					</Button>
				</Card>
			</div>
		</>
	);
};

export default RegisterPage;
