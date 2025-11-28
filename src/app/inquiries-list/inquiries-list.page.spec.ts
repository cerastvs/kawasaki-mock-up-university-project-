import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InquiriesListPage } from './inquiries-list.page';

describe('InquiriesListPage', () => {
  let component: InquiriesListPage;
  let fixture: ComponentFixture<InquiriesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiriesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
