export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly city_id: number;
    readonly link: string;
}