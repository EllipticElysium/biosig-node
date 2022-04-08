import CryptoJS from 'crypto-js';
export default class AES {
    constructor(pass, salt) {
        this.key = this.createSecureKey(pass, salt, 2, 128 / 8);
    }

    createSecureKey(pass, salt, count, dklen) {
        let saltedPass = CryptoJS.enc.Utf8.parse(pass + salt);
        for (var i = 0; i < count; i++) {
            saltedPass = CryptoJS.SHA1(saltedPass);
        }
        const hexKey = saltedPass.toString(CryptoJS.enc.Hex).slice(0, dklen * 2);
        const key = CryptoJS.enc.Hex.parse(hexKey);
        return key;
    }

    encrypt(params, vector, keySize) {
        vector = CryptoJS.enc.Latin1.parse(vector);
        const encryptedValue = CryptoJS.AES.encrypt(params, this.key, {
            iv: vector,
            keySize: keySize,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();
        const b64EncrpyptedValue = encryptedValue.toString(CryptoJS.enc.Base64);
        return b64EncrpyptedValue;
    }
}
