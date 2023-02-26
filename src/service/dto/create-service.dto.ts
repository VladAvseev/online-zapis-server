export class CreateServiceDto {
    readonly title: string;
    readonly description: string;
    readonly currency: string;
    readonly price: number;
    readonly duration: number;
    readonly team_id: number;
}