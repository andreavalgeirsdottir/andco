import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const noCacheHeaders = {
	'Cache-Control': 'no-cache',
	Pragma: 'no-cache',
	Expires: '0',
};

export const axiosConfig = (
	token?: string | null,
	opts?: AxiosRequestConfig,
	noCache = false,
): AxiosRequestConfig => ({
	headers: {
		...opts?.headers,
		Authorization: `Bearer ${token}`,
		...(noCache && noCacheHeaders),
	},
	...opts,
});

const authorizedPost = async <TResponse = unknown, TData = unknown>(
	url: string,
	token: string,
	data?: TData,
	config?: AxiosRequestConfig<TData>,
): Promise<AxiosResponse<TResponse>> => {
	try {
		const res = await axios.post(url, (data || null) as TData, { ...axiosConfig(token), ...config });

		return res;
	} catch (err) {
		console.error('Error: %s', err);
		throw err;
	}
};

const post = async <TResponse = unknown, TData = unknown>(
	url: string,
	data?: TData,
	config?: AxiosRequestConfig<TData> & { token?: string },
): Promise<AxiosResponse<TResponse>> => {
	if (config?.token) {
		return authorizedPost<TResponse, TData>(url, config?.token, data);
	}

	try {
		const res = await axios.post(url, (data || null) as TData, config);

		return res;
	} catch (err) {
		console.error('Error: %s', err);
		throw err;
	}
};

const authorizedRemove = async <TResponse = unknown>(
	url: string,
	token?: string,
	config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> => {
	try {
		const res = await axios.delete(url, { ...axiosConfig(token), ...config });

		return res;
	} catch (err) {
		console.error('Error: %s', err);
		throw err;
	}
};

const remove = async <TResponse = unknown>(
	url: string,
	config?: AxiosRequestConfig & { token?: string },
): Promise<AxiosResponse<TResponse>> => {
	if (config?.token) {
		return authorizedRemove<TResponse>(url, config?.token, config);
	}

	try {
		const res = await axios.delete(url);

		return res;
	} catch (err) {
		console.error('Error: %s', err);
		throw err;
	}
};

const authorizedPut = async <TResponse = unknown, TData = unknown | null>(
	url: string,
	token: string,
	data?: TData,
	config?: AxiosRequestConfig<TData>,
): Promise<AxiosResponse<TResponse>> => {
	try {
		const res = await axios.put(url, (data || null) as TData as TData, { ...axiosConfig(token), ...config });

		return res;
	} catch (err) {
		console.error('Error: %s', err);
		throw err;
	}
};

const put = async <TResponse = unknown, TData = unknown>(
	url: string,
	data?: TData,
	config?: AxiosRequestConfig<TData> & { token?: string },
): Promise<AxiosResponse<TResponse>> => {
	if (config?.token) {
		return authorizedPut<TResponse, TData>(url, config?.token, data, config);
	}

	try {
		const res = await axios.put(url, (data || null) as TData);

		return res;
	} catch (err) {
		console.error('Error: %s', err);
		throw err;
	}
};

const authorizedGet = async <TResponse = unknown>(
	url: string,
	token: string | null,
	config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> => {
	try {
		const res = await axios.get(url, { ...axiosConfig(token), ...config });

		return res;
	} catch (err) {
		console.error('Error: %s', err);
		throw err;
	}
};

const get = async <TResponse = unknown>(
	url: string,
	config?: AxiosRequestConfig & { token?: string },
): Promise<AxiosResponse<TResponse>> => {
	if (config?.token) {
		return authorizedGet<TResponse>(url, config?.token, config);
	}

	try {
		const res = await axios.get(url, config);

		return res;
	} catch (err) {
		console.error('Error: %s', err);
		throw err;
	}
};

export const request = {
	get,
	post,
	remove,
	put,
};
