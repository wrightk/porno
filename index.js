"use strict";
const https = require('https');

/**
* Represents the main module
*/
class Porno {
	constructor(options = {}) {
		this.baseURL = "https://api.porn.com";
		this.defaultFormat = options.defaultFormat || 'json';
		if(this.defaultFormat != 'json'  && this.defaultFormat != 'xml') throw new Error('Unsupported format !');
	}
	
	/**
    * Send an API request
    * @arg {String} [path] The endpoint path
    * @arg {Object} [parameters] The parameters to request with
    * @returns {Promise}
    */
	request(path, parameters) {
		return new Promise((resolve, reject) => {
			let query = "";
			if(parameters && typeof parameters == 'object' && Object.keys(parameters).length > 0) {
				query += "?";
				for(const param in parameters) {
					query += `${param}=${parameters[param]}`;
				}
			};
			https.get(`${this.baseURL}${path}.${this.defaultFormat}${query}`, (response) => {
				let unparsedData = "";
				let parsedData;
				response.on('data', (data) => {
					unparsedData += data;
				});
				response.once('end', () => {
					if(unparsedData.length > 0) {
						try {
							parsedData = JSON.parse(unparsedData);
							return resolve(parsedData.result);
						} catch(error) {
							return reject(error);
					}
				}
				});
			})
		}) 
	}
	
	/**
    * Fetch latest videos
    * @returns {Promise}
    */
	fetchLatestVideos() {
		return this.request('/videos/search');
	}
	
	/**
    * Search video
    * @arg {String|Object} [query] Can be a string with a search query, or an object with more options
    * @returns {Promise}
    */
	searchVideo(query) {
		if(typeof query == 'string') query = {search: query};
		return this.request('/videos/find', query);
	}
	
	/**
    * Check if a video is active on porn.com
    * @arg {Number} [id] ID of the video
    * @returns {Promise}
    */
	videoIsActive(id) {
		return this.request('/videos/is-active', {id: id});
	}
	
	/**
    * Fetch deleted videos
    * @arg {Object} [options] Options
    * @returns {Promise}
    */
	fetchDeletedVideos(options = "") {
		return this.request('/videos/deleted', options);
	}
	
	/**
    * Search actor
    * @arg {String|Object} [query] Can be a string with a search query, or an object with more options
    * @returns {Promise}
    */
	searchActor(query) {
		if(typeof query == 'string') query = {search: query};
		return this.request('/actors/find', query);
	}
	
	/**
    * Search channel
    * @arg {String|Object} [query] Can be a string with a search query, or an object with more options
    * @returns {Promise}
    */
	searchChannel(query) {
		if(typeof query == 'string') query = {search: query};
		return this.request('/channels/find', query);
	}
	
	/**
    * Search DvD
    * @arg {String|Object} [query] Can be a string with a search query, or an object with more options
    * @returns {Promise}
    */
	searchDvD(query) {
		if(typeof query == 'string') query = {search: query};
		return this.request('/dvds/find', query);
	}
	
	/**
    * Fetch categories
    * @returns {Promise}
    */
	fetchCategories() {
		return this.request('/categories');
	}
}
	
module.exports = Porno
