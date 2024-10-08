import { container, injectable } from "tsyringe";
import { NotRequireID } from "@astypes/helperpath/helpertypes";
import { ServiceInfo } from "@astypes/serviceinfo/serviceinfo";
import { prisma } from "../../prismaclient";
import { UserRoles } from "@astypes/userinfo/userinfo";
import { Id } from "@astypes/id/id";
import { IServiceRepository } from "@asinterfaces/repository/IServiceRepository.interface";

@injectable()
export class PsqlServiceRepository implements IServiceRepository
{
    async search (info: Partial<ServiceInfo>, pass?: number, count?: number): Promise<ServiceInfo []> { 
        let resBD = await prisma.service.findMany({
            where: {
                discription:info?.discription,
                name: info?.name,
                id: info?.id?.getStringVersion(),
                price: info?.price
            },
            skip: pass,
            take: count
        });
        
        let res: ServiceInfo[] = []
        for (let i = 0; i < resBD.length; i++)
            res.push({
                discription:resBD[i]?.discription,
                name: resBD[i]?.name,
                id: new Id(resBD[i]?.id),
                price: Number(resBD[i]?.price)
        });

        return res;
    }

    async getListOfAll (pass?: number, count?: number): Promise<ServiceInfo[]> 
    {
        let resBD = await prisma.service.findMany({
            skip: pass,
            take: count
        });
        
        let res: ServiceInfo[] = []
        for (let i = 0; i < resBD.length; i++)
            res.push({
                discription:resBD[i]?.discription,
                name: resBD[i]?.name,
                id: new Id(resBD[i]?.id),
                price: Number(resBD[i]?.price)
        });

        return res;
    };
}