/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-25 22:28:14
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 11:47:28
 */
export default class Store {
	constructor (name, defaults) {
		this.name = name;

		if (defaults !== undefined) {
			for (let key in defaults) {
				if (defaults.hasOwnProperty(key) && this.get(key) === undefined) {
					this.set(key, defaults[key]);
				}
			}
		}
	}

    get = (propsName) => {
    	let name = 'store.' + this.name + '.' + propsName;

    	if (localStorage.getItem(name) === null) {
    		return undefined;
    	}

    	try {
    		return JSON.parse(localStorage.getItem(name));
    	} catch (e) {
    		return null;
    	}
    }

    set = (name, value) => {
    	if (value === undefined) {
    		this.remove(name);
    	} else {
    		if (typeof value === 'function') {
    			value = null;
    		} else {
    			try {
    				value = JSON.stringify(value);
    			} catch (e) {
    				value = null;
    			}
    		}

    		localStorage.setItem('store.' + this.name + '.' + name, value);
    	}

    	return this;
    }

    remove = name => {
    	localStorage.removeItem('store.' + this.name + '.' + name);

    	return this;
    }

    removeAll = () => {
    	let name = 'store.' + this.name + '.';

    	for (let i = (localStorage.length - 1); i >= 0; i--) {
    		if (localStorage.key(i).substring(0, name.length) === name) {
    			localStorage.removeItem(localStorage.key(i));
    		}
    	}

    	return this;
    }

    toObject = () => {
    	let values = {}, key, value;

    	let name = 'store.' + this.name + '.';

    	for (let i = (localStorage.length - 1); i >= 0; i--) {
    		if (localStorage.key(i).substring(0, name.length) === name) {
    			key = localStorage.key(i).substring(name.length);
    			value = this.get(key);
    			if (value !== undefined) {
    				values[key] = value;
    			}
    		}
    	}

    	return values;
    }

    fromObject = (values, merge) => {
    	if (merge !== true) {
    		this.removeAll();
    	}
    	for (let key in values) {
    		if (values.hasOwnProperty(key)) {
    			this.set(key, values[key]);
    		}
    	}

    	return this;
    }
}