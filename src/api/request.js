import axios from './axios'
import qs from 'qs'

let baseUrl = 'http://120.55.36.183:7015';

export default async(url, params = {}, method = 'POST', isUpload = false) => {
	url = baseUrl + url;
	method = method.toUpperCase();
	if (method === 'GET') {
		let dataStr = '';
		Object.keys(params).forEach(key => {
			dataStr += key + '=' + params[key] + '&';
		});
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
		const res = await axios.get(url);
		return res.data
	}else if(method === 'POST') {
		const base = { 
			transformRequest: [
			function(data) { 
				return qs.stringify(data) 
			}
		]};
		const upload = { 
			headers: {
				'Content-Type':'multipart/form-data'
			}
		};
		const res = await axios.post(url, params, isUpload ? upload : base);
		return res.data
	}
}