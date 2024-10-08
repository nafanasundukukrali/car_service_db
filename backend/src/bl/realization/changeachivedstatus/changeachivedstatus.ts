import { AchivedStatus } from '@astypes/achivedstatus/achivedstatus';
import { AchivedStatusType } from '@astypes/achivedstatus/achivedstatus';
import { BaseStatus } from '@astypes/basestatus/basestatus';

export async function setAchivedStatus<T extends {status?: U | AchivedStatus}, U> (input: T): Promise<undefined> {
    input.status = AchivedStatusType.archived;
};

export async function setSavedStatus<T extends {status?: U | AchivedStatus}, U>(input: T): Promise<undefined> {
    input.status = BaseStatus.stored; 
};

export async function isAchived<T extends {status?: U | AchivedStatus}, U>(input: T): Promise<boolean>
{
    return input.status && input.status === AchivedStatusType.archived;
}