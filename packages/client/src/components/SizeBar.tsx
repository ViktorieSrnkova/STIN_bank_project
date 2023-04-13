import { Progress, Tooltip } from 'antd';
import React from 'react';
import prettyBytes from 'pretty-bytes';

interface Props {
	size: number; // bytes
	maxSize: number; // bytes
	title: string;
	icon: React.ReactElement;
}
const SizeBar: React.FC<Props> = ({ size, title, maxSize, icon }) => {
	const h = size / maxSize;
	const sizeBytes = size;
	const maxSizeBytes = maxSize;
	const percentage = h * 100;
	const color = h < 80 ? 'green' : 'red';
	return (
		<Tooltip title={title}>
			<div style={{ display: 'flex' }}>
				<span style={{ paddingRight: 10 }}>{icon}</span>
				<Progress
					percent={percentage}
					size="small"
					strokeColor={color}
					format={() => `${prettyBytes(sizeBytes)} / ${prettyBytes(maxSizeBytes)}`}
				/>
			</div>
		</Tooltip>
	);
};

export default SizeBar;
