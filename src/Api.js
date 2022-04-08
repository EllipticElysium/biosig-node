import axios from 'axios';

export default class Api {
    static async call(method, path, payload, params) {
        const queryParameters = this.paramBuilder(params),
            callConfig = {
                method: method.toUpperCase(),
                url: path + queryParameters,
                data: payload,
                headers: {},
            };

        return await this.sendRequest(callConfig);
    }

    static paramBuilder(params) {
        let retVal = '';
        if (params) {
            retVal = '?';
            for (const param in params) {
                if (param && params[param] !== null && params[param] !== undefined) {
                    const query = `${param}=${params[param]}&`;
                    retVal = retVal + query;
                } else {
                    continue;
                }
            }
        }
        return retVal.slice(0, -1);
    }

    static async sendRequest(callConfig) {
        if (callConfig.data !== null) {
            callConfig.headers['Content-Type'] = `application/json`;
        }

        try {
            const { data: response } = await axios(callConfig),
                { message, error, success, data } = response;

            return {
                success,
                message,
                response: data || null,
                error: error || null,
                raw: response,
            };
        } catch (e) {
            if (e.response) {
                const { data: response } = e.response,
                    { message, success } = response;

                return {
                    success,
                    message,
                    response: message ?? '',
                    error: message ?? '',
                };
            } else {
                const errorMessage = {
                    success: false,
                    message: "Couldn't connect",
                    response: '',
                    error: '',
                };

                return errorMessage;
            }
        }
    }
}
