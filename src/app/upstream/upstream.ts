import { Law, LawTag } from '../law/law';

export class Upstream {

    ident: string;
    upstream_name: string;
    upstream_description: string;
    name: string;
    description: string;
    url: string;
    laws: number;
    users: number;
    geo_coords: string;
    default_user: string;
    metadata: Object;
    tags: LawTag[];

    getTagByRanking(idx: number) {
        if (this.tags === undefined) {
            return;
        }
        for (const t of this.tags) {
            if (t.ranking === idx) {
                return t;
            }
        }
        return;
    }

    tagLabel(n: number): string {
        const t = this.getTagByRanking(n);
        if (t == null) {
            return '';
        }
        return t.name;
    }
}
