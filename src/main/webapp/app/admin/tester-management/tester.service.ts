import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Tester } from './tester.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TesterService {
    private resourceUrl = 'api/testers';

    constructor(private http: Http) { }

    create(tester: Tester): Observable<Tester> {
        const copy = this.convert(tester);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(tester: Tester): Observable<Tester> {
        const copy = this.convert(tester);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Tester> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(tester: Tester): Tester {
        const copy: Tester = Object.assign({}, tester);
        return copy;
    }
}
