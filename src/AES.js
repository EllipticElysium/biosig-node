import CryptoJS from 'crypto-js';
export default class AES {
    constructor(pass, salt) {
        this._key = this._createSecureKey(pass, salt, 2, 128 / 8);
    }

    _createSecureKey(pass, salt, count, dklen) {
        let t = CryptoJS.enc.Utf8.parse(pass + salt);
        for (var i = 0; i < count; i++) {
            t = CryptoJS.SHA1(t);
        }
        t = t.toString(CryptoJS.enc.Hex).slice(0, dklen * 2);
        return CryptoJS.enc.Hex.parse(t);
    }

    encrypt(s, vec, keySize) {
        vec = CryptoJS.enc.Latin1.parse(vec);
        const encryptedValue = CryptoJS.AES.encrypt(s, this._key, {
            iv: vec,
            keySize: keySize,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();
        const b64EncrpyptedValue = encryptedValue.toString(CryptoJS.enc.Base64);
        return b64EncrpyptedValue;
    }
}
