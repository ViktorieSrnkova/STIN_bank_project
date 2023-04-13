import { Card } from 'antd';
import CreateTransaction from 'components/CreteTransaction';
import Page from 'components/Page';

const CreteTransactionPage: React.FC = () => (
	<Page breadcrumb={[{ title: 'Create Transaction' }]}>
		<Card>
			<CreateTransaction />
		</Card>
	</Page>
);

export default CreteTransactionPage;
