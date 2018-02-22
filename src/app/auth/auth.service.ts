import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private router: Router,
        private http: Http,
        private userService: UserService
    ) { }

    host(): string {
        return `${environment.apiUrl}/auth`;
    }

    logout() {
        const url = this.host() + '/logout';
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        const options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
            withCredentials: true
        });
        return this.http.request(new Request(options));
    }

    login() {
        const url = this.host() + '/login';
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        const options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
            withCredentials: true
        });
        return this.http.request(new Request(options));
    }

    loggedInCheck() {
        const url = this.host() + '/logged-in-check';
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        const options = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.extractUser(r));
    }

    private extractUser(res: Response): User {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error('extract_user: ' + data.err);
        }
        const u: User = new User();
        if (data.user == null) {
            return null;
        }
        u.username = data.user.username;
        u.full_name = data.user.full_name;
        u.full_name_private = data.user.full_name_private == null ? false : true;
        u.email = data.user.email;
        u.email_private = data.user.email_private == null ? false : true;
        u.biography = data.user.biography;
        u.picture_url = data.user.picture_url;
        u.upstream = data.user.upstream;
        u.last_login = data.user.last_login;

        if (data.user.roles != null) {
            u.roles = data.user.roles;
        }
        return u;
    }
}
