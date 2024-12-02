import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: any;
  @Output() remove = new EventEmitter<void>();
  isModalOpen = false;

  openEditModal() {
    this.isModalOpen = true;
  }

  closeEditModal() {
    this.isModalOpen = false;
  }

  saveTask(updatedTask: any) {
    // Apply the updated task data to the original task
    this.task.title = updatedTask.title;
    this.task.description = updatedTask.description;
    this.closeEditModal();
  }

  removeTask() {
    this.remove.emit();
  }
}
