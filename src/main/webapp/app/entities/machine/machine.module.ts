import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    MachineService,
    MachinePopupService,
    MachineComponent,
    MachineDetailComponent,
    MachineDialogComponent,
    MachinePopupComponent,
    MachineDeletePopupComponent,
    MachineDeleteDialogComponent,
    machineRoute,
    machinePopupRoute,
} from './';

const ENTITY_STATES = [
    ...machineRoute,
    ...machinePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MachineComponent,
        MachineDetailComponent,
        MachineDialogComponent,
        MachineDeleteDialogComponent,
        MachinePopupComponent,
        MachineDeletePopupComponent,
    ],
    entryComponents: [
        MachineComponent,
        MachineDialogComponent,
        MachinePopupComponent,
        MachineDeleteDialogComponent,
        MachineDeletePopupComponent,
    ],
    providers: [
        MachineService,
        MachinePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMachineModule {}
