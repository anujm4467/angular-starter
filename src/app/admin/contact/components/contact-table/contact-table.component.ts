import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmDialogComponent } from '@app/shared/dialog';
import { ContactModel } from '../../models';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit, OnChanges {
  @Input() data: Array<ContactModel>;

  @Output() selectRow: EventEmitter<ContactModel> = new EventEmitter();
  @Output() selectionChange: EventEmitter<Array<ContactModel>> = new EventEmitter();
  @Output() delete: EventEmitter<ContactModel> = new EventEmitter();
  @Output() disable: EventEmitter<ContactModel> = new EventEmitter();

  dataSource: MatTableDataSource<ContactModel>;
  displayedColumns = ['select', 'username', 'name', 'email', 'phone', 'actions'];
  selection = new SelectionModel<ContactModel>(true, []);

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && this.data) {
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  onRowClicked(row: ContactModel) {
    this.selectRow.emit(row);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }

    this.selectionChange.emit(this.selection.selected);
  }

  toggleSelectionRow(row: ContactModel): void {
    this.selection.toggle(row);
    this.selectionChange.emit(this.selection.selected);
  }

  deSelectAll() {
    this.selection.clear();
    this.selectionChange.emit(this.selection.selected);
  }

  onDeleteClicked(contact: ContactModel) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete?'
      }
    }).afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.delete.emit(contact);
        }
      });
  }

  onDisableClicked(contact: ContactModel) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete?'
      }
    }).afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.disable.emit(contact);
        }
      });
  }

}
