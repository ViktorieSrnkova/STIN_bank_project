import { Spin } from 'antd';
import Box from './Box';

const GlobalLoader: React.FC = () => (
	<Box display="flex" alignItems="center" justifyContent="center">
		<Spin size="large">
			<Box display="flex" alignItems="center" justifyContent="center">
				<img src="/logo.png" alt="apengine-logo" style={{ height: '250px' }} />
			</Box>
		</Spin>
	</Box>
);

export default GlobalLoader;
