import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tester } from './tester.model';
import { TesterModalService } from './tester-modal.service';
import { TesterService } from './tester.service';

@Component({
    selector: 'jhi-tester-mgmt-delete-dialog',
    templateUrl: './tester-management-delete-dialog.component.html'
})
export class TesterMgmtDeleteDialogComponent {

    tester: Tester;

    constructor(
        private testerService: TesterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({ name: 'testerListModification',
                content: 'Deleted a tester'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tester-delete-dialog',
    template: ''
})
export class TesterDeleteDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testerModalService: TesterModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.testerModalService.open(TesterMgmtDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
