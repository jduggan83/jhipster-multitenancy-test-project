import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Company } from './company.model';
import { CompanyService } from './company.service';

@Component({
    selector: 'jhi-company-mgmt-detail',
    templateUrl: './company-management-detail.component.html'
})
export class CompanyMgmtDetailComponent implements OnInit, OnDestroy {

    company: Company;
    private subscription: Subscription;

    constructor(
        private companyService: CompanyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.companyService.find(id).subscribe((company) => {
            this.company = company;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
