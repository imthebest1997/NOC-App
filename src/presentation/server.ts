import { CheckService } from "../domain/use-cases/checks/check-services";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class Server{
    public static start(){
        console.log('Server started....');
        CronService.createJob(
            '*/5 * * * * *',
            ()=>{ 
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => { console.log(`Service is ok ${url}`) },
                    ( error ) => { console.log(`Error: ${error}`) }
                ).execute(url);
            }
        );
    }       
}