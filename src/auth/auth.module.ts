import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {TokenModule} from "../token/token.module";
import {FileModule} from "../file/file.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UserModule),
        TokenModule,
        FileModule
    ],
    exports: [AuthModule]
})
export class AuthModule {}
