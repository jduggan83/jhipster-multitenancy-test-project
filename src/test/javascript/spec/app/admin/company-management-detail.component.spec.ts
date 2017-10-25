/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../test.module';
import { MockActivatedRoute } from '../../helpers/mock-route.service';
import { CompanyMgmtDetailComponent } from '../../../../../main/webapp/app/admin/company-management/company-management-detail.component';
import { CompanyService } from '../../../../../main/webapp/app/admin/company-management/company.service';
import { Company } from '../../../../../main/webapp/app/admin/company-management/company.model';

describe('Component Tests', () => {

    describe('Company Management Detail Component', () => {
        let comp: CompanyMgmtDetailComponent;
        let fixture: ComponentFixture<CompanyMgmtDetailComponent>;
        let service: CompanyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CompanyMgmtDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CompanyService,
                    JhiEventManager
                ]
            }).overrideTemplate(CompanyMgmtDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyMgmtDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Company(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.company).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
