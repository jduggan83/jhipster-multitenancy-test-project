import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tester } from './tester.model';
import { TesterModalService } from './tester-modal.service';
import { TesterService } from './tester.service';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tester-mgmt-dialog',
    templateUrl: './tester-management-dialog.component.html'
})
export class TesterMgmtDialogComponent implements OnInit {

    tester: Tester;
    isSaving: boolean;
    isEditing: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private testerService: TesterService,
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
        if (this.tester.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testerService.update(this.tester));
        } else {
            this.subscribeToSaveResponse(this.testerService.create(this.tester));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tester>) {
        result.subscribe((res: Tester) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Tester) {
        this.eventManager.broadcast({ name: 'testerListModification', content: 'OK'});
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
    selector: 'jhi-tester-dialog',
    template: ''
})
export class TesterDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testerModalService: TesterModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testerModalService
                    .open(TesterMgmtDialogComponent as Component, params['id']);
            } else {
                this.testerModalService
                    .open(TesterMgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
