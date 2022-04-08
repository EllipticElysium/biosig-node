import Api from './Api.js';
import BioSigInterfaceHelper from './AES.js';
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

        let args = {
            email: 'me@example.com',
            firstName: 'John',
            lastName: 'Doe',
        };

        const bsi = new BioSigInterfaceHelper(config.secrets.pass, config.secrets.salt);
        let bsiargs = bsi.generateArgumentString(
            config.sharedCode,
            config.systemId,
            config.customerId,
            config.locale,
            config.newWindow,
            args.email,
            args.firstName,
            args.lastName
        );
        console.log('Args: ' + bsiargs);

        let encr = bsi.encrypt(bsiargs, config.secrets.vector, config.secrets.keySize);
        console.log('Encrypted Arguments: ' + encr);

        let encrb64 = encr.toString(CryptoJS.enc.Base64);
        console.log('Base64 Encoded Arguments: ' + encrb64);

        let url = `${config.baseUrl}SSOInbound.aspx?args=${encodeURIComponent(encrb64)}`;
        console.log('SSO URL with URLEncoded Arguments: ' + url);
    }
}
