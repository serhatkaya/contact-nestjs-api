import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class EncryptionService {
    algorithm = 'aes-256-ctr'
    Securitykey = Buffer.from(process.env.ENCRYPTION_SECURITY_KEY, 'base64');
    initVector = Buffer.from(process.env.ENCYRPTION_INIT_VECTOR, 'base64');
    encrypt(text: string) {
        var cipher = createCipheriv(this.algorithm, this.Securitykey, this.initVector)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    decrypt(text: string) {
        var decipher = createDecipheriv(this.algorithm, this.Securitykey, this.initVector)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }

    validateString = (text: string, hash: string) =>
        text == this.decrypt(hash);
}