import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    CompanyMgmtComponent,
    CompanyMgmtDetailComponent,
    CompanyMgmtDialogComponent,
    CompanyDialogComponent,
    CompanyDeleteDialogComponent,
    CompanyMgmtDeleteDialogComponent,
    LogsComponent,
    JhiMetricsMonitoringModalComponent,
    JhiMetricsMonitoringComponent,
    JhiHealthModalComponent,
    JhiHealthCheckComponent,
    JhiConfigurationComponent,
    JhiDocsComponent,
    AuditsService,
    JhiConfigurationService,
    JhiHealthService,
    JhiMetricsService,
    LogsService,
    UserResolvePagingParams,
    UserResolve,
    UserModalService,
    CompanyResolvePagingParams,
    CompanyService,
    CompanyModalService
} from './';

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(adminState, { useHash: true }),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        CompanyMgmtComponent,
        CompanyMgmtDetailComponent,
        CompanyMgmtDialogComponent,
        CompanyDialogComponent,
        CompanyDeleteDialogComponent,
        CompanyMgmtDeleteDialogComponent,
        LogsComponent,
        JhiConfigurationComponent,
        JhiHealthCheckComponent,
        JhiHealthModalComponent,
        JhiDocsComponent,
        JhiMetricsMonitoringComponent,
        JhiMetricsMonitoringModalComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        JhiHealthModalComponent,
        JhiMetricsMonitoringModalComponent,
        CompanyMgmtDialogComponent,
        CompanyMgmtDeleteDialogComponent
    ],
    providers: [
        AuditsService,
        JhiConfigurationService,
        JhiHealthService,
        JhiMetricsService,
        LogsService,
        UserResolvePagingParams,
        UserResolve,
        UserModalService,
        CompanyResolvePagingParams,
        CompanyService,
        CompanyModalService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAdminModule {}
