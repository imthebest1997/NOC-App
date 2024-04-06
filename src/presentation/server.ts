    import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-services-multiple";


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource
);


const emailService = new EmailService();


export class Server{
    public static async start(){
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
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => { console.log(`Service is ok ${url}`) },
        //             ( error ) => { console.log(`Error: ${error}`) }
        //         ).execute(url);
        //     }
        // );
    }       
}