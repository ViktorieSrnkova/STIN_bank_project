import { Button, Typography, Divider, Form, Input, notification, Card } from 'antd';
import { useLoginUser } from 'hooks/mutation/useLoginUser';
import useApp from 'hooks/useApp';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Link: LinkAnt } = Typography;

const LoginPage: React.FC = () => {
	const { setUserJWT } = useApp();
	const [loading, setLoading] = useState(false);
	const loginUser = useLoginUser();
	const [api, contextHolder] = notification.useNotification();
	const onFinish = async (values: any): Promise<void> => {
		try {
			setLoading(true);
			const token = await loginUser(values.email, values.password);
			setUserJWT(token);
		} catch (e) {
			api.error({
				message: `Login failed: ${e.toString()}`,
				placement: 'topRight',
			});
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
						style={{ width: 90, paddingTop: '10px', paddingBottom: 30 }}
					/>
					<Form
						name="basic"
						style={{ width: '300px' }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						autoComplete="off"
					>
						<Form.Item
							name="email"
							rules={[{ required: true, type: 'email', message: 'Please input your valid e-mail!' }]}
						>
							<Input placeholder="E-mail" />
						</Form.Item>

						<Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
							<Input.Password placeholder="Password" />
						</Form.Item>

						<Form.Item>
							<Button loading={loading} style={{ width: '100%' }} type="primary" htmlType="submit">
								Login
							</Button>
						</Form.Item>
					</Form>
					<Divider />

					<Button type="link">
						<Link to="/reset-password">Reset password</Link>
					</Button>
					<Button type="link">
						<Link to="/register">Register</Link>
					</Button>
				</Card>
			</div>
		</>
	);
};

export default LoginPage;
