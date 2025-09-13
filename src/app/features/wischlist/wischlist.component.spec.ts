import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WischlistComponent } from './wischlist.component';

describe('WischlistComponent', () => {
  let component: WischlistComponent;
  let fixture: ComponentFixture<WischlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WischlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WischlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
