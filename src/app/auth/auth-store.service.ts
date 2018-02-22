import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ExtractError } from '../errors';
import 'rxjs/add/operator/catch'

export enum LoginStatus {
    LoggedOut,
    Registering,
    LoggedIn
}

@Injectable()
export class AuthStoreService {

    private _user: BehaviorSubject<User>;
    private _loggedIn: BehaviorSubject<boolean>;
    private _newLogin: Subject<LoginStatus>;
    private _loginStatus: BehaviorSubject<LoginStatus>;
    private _errorMsg: BehaviorSubject<string>;
    private _redirectUrl: BehaviorSubject<string>;

    constructor(
        private router: Router,
        private userService: UserService,
        private authService: AuthService
    ) {
        this._user = new BehaviorSubject(null);
        this._loggedIn = new BehaviorSubject(false);
        this._newLogin = new Subject();
        this._loginStatus = new BehaviorSubject(LoginStatus.LoggedOut);
        this._errorMsg = new BehaviorSubject('');
        this._redirectUrl = new BehaviorSubject('');
    }

    get user() { return this._user.asObservable(); }
    getUser() { return this._user.getValue(); }
    get loggedIn() { return this._loggedIn.asObservable(); }
    get newLogin() { return this._newLogin.asObservable(); }
    get loginStatus() { return this._loginStatus.asObservable(); }
    get errorMsg() { return this._errorMsg.asObservable(); }
    get redirectUrl() { return this._redirectUrl.asObservable(); }
    getRedirectUrl() { return this._redirectUrl.getValue(); }

    clearUser() { this._user.next(null); }
    clearError() { this._errorMsg.next(''); }

    isLoggedIn(): boolean {
        return this._loggedIn.getValue();
    }

    setRedirectUrl(url: string) {
        this._redirectUrl.next(url);
    }

    logout() {
        return this.authService.logout().map(r => {
            this._user.next(null);
            this._loggedIn.next(false);
            this._newLogin.next(LoginStatus.LoggedOut);
        });
    }

    isAdmin() {
        const user = this._user.getValue();
        if (user == null) {
            return false;
        }
        if (user.roles == null || user.roles == undefined) {
            return false;
        }
        for (const r of user.roles) {
            if (r === 'admin') {
                return true;
            }
        }
        return false;
    }

    loggedInCheck() {
        this.authService.loggedInCheck().catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status === 404 || err.status === 400) {
                    return Observable.of(null);
                }
            }
            return Observable.throw(err);
        }).subscribe(
            user => {
                if (user == null) {
                    this._loggedIn.next(false);
                    this._loginStatus.next(LoginStatus.LoggedOut);
                    this._newLogin.next(LoginStatus.LoggedOut);
                    return;
                }
                this._user.next(user);
                if (user == null) {
                    this._loggedIn.next(false);
                    this._loginStatus.next(LoginStatus.LoggedOut);
                    this._newLogin.next(LoginStatus.LoggedOut);
                } else if (user.username == null) {
                    this._loggedIn.next(true);
                    this._loginStatus.next(LoginStatus.Registering);
                    this._newLogin.next(LoginStatus.Registering);
                } else {
                    this._loggedIn.next(true);
                    this._loginStatus.next(LoginStatus.LoggedIn);
                    this._newLogin.next(LoginStatus.LoggedIn);
                }
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
                this._loginStatus.next(LoginStatus.LoggedOut);
                this._newLogin.next(LoginStatus.LoggedOut);
            }
            );
    }

    loadUserByContext() {
        const msg = {
            opts: {
                req_type: 2
            }
        }
        this.userService.getUser(msg).catch((err: Response | any) => {
            if (err instanceof Response) {
                if (err.status == 404 || err.status == 400) {
                    return Observable.of(null);
                }
            }
            return Observable.throw(err);
        }).subscribe(
            user => {
                if (user == null) {
                    this._loggedIn.next(false);
                    this._loginStatus.next(LoginStatus.LoggedOut);
                    this._newLogin.next(LoginStatus.LoggedOut);
                    return;
                }
                this._user.next(user);
                if (user == null) {
                    this._loggedIn.next(false);
                    this._loginStatus.next(LoginStatus.LoggedOut);
                    this._newLogin.next(LoginStatus.LoggedOut);
                } else if (user.username == null) {
                    this._loggedIn.next(true);
                    this._loginStatus.next(LoginStatus.Registering);
                    this._newLogin.next(LoginStatus.Registering);
                } else {
                    this._loggedIn.next(true);
                    this._loginStatus.next(LoginStatus.LoggedIn);
                    this._newLogin.next(LoginStatus.LoggedIn);
                }
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
                this._loginStatus.next(LoginStatus.LoggedOut);
                this._newLogin.next(LoginStatus.LoggedOut);
            }
            );
    }

    registerUser(current: string, username: string) {
        const msg = {
            username: current,
            opts: {
                username: username
            }
        };
        this.userService.updateUser(msg).subscribe(
            _ => {
                const u = this._user.getValue();
                u.username = username;
                this._user.next(null);
                this._loginStatus.next(LoginStatus.LoggedOut);
                this._newLogin.next(LoginStatus.LoggedOut);
                this.router.navigate(['/login']);
            },
            err => {
                const errMsg = ExtractError(err);
                this._errorMsg.next(errMsg);
            }
        );
    }

    setUser(user: User) {
        this._user.next(user);
    }

}
