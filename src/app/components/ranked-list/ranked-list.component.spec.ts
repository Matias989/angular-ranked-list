import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedListComponent } from './ranked-list.component';

describe('RankedListComponent', () => {
  let component: RankedListComponent;
  let fixture: ComponentFixture<RankedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
