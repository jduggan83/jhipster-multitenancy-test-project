import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    AnimalService,
    AnimalPopupService,
    AnimalComponent,
    AnimalDetailComponent,
    AnimalDialogComponent,
    AnimalPopupComponent,
    AnimalDeletePopupComponent,
    AnimalDeleteDialogComponent,
    animalRoute,
    animalPopupRoute,
    AnimalResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...animalRoute,
    ...animalPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AnimalComponent,
        AnimalDetailComponent,
        AnimalDialogComponent,
        AnimalDeleteDialogComponent,
        AnimalPopupComponent,
        AnimalDeletePopupComponent,
    ],
    entryComponents: [
        AnimalComponent,
        AnimalDialogComponent,
        AnimalPopupComponent,
        AnimalDeleteDialogComponent,
        AnimalDeletePopupComponent,
    ],
    providers: [
        AnimalService,
        AnimalPopupService,
        AnimalResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAnimalModule {}
