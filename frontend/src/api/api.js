import axios from 'axios';

const URL = `http://localhost:3000`;

export const getListOfRoutes = () => {
	return axios(URL + '/get-routes', {
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

export const sendGeneratedRoute = data => {
	return axios(URL + `/insert-routes`, {
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

export const deleteRoute = id => {
	return axios(URL + `/delete-route/${id}`, {
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