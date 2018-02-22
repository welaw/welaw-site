import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { User, UserProfile, Contribution, Vote } from './user';

@Injectable()
export class UserService {

    constructor(
        private http: Http
    ) { }

    host(): string {
        return `${environment.apiUrl}/user`;
    }

    deleteUser(username: string) {
        const url = this.host() + '/' + username + '/deconste';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.extractUsers(r));
    }

    getUser(opts) {
        const url = this.host();
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(opts);
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            withCredentials: true,
            body: body
        });
        return this.http.request(new Request(options)).map(r => this.extractUser(r));
    }

    listUsers(msg) {
        const url = this.host() + '/list';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.extractUsers(r));
    }

    updateUser(msg) {
        const url = this.host() + '/update';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            withCredentials: true,
            body: body
        });
        return this.http.request(new Request(options)).map(r => this.extractUser(r));
    }

    private parseDeconsteUserResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        return;
    }

    private extractUser(res: Response): User {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error('extract_user: error: ' + data.err);
        }
        return data.user;
    }

    private extractUsers(res: Response) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        const resp: ListUsersResponse = new ListUsersResponse();
        resp.users = data.users;
        resp.total = data.total;
        return resp;
    }

}

class ListUsersResponse {
    users: User[];
    total: number;
    err: string;
}
