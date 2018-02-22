import { LawSet } from '../law/law';
import { User } from '../user/user';

export class Vote {
    vote: string;
    comment: string;
    cast_at: string;
    law: LawSet;
    user: User;
}

export class VoteSummary {
    yays: number;
    nays: number;
}
