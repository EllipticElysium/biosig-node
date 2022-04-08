import Api from './Api.js';
import AES from './AES.js';
import CryptoJS from 'crypto-js';

export default class BioSig {
    static async connect() {
        const config = {
            secrets: {
                pass: process.env.pass_phrase,
                salt: process.env.salt,
                vector: process.env.vector,
                keySize: parseInt(process.env.keysize),
            },

            baseUrl: 'https://sandbox.verifyexpress.com/interface/standard/unumbox/',
            sharedCode: 'UnUM.b0X!',
            systemId: 'custom',
            customerId: 'unumbox',
            locale: 'en_US',
            newWindow: false,
        };

        const args = {
            ts: new Date().toISOString(),
            sc: 'UnUM.b0X!',
            sid: 'iCollege',
            cid: 'EduPlace',
            lc: 'en-US',
            nw: 'false',
            em: 'me@example.com',
            fn: 'John',
            ln: 'Doe',
        };

        const params = Api.paramBuilder(args).slice(1);
        console.log(params);

        const aes = new AES(config.secrets.pass, config.secrets.salt);

        let encrb64 = aes.encrypt(params, config.secrets.vector, config.secrets.keySize);

        console.log('Base64 Encoded Arguments: ' + encrb64);

        let url = `${config.baseUrl}SSOInbound.aspx?args=${encodeURIComponent(encrb64)}`;
        console.log('SSO URL with URLEncoded Arguments: ' + url);
    }
}
