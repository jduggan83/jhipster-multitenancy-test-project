/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../test.module';
import { MockActivatedRoute } from '../../helpers/mock-route.service';
import { SubscriptionMgmtDetailComponent } from '../../../../../main/webapp/app/admin/subscription-management/subscription-management-detail.component';
import { SubscriptionService } from '../../../../../main/webapp/app/admin/subscription-management/subscription.service';
import { Subscription } from '../../../../../main/webapp/app/admin/subscription-management/subscription.model';

describe('Component Tests', () => {

    describe('Subscription Management Detail Component', () => {
        let comp: SubscriptionMgmtDetailComponent;
        let fixture: ComponentFixture<SubscriptionMgmtDetailComponent>;
        let service: SubscriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SubscriptionMgmtDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SubscriptionService,
                    JhiEventManager
                ]
            }).overrideTemplate(SubscriptionMgmtDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionMgmtDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Subscription(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.subscription).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
