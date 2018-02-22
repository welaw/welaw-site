import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CommentService {

    constructor(
        private http: Http
    ) { }

    host(): string {
        return `${environment.apiUrl}/law/comment`;
    }

    createComment(msg) {
        const url = this.host() + '/create';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseCreateCommentResponse(r));
    }

    getComment(msg) {
        const url = this.host();
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseGetCommentResponse(r));
    }

    listComments(msg) {
        const url = this.host() + '/list';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseListCommentsResponse(r));
    }

    updateComment(msg) {
        const url = this.host() + '/update';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseUpdateCommentResponse(r));
    }

    likeComment(msg) {
        const url = this.host() + '/like';
        const body = JSON.stringify(msg);
        const headers = new Headers({ 'Content-Type': 'application/json' })
        const options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: body,
            withCredentials: true
        });
        return this.http.request(new Request(options)).map(r => this.parseLikeCommentResponse(r));
    }

    private parseCreateCommentResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        if (data.comment == null) {
            return null;
        }
        return data.comment;
    }

    private parseGetCommentResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        if (data.comment == null) {
            return null;
        }
        return data.comment;
    }

    private parseListCommentsResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        if (data.rows == null) {
            return [];
        }
        return data.rows;
    }

    private parseUpdateCommentResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        if (data.comment == null) {
            return null;
        }
        return data.comment;
    }

    private parseLikeCommentResponse(res) {
        const body = res.json();
        const data = body || {};
        if (data.hasOwnProperty('err')) {
            throw new Error(data.err);
        }
        return;
    }

}
