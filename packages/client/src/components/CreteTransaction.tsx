import { Button, Divider, Form, Input, Radio } from 'antd';
import { useState } from 'react';
import { MutationCreateTransactionArgs, TransactionType } from 'types/gql';
import { gql, useMutation } from '@apollo/client';
import Box from './Box';

const MUTATION_CREATE_TRANSACTION = gql`
	mutation CreateTransaction(
		$amount: Float!
		$type: TransactionType!
		$fromAccountNumber: String
		$toAccountNumber: String
	) {
		createTransaction(
			amount: $amount
			type: $type
			fromAccountNumber: $fromAccountNumber
			toAccountNumber: $toAccountNumber
		)
	}
`;

const CreateTransaction: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState<TransactionType | undefined>();
	const [createTransaction] = useMutation<{}, MutationCreateTransactionArgs>(MUTATION_CREATE_TRANSACTION);

	const onFinish = async (values: {
		amount: string;
		fromAccountNumber?: string;
		toAccountNumber?: string;
	}): Promise<void> => {
		const { amount, fromAccountNumber, toAccountNumber } = values;

		setLoading(true);
		try {
			const r = await createTransaction({
				variables: {
					amount: parseFloat(amount),
					fromAccountNumber,
					toAccountNumber,
					type: type!,
				},
			});

			console.log(r);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box>
			<Radio.Group value={type} onChange={e => setType(e.target.value)}>
				<Radio.Button value={TransactionType.Deposit}>Deposit</Radio.Button>
				<Radio.Button value={TransactionType.Transfer}>Transfer</Radio.Button>
				<Radio.Button value={TransactionType.Withdrawal}>Withdrawal</Radio.Button>
			</Radio.Group>
			<Divider />
			{type === TransactionType.Deposit && (
				<Form
					name="basic"
					style={{ width: '100%' }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item name="toAccountNumber" rules={[{ required: true }]}>
						<Input placeholder="toAccountNumber" />
					</Form.Item>
					<Form.Item name="amount" rules={[{ required: true }]}>
						<Input placeholder="amount" />
					</Form.Item>
					<Form.Item>
						<Divider />
						<Button loading={loading} style={{ width: '100%' }} type="primary" htmlType="submit">
							Send
						</Button>
					</Form.Item>
				</Form>
			)}

			{type === TransactionType.Transfer && (
				<Form
					name="basic"
					style={{ width: '100%' }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item name="fromAccountNumber" rules={[{ required: true }]}>
						<Input placeholder="fromAccountNumber" />
					</Form.Item>
					<Form.Item name="toAccountNumber" rules={[{ required: true }]}>
						<Input placeholder="toAccountNumber" />
					</Form.Item>
					<Form.Item name="amount" rules={[{ required: true }]}>
						<Input placeholder="amount" />
					</Form.Item>
					<Form.Item>
						<Divider />
						<Button loading={loading} style={{ width: '100%' }} type="primary" htmlType="submit">
							Send
						</Button>
					</Form.Item>
				</Form>
			)}
			{type === TransactionType.Withdrawal && (
				<Form
					name="basic"
					style={{ width: '100%' }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item name="fromAccountNumber" rules={[{ required: true }]}>
						<Input placeholder="fromAccountNumber" />
					</Form.Item>
					<Form.Item name="amount" rules={[{ required: true }]}>
						<Input placeholder="amount" />
					</Form.Item>
					<Form.Item>
						<Divider />
						<Button loading={loading} style={{ width: '100%' }} type="primary" htmlType="submit">
							Send
						</Button>
					</Form.Item>
				</Form>
			)}
		</Box>
	);
};

export default CreateTransaction;
