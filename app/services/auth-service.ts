import bcrypt from 'bcrypt';

export default class AuthService {
    constructor() {
    }

    public hashPassword = async (plaintextSalt: string, plaintextPassword: string): Promise<string> => {
        return bcrypt.hash(plaintextPassword, 10);
    }

    public checkPassword = (plaintextPassword: string, hashedPassword: string): Promise<boolean> => {
        return bcrypt.compare(plaintextPassword, hashedPassword);
    }

    // public toBase64 = (text: string): string => {
    //     if (!text) {
    //         return '';
    //     }
    //     return Buffer.from(text).toString('base64')
    // }

    public fromBase64 = (text: string): string => {
        if (!text) {
            return '';
        }
        return Buffer.from(text, 'base64').toString('binary')
    }
}