import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as process from "process";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendActivationLink(to: string, link: string): void {
        this.mailerService
            .sendMail({
                to,
                from: process.env.SMTP_USER,
                subject: 'Testing Nest MailerModule',
                text: 'welcome',
                html: '<b>welcome</b>',
            })
            .then(() => {})
            .catch((e) => {
                console.log(e);
            });
    }
}