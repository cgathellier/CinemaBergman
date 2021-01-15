const token = localStorage.getItem('token');

export const configFormData = {
	headers: {
		'Content-Type': 'multipart/form-data',
		'x-auth-token': token,
	},
};

export const configJson = {
	headers: {
		'Content-Type': 'application/json',
		'x-auth-token': token,
	},
};

export const configToken = {
	headers: {
		'x-auth-token': token,
	},
};
