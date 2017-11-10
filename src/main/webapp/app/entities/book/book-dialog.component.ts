import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Company } from '../../admin/company-management/company.model';
import { CompanyService } from '../../admin/company-management/company.service';
import { ResponseWrapper, Principal} from '../../shared';
import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Book } from './book.model';
import { BookPopupService } from './book-popup.service';
import { BookService } from './book.service';

@Component({
    selector: 'jhi-book-dialog',
    templateUrl: './book-dialog.component.html'
})
export class BookDialogComponent implements OnInit {

    book: Book;
    companies: Company[];
    currentAccount: any;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bookService: BookService,
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
            this.book.company = this.currentAccount.company;
        }
        if (this.book.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bookService.update(this.book));
        } else {
            this.subscribeToSaveResponse(
                this.bookService.create(this.book));
        }
    }

    private subscribeToSaveResponse(result: Observable<Book>) {
        result.subscribe((res: Book) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Book) {
        this.eventManager.broadcast({ name: 'bookListModification', content: 'OK'});
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
    selector: 'jhi-book-popup',
    template: ''
})
export class BookPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookPopupService: BookPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bookPopupService
                    .open(BookDialogComponent as Component, params['id']);
            } else {
                this.bookPopupService
                    .open(BookDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
