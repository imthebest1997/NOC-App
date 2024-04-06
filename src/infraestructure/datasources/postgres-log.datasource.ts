import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severyEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}


export class PostgresLogDatasource implements LogDatasource{

    async saveLog(log: LogEntity): Promise<void> {
        const level = severyEnum[log.level];
        await prismaClient.logModel.create({
            data: {
                ...log,
                level
            }
        });
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severyEnum[severityLevel];

        const logs = await prismaClient.logModel.findMany({
            where: {level}
        });

        return logs.map( LogEntity.fromObject );
    }

}