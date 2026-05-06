import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDetail } from './items-detail';

describe('ItemsDetail', () => {
  let component: ItemsDetail;
  let fixture: ComponentFixture<ItemsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
