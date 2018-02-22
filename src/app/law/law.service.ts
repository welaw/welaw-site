import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Upstream } from '../upstream/upstream';
import { environment } from '../../environments/environment';
import { Law, Branch, Version, Author, LawSet } from './law';

@Injectable()
export class LawService {

    constructor(
        private http: Http
    ) { }

    host(): string {
        return `${environment.apiUrl}/law`;
    }

    createLaw(msg) {
        const url = this.host() + '/create';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => { return this.extractLawSet(r); });
    }

    diffLaws(msg) {
        const url = this.host() + '/diff';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseDiffLawsResponse(r));
    }

    getLaw(msg) {
        const url = this.host();
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(msg);
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.extractLawSet(r));
    }

    listLaws(msg) {
        const url = this.host() + '/list';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body
        });
        return this.http.request(new Request(options)).map(r => this.parseListLawsResponse(r));
    }

    private parseDiffLawsResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        if (data.diff == null) {
            return null;
        }
        const resp = new DiffLawsResponse();
        resp.diff = data.diff;
        resp.theirs = data.theirs;
        return resp;
    }

    private extractLawSet(res: Response): LawSet {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        return <LawSet>data.law_set;
    }

    private parseListLawsResponse(res: Response) {
        const body = res.json();
        const data = body || {};
        const resp = new ListLawsResponse();
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        resp.laws = <Array<LawSet>>data.laws;
        resp.total = data.total;
        return resp;
    }

}

class DiffLawsResponse {
    diff: string;
    theirs: LawSet;
    err: string;
}

class ListLawsResponse {
    laws: LawSet[];
    total: number;
    err: string;
}
