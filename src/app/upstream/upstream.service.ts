import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Upstream } from './upstream';
import { LawTag } from '../law/law';

@Injectable()
export class UpstreamService {

    constructor(
        private http: Http
    ) { }

    host(): string {
        return `${environment.apiUrl}/upstream/`;
    }

    getUpstream(upstream: string) {
        const headers = new Headers({'Content-Type': 'application/json'})
        const msg = {};
        const body = JSON.stringify(msg);
        const url = this.host() + upstream;
        const options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.extractUpstream(r));
    }

    listUpstreams(opts) {
        const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
        const body = JSON.stringify(opts);
        const url = this.host() + 'list';
        const options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.extractUpstreams(r));
    }

    private extractUpstream(res: Response) {
        const body = res.json();
        const data = body || { };
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        return Object.assign(new Upstream(), data.upstream);
    }

    private extractUpstreams(res) {
        const body = res.json();
        const data = body || { };
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        const upstreams = [];
        for (const upstream of data.upstreams) {
            const u = Object.assign(new Upstream(), upstream);
            upstreams.push(u);
        }
        return upstreams;
    }

}

export class ListUpstreamsResponse {
    Rows: string;
    Total: number;
    Err: string;
}
