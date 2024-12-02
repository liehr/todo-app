import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  standalone: false,
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent implements OnInit {
  @Input() task: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedTask: any;

  ngOnInit() {
    // Create a shallow copy of the task to avoid direct mutation
    this.editedTask = { ...this.task };
  }

  closeModal() {
    this.close.emit();
  }

  saveTask() {
    // Emit the updated task
    this.save.emit(this.editedTask);
    this.closeModal();
  }
}
