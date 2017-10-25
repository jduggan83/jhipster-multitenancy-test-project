import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Company } from './company.model';
import { CompanyModalService } from './company-modal.service';
import { CompanyService } from './company.service';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-company-mgmt-dialog',
    templateUrl: './company-management-dialog.component.html'
})
export class CompanyMgmtDialogComponent implements OnInit {

    company: Company;
    isSaving: boolean;
    isEditing: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private companyService: CompanyService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(
                this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<Company>) {
        result.subscribe((res: Company) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Company) {
        this.eventManager.broadcast({ name: 'companyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-company-dialog',
    template: ''
})
export class CompanyDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private companyModalService: CompanyModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.companyModalService
                    .open(CompanyMgmtDialogComponent as Component, params['id']);
            } else {
                this.companyModalService
                    .open(CompanyMgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
