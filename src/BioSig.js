import Api from './Api.js';
import AES from './AES.js';

export default class BioSig {
    static async connect() {
        const params = Api.paramBuilder({
            ts: new Date().toISOString(),
            sc: 'UnUM.b0X!',
            sid: 'iCollege',
            cid: 'EduPlace',
            lc: 'en-US',
            nw: 'false',
            em: 'me@example.com',
            fn: 'John',
            ln: 'Doe',
        }).slice(1);

        const aes = new AES(process.env.pass_phrase, process.env.salt);
        const base64EncryptedArgs = aes.encrypt(params, process.env.vector, parseInt(process.env.keysize));

        const { raw } = await Api.call(
            'get',
            'https://sandbox.verifyexpress.com/interface/standard/unumbox/SSOInbound.aspx',
            null,
            {
                args: encodeURIComponent(base64EncryptedArgs),
            }
        );

        const decryptedArgs = aes.decrpyt(base64EncryptedArgs, process.env.vector, parseInt(process.env.keysize));
        const returnedValues = this.getreturnedValues(decryptedArgs);

        console.log({ raw, returnedValues });
    }

    static getreturnedValues(decryptedArgs) {
        return decryptedArgs.split('&').reduce((args, param) => {
            const [key, value] = param.split('=');
            return { ...args, [key]: value };
        }, {});
    }
}
