import { Zoo } from '../../admin/zoo-management/zoo.model';
import { BaseEntity } from './../../shared';

export class Animal implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
       public zoo?: Zoo
    ) {
    }
}
