import axios from 'axios';

export const getListOfRoutes = () => {
	const URL = `http://localhost:3000/get-routes`;
	return axios(URL, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
		}
	}).then(res => {
		return res
	}).catch(error => {
		throw error;
	});
};

export const sendGeneratedRoute = (data) => {
	const URL = `http://localhost:3000/insert-routes`;
	return axios(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		data: data
	}).then(res => {
		return res
	}).catch(error => {
		throw error;
	});
}

export const deleteRoute = (id) => {
	const URL = `http://localhost:3000/delete-route/${id}`;
	return axios(URL, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
		}
	}).then(res => {
		return res
	}).catch(error => {
		throw error;
	});
}