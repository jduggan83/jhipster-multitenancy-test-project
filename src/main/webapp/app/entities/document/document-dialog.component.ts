import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Company } from '../../admin/company-management/company.model';
import { CompanyService } from '../../admin/company-management/company.service';
import { ResponseWrapper, Principal} from '../../shared';
import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Document } from './document.model';
import { DocumentPopupService } from './document-popup.service';
import { DocumentService } from './document.service';

@Component({
    selector: 'jhi-document-dialog',
    templateUrl: './document-dialog.component.html'
})
export class DocumentDialogComponent implements OnInit {

    document: Document;
    companies: Company[];
    currentAccount: any;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentService: DocumentService,
        private eventManager: JhiEventManager,
        private companyService: CompanyService,
        private principal: Principal
        ) {
            this.principal.identity().then((account) => {
                this.currentAccount = account;
            });
        }

    ngOnInit() {
        this.companyService.query()
            .subscribe((res: ResponseWrapper) => { this.companies = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.currentAccount.company) {
            this.document.company = this.currentAccount.company;
        }
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(
                this.documentService.create(this.document));
        }
    }

    private subscribeToSaveResponse(result: Observable<Document>) {
        result.subscribe((res: Document) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Document) {
        this.eventManager.broadcast({ name: 'documentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    trackCompanyById(index: number, item: Company) {
        return item.id;
    }
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-document-popup',
    template: ''
})
export class DocumentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentPopupService: DocumentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentPopupService
                    .open(DocumentDialogComponent as Component, params['id']);
            } else {
                this.documentPopupService
                    .open(DocumentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
