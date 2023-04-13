import { Card, Collapse, notification } from 'antd';
import Page from 'components/Page';
import Users from 'components/Users';
import Versions from 'components/Versions';

const { Panel } = Collapse;

const AdminPage: React.FC = () => {
	const [api, contextHolder] = notification.useNotification();
	return (
		<>
			{contextHolder}
			<Page breadcrumb={[{ title: 'Admin' }]}>
				<Card>
					<Collapse>
						<Panel header="Create new version" key="1">
							<Versions />
						</Panel>
						<Panel header="Users" key="2">
							<Users />
						</Panel>
					</Collapse>
				</Card>
			</Page>
		</>
	);
};

export default AdminPage;
