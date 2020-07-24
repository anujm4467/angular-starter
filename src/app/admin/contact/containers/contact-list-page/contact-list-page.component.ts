import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '@app/shared/dialog';
import { ContactModel } from '../../models';
import { ContactState } from '../../reducers';
import { ContactActions } from '../../actions';
import { ContactSelectors, ContactListPageSelectors } from '../../selectors';
import { ContactTableComponent } from '../../components';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.scss']
})
export class ContactListPageComponent implements OnInit {
  @ViewChild('contactTable') contactTable: ContactTableComponent;

  pending$: Observable<boolean>;
  notEmpty$: Observable<boolean>;
  contacts$: Observable<Array<ContactModel>>;

  selectedContacts: Array<ContactModel> = [];
  isShowActions = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<ContactState>,
    private dialog: MatDialog
  ) {
    this.contacts$ = this.store.pipe(select(ContactSelectors.selectAllContacts));
    this.pending$ = this.store.pipe(select(ContactListPageSelectors.selectContactListPagePending));
    this.notEmpty$ = this.contacts$.pipe(map(contacts => !!contacts && contacts.length > 0));

    this.store.dispatch(ContactActions.findContact({ query: {} }));
  }

  ngOnInit() {
  }

  onSelectionChange(contacts: Array<ContactModel>) {
    this.selectedContacts = contacts;
    this.isShowActions = contacts.length > 0;
  }

  onDeleteSelectedContacts() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete all selected contacts?'
      }
    });
  }

  onSelectRow(contact: ContactModel) {
    this.router.navigate([contact.id], { relativeTo: this.route });
  }

  deSelectAll() {
    this.contactTable.deSelectAll();
  }

}
