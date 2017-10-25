import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Animal } from './animal.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AnimalService {

    private resourceUrl = SERVER_API_URL + 'api/animals';

    constructor(private http: Http) { }

    create(animal: Animal): Observable<Animal> {
        const copy = this.convert(animal);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(animal: Animal): Observable<Animal> {
        const copy = this.convert(animal);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Animal> {
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
     * Convert a returned JSON object to Animal.
     */
    private convertItemFromServer(json: any): Animal {
        const entity: Animal = Object.assign(new Animal(), json);
        return entity;
    }

    /**
     * Convert a Animal to a JSON which can be sent to the server.
     */
    private convert(animal: Animal): Animal {
        const copy: Animal = Object.assign({}, animal);
        return copy;
    }
}
