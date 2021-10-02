// // scripts/seed.ts
// import * as _ from 'lodash';
// import { UsersService } from '@infrastructure/services/users.service';
// import { createConnection, ConnectionOptions } from 'typeorm';
// import { configService } from '../services/config.service';
// import { UserEntity } from 'src/domain/entities/user.entity';
// import { UserDto } from '@domain/dtos/user/user.dto';
// async function run() {

//     const seedUser: UserEntity = {
//         id: 'seed-user',
//         name: 'seed',
//         password: 'pwd',
//         username: 'seed'
//     };

//     const seedId = Date.now()
//         .toString()
//         .split('')
//         .reverse()
//         .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

//     const opt = {
//         ...configService.getTypeOrmConfig(),
//         debug: true
//     };

//     const connection = await createConnection(opt as ConnectionOptions);
//     const itemService = new UsersService(connection.getRepository(UserEntity));

//     const work = _.range(1, 10)
//         .map(n => UserDto.from({
//             name: `seed${seedId}-${n}`,
//         }))
//         .map(dto => itemService.create(dto, seedUser)
//             .then(r => (console.log('done ->', r.name), r)))

//     return await Promise.all(work);
// }

// run()
//     .then(_ => console.log('...wait for script to exit'))
//     .catch(error => console.error('seed error', error));