import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?:  Attachment[];
}

interface Attachment{
    filename: string;
    path: string
}


export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(){}

    // Function to send an email
    async sendEmail( options: SendMailOptions ): Promise<boolean>{
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            // Send email           
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            return true;            
        } catch (error) {
            return false;            
        }
    }

    // Function to send an email with the logs of the file system
    async sendEmailWithFileSystemLogs( to: string | string[]): Promise<boolean>{
        const subject = "Logs del servidor";
        const htmlBody = `
            <h1>Logs del servidor</h1>
            <p>Commodo aliqua culpa officia consequat occaecat nulla eiusmod proident occaecat exercitation aute qui.</p>

            <p>Ver logs adjuntos. </p>
        `;
        
        const attachments: Attachment[] = [ 
            { filename: 'logs-all.log',     path: './logs/logs-all.log'     },
            { filename: 'logs-high.log',    path: './logs/logs-high.log'    },
            { filename: 'logs-medium.log',  path: './logs/logs-medium.log'  }
        ];

        return this.sendEmail({ to, subject, htmlBody, attachments });
    }
}