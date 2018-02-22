
export function isMobile(): boolean {
    return window.screen.width < 700;
}

export function sameMessage(m1, m2) {
    if (m1 === m2) {
        return true;
    } else if (!(m1 instanceof Object) || !(m2 instanceof Object)) {
        return false;
    } else if (m1.constructor !== m2.constructor) {
        return false;
    }

    for (const v in m1) {
        if (!m1.hasOwnProperty(v)) {
            continue;
        }
        if (!m2.hasOwnProperty(v)) {
            return false;
        }
        if (m1[v] === m2[v]) {
            continue;
        }
        if (typeof (m1[v]) !== 'object') {
            return false;
        }
        if (!sameMessage(m1[v], m2[v])) {
            return false;
        }
    }

    for (const v in m2) {
        if (m2.hasOwnProperty(v) && !m1.hasOwnProperty(v)) {
            return false;
        }
    }

    return true;
}

export function avatarErrorURL(username: string) {
    return 'https://api.adorable.io/avatars/285/' + username;
}
