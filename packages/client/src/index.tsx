import { BrowserRouter, Link, Route, Routes, Outlet } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';
import { Card, ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { CrownOutlined, GithubOutlined, RocketOutlined } from '@ant-design/icons';
// import Page from 'components/Page';
// import ListApplications from 'components/ListApplications';
import { useLocation } from 'react-router';
import RegisterPage from 'pages/RegisterPage';
// import Header from 'components/Header';
// import ErrorsModal from 'components/ErrorsModal';
// import ResetPasswordPage from 'pages/ResetPasswordPage';
import useApp from 'hooks/useApp';
// import AdminPage from 'pages/AdminPage';
import { ApolloProvider } from '@apollo/client';
import { useApolloClient } from 'const/ApolloClient';
// import SettingsPage from './components/SettingsPage';
import ErrorsModal from 'components/ErrorsModal';
import Header from 'components/Header';
import Page from 'components/Page';
import HomePage from 'pages/HomePage';
import CreteTransactionPage from 'pages/CreteTransactionPage';
import { AppProvider } from './contexts/AppContext';
import LoginPage from './pages/LoginPage';

const { Content, Footer, Sider } = Layout;
const container = document.getElementById('app')!;
const root = ReactDOMClient.createRoot(container);

type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: React.ReactNode, to: string, icon?: React.ReactNode): MenuItem {
	return {
		key: to,
		icon,
		label: <Link to={to}>{label}</Link>,
	} as MenuItem;
}

export const PUBLIC_ROUTES = ['/register', '/login'];

const AppLayout: React.FC = () => {
	const { user } = useApp();
	const [collapsed, setCollapsed] = useState(false);
	const { pathname } = useLocation();

	const MENU_ITEMS = [
		getItem('Accounts', '/', <RocketOutlined />),
		getItem('Create transaction', '/create-transaction', <RocketOutlined />),
	];

	if (user && user.state === 'super-admin') {
		MENU_ITEMS.push({
			type: 'divider', // Must have
		});
		MENU_ITEMS.push(getItem('Admin', '/admin', <CrownOutlined />));
	}
	// is public route?
	if (PUBLIC_ROUTES.some(p => pathname.startsWith(p))) {
		return <Outlet />;
	}
	return (
		<>
			<Header />
			<Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
				<Sider
					style={{ padding: 0 }}
					theme="light"
					collapsible
					collapsed={collapsed}
					onCollapse={() => setCollapsed(!collapsed)}
				>
					<Menu
						style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
						theme="light"
						mode="inline"
						selectedKeys={[location.pathname]}
						items={MENU_ITEMS}
					/>
				</Sider>
				<Layout className="site-layout">
					<Content>
						<Outlet />
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						{'Apengine '}
						<a href="https://github.com/JaLe29/apengine" target="_blank" rel="noreferrer">
							<GithubOutlined />
						</a>
						{' ©2022 Created by JaLe'}
					</Footer>
				</Layout>
			</Layout>
		</>
	);
};

const AppNode: React.FC = () => {
	const { userJWT } = useApp();
	const apolloClient = useApolloClient(userJWT);
	return (
		<ApolloProvider client={apolloClient}>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/create-transaction" element={<CreteTransactionPage />} />

					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Route>
			</Routes>
		</ApolloProvider>
	);
};

const App: React.FC = () => (
	<ConfigProvider
		theme={{
			token: {},
		}}
	>
		<BrowserRouter>
			<AppProvider>
				<ErrorsModal />
				<AppNode />
			</AppProvider>
		</BrowserRouter>
	</ConfigProvider>
);

root.render(<App />);
