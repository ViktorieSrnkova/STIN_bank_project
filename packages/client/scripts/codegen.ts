import dotenv from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config();

const config: CodegenConfig = {
	overwrite: true,
	schema: `${process.env.PUBLIC_API}/graphql`,
	generates: {
		'./src/types/gql.tsx': {
			plugins: ['typescript', 'typescript-operations'],
			config: {
				maybeValue: 'T',
			},
		},
	},
	hooks: {
		afterAllFileWrite: 'yarn lint:fix',
	},
};

export default config;
