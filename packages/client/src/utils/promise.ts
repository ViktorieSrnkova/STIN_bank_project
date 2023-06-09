export const slowMe = async (fn: () => Promise<any>, ms = 2000): Promise<any> => {
	const startTime = Date.now();
	const r = await fn();
	const endTime = Date.now() - startTime;

	if (endTime < ms) {
		return new Promise(resolve => setTimeout(() => resolve(r), ms - endTime));
	}
	return r;
};

export const sleep = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));
