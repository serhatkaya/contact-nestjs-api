import { ApiResult } from '@core/common/api-result';
import { Role } from '@domain/enums/role.enum';
import { Controller, Get } from '@nestjs/common';

@Controller('Definitions')
export class DefinitionsController {
    @Get('GetRoles')
    public getRoles(): ApiResult<any> {
        const keys = Object.keys(Role)
        return new ApiResult(this.ToArray(Role));
    }
    StringIsNumber = value => isNaN(Number(value)) === false;
    ToArray(enumme) {

        return Object.keys(enumme)
            .filter(this.StringIsNumber)
            .map(key => {
                return {
                    role: enumme[key],
                    id: key
                }

            });
    }
}
