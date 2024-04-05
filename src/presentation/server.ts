import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log-impl.repository";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const emailService = new EmailService();


export class Server{
    public static start(){
        console.log('Server started....');

        // TODO: Sent an email with the logs of the file system
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['imthebest_1997@hotmail.com', 'imthebest199707@gmail.com']
        // );
 
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{ 
        //         const url = 'https://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => { console.log(`Service is ok ${url}`) },
        //             ( error ) => { console.log(`Error: ${error}`) }
        //         ).execute(url);
        //     }
        // );
    }       
}