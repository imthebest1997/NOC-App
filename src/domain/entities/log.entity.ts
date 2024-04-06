export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions{
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity{
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions  ){
        const { level, message, createdAt = new Date(), origin } = options;

        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }


    static fromJson = ( json: string ):LogEntity => {
        const { message , level, createdAt, origin }: {message: string, level: LogSeverityLevel, createdAt: Date, origin: string } = JSON.parse( json );

        if( !message || !level || !createdAt ){
            throw new Error('Invalid log entity');
        }

        const log = new LogEntity({
            message,
            level, 
            createdAt,
            origin
        });

        return log;
    }

    static fromObject = ( obj: {[key: string]: any} ):LogEntity =>{
        const { message , level, createdAt, origin } = obj;

        if( !message || !level || !createdAt ){
            throw new Error('Invalid log entity');
        }

        return new LogEntity({
            message,
            level, 
            createdAt,
            origin
        });
    }
}