import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Vote } from './ballot';

@Injectable()
export class BallotService {

    constructor(
        private http: Http
    ) { }

    host(): string {
        return `${environment.apiUrl}/vote`;
    }

    createVote(msg) {
        const url = this.host() + '/create';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseCreateVoteResponse(r));
    }

    updateVote(msg) {
        const url = this.host() + '/update';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseCreateVoteResponse(r));
    }

    private parseCreateVoteResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        return data.vote;
    }

    getVote(msg) {
        const url = this.host();
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseGetVoteResponse(r));
    }

    private parseGetVoteResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        return data.vote;
    }

    private extractResp(res) {
        const body = res.json();
        const data = body || {};
        const resp = new ListVotesResponse;
        if (data.hasOwnProperty('err')) {
            resp.err = data.err;
            return resp;
        }
        return resp;
    }

    listVotes(msg) {
        const url = this.host() + '/list';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body
        });
        return this.http.request(new Request(options)).map(r => this.parseListVotesResponse(r));
    }

    private parseListVotesResponse(r) {
        const body = r.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        const res = new ListVotesResponse();
        if (data == null) {
            return res;
        }
        if (data.votes == null) {
            res.votes = []
        } else {
            res.votes = data.votes;
        }
        res.total = data.total;
        return res;
    }

    voteVersionSuccess(e) {
    }

}

class ListVotesResponse {
    votes: Vote[];
    total: number;
    err: string;
}
