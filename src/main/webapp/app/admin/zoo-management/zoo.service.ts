import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Zoo } from './zoo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ZooService {
    private resourceUrl = 'api/zoos';

    constructor(private http: Http) { }

    create(zoo: Zoo): Observable<Zoo> {
        const copy = this.convert(zoo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(zoo: Zoo): Observable<Zoo> {
        const copy = this.convert(zoo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Zoo> {
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

    private convert(zoo: Zoo): Zoo {
        const copy: Zoo = Object.assign({}, zoo);
        return copy;
    }
}
