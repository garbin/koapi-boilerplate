import {fetch, createClient} from 'fetch-plus'
import json from 'fetch-plus-json'
import config from '../config';

var bearer = token => request => {
	request.options.headers["Authorization"] = "Bearer " + token();
};

const api = createClient(config.api)
api.addMiddleware(json());
api.addMiddleware(bearer(function(){return localStorage.t;}));


const jinshuju = createClient(config.jinshuju.api)
jinshuju.addMiddleware(json());
jinshuju.addMiddleware(bearer(function(){return localStorage.access_token;}));

export {bearer, fetch, api, jinshuju};
