import { Company } from '../../admin/company-management/company.model';
import { BaseEntity } from './../../shared';

export class Book implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
       public company?: Company
    ) {
    }
}
