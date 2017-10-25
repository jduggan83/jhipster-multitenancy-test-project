import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Zoo } from './zoo.model';
import { ZooModalService } from './zoo-modal.service';
import { ZooService } from './zoo.service';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-zoo-mgmt-dialog',
    templateUrl: './zoo-management-dialog.component.html'
})
export class ZooMgmtDialogComponent implements OnInit {

    zoo: Zoo;
    isSaving: boolean;
    isEditing: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private zooService: ZooService,
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
        if (this.zoo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.zooService.update(this.zoo));
        } else {
            this.subscribeToSaveResponse(this.zooService.create(this.zoo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Zoo>) {
        result.subscribe((res: Zoo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Zoo) {
        this.eventManager.broadcast({ name: 'zooListModification', content: 'OK'});
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
    selector: 'jhi-zoo-dialog',
    template: ''
})
export class ZooDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private zooModalService: ZooModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.zooModalService
                    .open(ZooMgmtDialogComponent as Component, params['id']);
            } else {
                this.zooModalService
                    .open(ZooMgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
