import { User } from '../user/user';

export class Annotation {
}

export class Law {
    uid: string;
    upstream: string;
    ident: string;
    title: string;
    short_title: string;
    idx_1: number;
    idx_2: number;
    upstream_group: string;

    branches: Branch[];
}

export class Branch {
    law_id: string;
    user_id: string;
    name: string;

    versions: Version[];
}

export class Timestamp {
    seconds: number;
    nanoseconds: number;
}

export class Version {
    branch_id: string;
    user_id: string;
    hash: string;
    body: string;
    msg: string;
    comment: string;
    version: number;
    published_at: Timestamp;
    label: string;
    tag_1: string;
    tag_2: string;
    tag_3: string;
    tag_4: string;
    yays: number;
    nays: number;
    has_voted: boolean;
    upstream_group: string;
    comment_count: number;
}

export class Comment {
    uid: string;
    comment: string;
    disabled: boolean;
    upstream: string;
    ident: string;
    branch: string;
    version: string;
    annotation_count: number;
    likes: number;
    dislikes: number;

    liked: boolean;
    user: User;
}

export class Author {
    username: string;
    full_name: string;
    email: string;
    picture_url: string;
    upstream: string;
}

export class LawSet {
    law: Law;
    branch: Branch;
    version: Version;
    author: Author;

    getDate() {
        let d = new Date(1970, 0, 1);
        let v = this.version;
        if (v == null) {
            return d;
        }
        if (v.published_at == undefined || v.published_at.seconds == undefined) {
            return d;
        }
        d.setSeconds(v.published_at.seconds);
        return d;
    }
}

export class LawTag {
    ident: string;
    name: string;
    ranking: number;
    number_type: boolean;
    str_value: string;
    num_value: number;
}

export function getDate(law: LawSet) {
    let t = new Date(1970, 0, 1);
    if (law == null || law.version == undefined) {
        return t;
    }
    if (law.version.published_at == undefined) {
        return t;
    }
    if (law.version.published_at.seconds == undefined) {
        return t;
    }
    t.setSeconds(law.version.published_at.seconds);
    return t;
}
