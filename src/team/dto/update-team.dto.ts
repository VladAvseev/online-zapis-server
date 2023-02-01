export class UpdateTeamDto {
    readonly team: {
        readonly title: string;
        readonly phone: string;
        readonly email: string;
        readonly address: string;
        readonly city_id: number;
    }
    readonly tags: string[];
}