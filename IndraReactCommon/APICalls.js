import axios from 'axios';
import config from './config';

export const getModels = async() => {
	// We will catch and handle the error outside
	const res = await axios.get(config.API_URL+'models?active=true');
	return res.data;
}
