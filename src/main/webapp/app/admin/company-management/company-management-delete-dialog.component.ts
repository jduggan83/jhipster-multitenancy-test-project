import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Company } from './company.model';
import { CompanyModalService } from './company-modal.service';
import { CompanyService } from './company.service';

@Component({
    selector: 'jhi-company-mgmt-delete-dialog',
    templateUrl: './company-management-delete-dialog.component.html'
})
export class CompanyMgmtDeleteDialogComponent {

    company: Company;

    constructor(
        private companyService: CompanyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({ name: 'companyListModification',
                content: 'Deleted a company'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-company-delete-dialog',
    template: ''
})
export class CompanyDeleteDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private companyModalService: CompanyModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.companyModalService.open(CompanyMgmtDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
