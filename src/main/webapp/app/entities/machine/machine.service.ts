import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Machine } from './machine.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MachineService {

    private resourceUrl = SERVER_API_URL + 'api/machines';

    constructor(private http: Http) { }

    create(machine: Machine): Observable<Machine> {
        const copy = this.convert(machine);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(machine: Machine): Observable<Machine> {
        const copy = this.convert(machine);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Machine> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
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
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Machine.
     */
    private convertItemFromServer(json: any): Machine {
        const entity: Machine = Object.assign(new Machine(), json);
        return entity;
    }

    /**
     * Convert a Machine to a JSON which can be sent to the server.
     */
    private convert(machine: Machine): Machine {
        const copy: Machine = Object.assign({}, machine);
        return copy;
    }
}
