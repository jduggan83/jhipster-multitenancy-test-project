/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AnimalDetailComponent } from '../../../../../../main/webapp/app/entities/animal/animal-detail.component';
import { AnimalService } from '../../../../../../main/webapp/app/entities/animal/animal.service';
import { Animal } from '../../../../../../main/webapp/app/entities/animal/animal.model';

describe('Component Tests', () => {

    describe('Animal Management Detail Component', () => {
        let comp: AnimalDetailComponent;
        let fixture: ComponentFixture<AnimalDetailComponent>;
        let service: AnimalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AnimalDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AnimalService,
                    JhiEventManager
                ]
            }).overrideTemplate(AnimalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnimalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnimalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Animal(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.animal).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
