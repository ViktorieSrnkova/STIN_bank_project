import { Button, Form, Input, notification } from 'antd';
import { useCreateVersion } from 'hooks/mutation/useCreateVersion';
import { useState } from 'react';
import { slowMe } from 'utils/promise';

interface Props {
	refetch: () => Promise<any>;
}

const CreateVersion: React.FC<Props> = ({ refetch }) => {
	const [api, contextHolder] = notification.useNotification();
	const [saving, setSaving] = useState(false);
	const createVersion = useCreateVersion();
	const onSaveFormFinish = async (values: { version: string }): Promise<void> => {
		setSaving(true);
		const fn = async (): Promise<void> => {
			await createVersion(values.version);
		};
		await slowMe(fn);
		await refetch();
		api.success({
			message: <>Version has been created!</>,
			placement: 'topRight',
		});

		setSaving(false);
	};
	return (
		<>
			{contextHolder}
			<Form layout="vertical" onFinish={onSaveFormFinish} autoComplete="off">
				<Form.Item
					label="Version"
					name="version"
					rules={[{ required: true, message: 'Please insert your version!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button loading={saving} type="primary" htmlType="submit" style={{ width: '100%' }}>
						Create
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default CreateVersion;
