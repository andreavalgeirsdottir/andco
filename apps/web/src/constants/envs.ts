if (!process.env.NEXT_PUBLIC_API_URL) {
	console.error('Missing API_URL env var');
}

export const URLS = {
	API: process.env.NEXT_PUBLIC_API_URL,
};
