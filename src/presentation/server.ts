import { CheckService } from "../domain/use-cases/checks/check-services";
import { CronService } from "./cron/cron-service";

export class Server{

    public static start(){
        console.log('Server started....');
        CronService.createJob(
            '*/5 * * * * *',
            ()=>{ 
                const url = 'https://google.com';
                new CheckService(
                    ()=>{ console.log(`Service is ok ${url}`) },
                    (error)=>{ console.log(`Error: ${error}`) }
                ).execute(url);
            }
        );
    }       

}