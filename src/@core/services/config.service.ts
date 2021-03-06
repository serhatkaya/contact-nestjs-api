import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config({ path: `${__dirname}/../../.env` });

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),
            entities: ['**/*.entity{.ts,.js}'],
            migrationsTableName: 'migration',
            migrations: ['src/infrastructure/migrations/*.ts'],
            cli: {
                migrationsDir: 'src/infrastructure/migrations',
            },
            ssl: this.isProduction(),
        };
    }

    public getJwtConfig(): JwtModuleOptions {
        return {
            secret: this.getValue('JWT_SECRET_KEY'),
            signOptions: {
                expiresIn: this.getValue('JWT_EXPIRES_IN')
            }
        }
    }
}

const configService = new ConfigService(process.env)
    .ensureValues([
        'POSTGRES_HOST',
        'POSTGRES_PORT',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_DATABASE',
        'ENCYRPTION_INIT_VECTOR',
        'ENCRYPTION_SECURITY_KEY',
        'JWT_SECRET_KEY',
        'JWT_EXPIRES_IN',
    ]);

export { configService };