import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Tester } from './tester.model';
import { TesterService } from './tester.service';

@Component({
    selector: 'jhi-tester-mgmt-detail',
    templateUrl: './tester-management-detail.component.html'
})
export class TesterMgmtDetailComponent implements OnInit, OnDestroy {

    tester: Tester;
    private subscription: Subscription;

    constructor(
        private testerService: TesterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.testerService.find(id).subscribe((tester) => {
            this.tester = tester;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
