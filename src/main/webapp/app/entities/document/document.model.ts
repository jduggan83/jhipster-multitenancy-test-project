import { Company } from '../../admin/company-management/company.model';
import { BaseEntity } from './../../shared';

export class Document implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public content?: string,
       public company?: Company
    ) {
    }
}
