import { DefinitionsController } from '@api/controllers/definitions/definitions.controller';
import { Module } from '@nestjs/common';

@Module({
    providers: [],
    imports: [],
    exports: [],
    controllers: [DefinitionsController]
})
export class SharedModule { }
