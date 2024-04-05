import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';    
    // private readonly lowLogsPath = 'logs/logs-low.log';    
    private readonly mediumLogsPath = 'logs/logs-medium.log';    
    private readonly highLogsPath = 'logs/logs-high.log';    

    constructor(){
        this.createLogsFile();
    }

    private createLogsFile = () => {
        // Create logs directory if not exists
        if(!fs.existsSync( this.logPath )){
            fs.mkdirSync( this.logPath );
        }

        // Create logs files if not exists
        [
            this.allLogsPath,
            // this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( logPath => {
            if(!fs.existsSync( logPath )){
                fs.writeFileSync( logPath, '' );
            }
        });
    }


    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify( newLog ) } \n`

        // Save log in the corresponding file
        fs.appendFileSync( this.allLogsPath, logAsJson );

        switch ( newLog.level ) {
            case LogSeverityLevel.low:
                fs.appendFileSync( this.allLogsPath, logAsJson );
                break;
            case LogSeverityLevel.medium:
                fs.appendFileSync( this.mediumLogsPath, logAsJson );
                break;
            case LogSeverityLevel.high:
                fs.appendFileSync( this.highLogsPath, logAsJson );
                break;
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        // Read logs from the corresponding file
        const logs = fs.readFileSync( path, 'utf-8' );
        return logs.split('\n')
            .filter( log => log !== '' )
            .map( log => LogEntity.fromJson( log ));
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        // Get logs from the corresponding file
        switch ( severityLevel ) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile( this.allLogsPath );
            case LogSeverityLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );
            case LogSeverityLevel.high:
                return this.getLogsFromFile( this.highLogsPath );
            default:
                throw new Error(`${severityLevel} not implemented`);
        }                  
    }

}