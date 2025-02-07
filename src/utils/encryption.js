const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

function encrypt(text, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'utf-8'), iv);
    let encrypted = cipher.update(text, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return iv.toString('base64') + ':' + encrypted;
}

function decrypt(cipherText, key) {
    const parts = cipherText.split(':');
    const iv = Buffer.from(parts.shift(), 'base64');
    const encryptedText = Buffer.from(parts.join(':'), 'base64');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'utf-8'), iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = {
    encrypt,
    decrypt
};