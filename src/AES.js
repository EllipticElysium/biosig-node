import aesjs from 'aes-js';
import pbkdf2 from 'pbkdf2';
import pkcs7 from 'pkcs7-padding';

export default class AES {
    static encrypt(value) {
        const key = pbkdf2.pbkdf2Sync(process.env.pass_phrase, process.env.salt, 1, 128 / 8, 'sha1');
        const vector = aesjs.utils.utf8.toBytes(process.env.vector);
        const byteValue = aesjs.utils.utf8.toBytes(value);
        const paddedByteValue = pkcs7.pad(byteValue, 16);

        const aesCbc = new aesjs.ModeOfOperation.cbc(key, vector, 1);
        const encryptedBytes = aesCbc.encrypt(paddedByteValue);

        console.log('key - ', key);
        console.log('value - ', value);
        console.log('vector - ', vector);
        console.log('byteValue - ', byteValue);
        console.log('paddedByteValue - ', paddedByteValue);
        console.log('encryptedBytes - ', encryptedBytes);

        return encryptedBytes;
    }

    static decrpyt() {
        //
    }
}
