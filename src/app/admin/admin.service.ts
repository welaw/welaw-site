import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { ServerStats } from './admin';

@Injectable()
export class AdminService {

    constructor(
        private http: Http
    ) { }

    host(): string {
        return `${environment.apiUrl}/admin`;
    }

    getServerStats() {
        const url = this.host() + '/stats';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
            withCredentials: true
        });

        return this.http.request(new Request(options)).map(r => this.parseGetServerStatsResponse(r));
    }

    saveRepos() {
        const msg = {
            opts: {
                req_type: 0
            }
        }
        const url = this.host() + '/repos';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(msg);
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            body: body,
            headers: headers,
            withCredentials: true
        });

        return this.http.request(new Request(options)).map(r => this.parseSaveReposResponse(r));
    }

    loadRepos() {
        const msg = {
            opts: {
                req_type: 1
            }
        }
        const url = this.host() + '/repos';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(msg);
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            body: body,
            headers: headers,
            withCredentials: true
        });

        return this.http.request(new Request(options)).map(r => this.parseLoadReposResponse(r));
    }

    private parseSaveReposResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        return data;
    }

    private parseLoadReposResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        return data;
    }

    private parseGetServerStatsResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        if (data.stats == null) {
            return null;
        }
        const stats: ServerStats = <ServerStats>(data.stats);
        return stats;
    }

}
