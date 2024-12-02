import { Component } from '@angular/core';

interface Task {
  title: string;
  description: string;
  id: number;
}

interface Lane {
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-lanes',
  standalone: false,

  templateUrl: './lanes.component.html',
  styleUrl: './lanes.component.css'
})
export class LanesComponent {
  lanes: Lane[] = [
    { title: 'To Do', tasks: [] },
    { title: 'WIP', tasks: [] },
    { title: 'Done', tasks: [] }
  ];

  // Method to add a new task to the "To Do" lane
  addTask() {
    const newTask: Task = {
      title: 'New Task',
      description: 'My awesome new description!',
      id: new Date().getTime()
    };
    this.lanes[0].tasks.push(newTask);
  }

  removeTaskFromLane(laneIndex: number, task: any) {
    this.lanes[laneIndex].tasks = this.lanes[laneIndex].tasks.filter(t => t.id !== task.id);
  }

  // Handles drop events to move tasks between lanes
  onDrop(event: DragEvent, laneIndex: number) {
    event.preventDefault(); // Prevent default browser behavior
    const taskData = event.dataTransfer?.getData('task');
    if (taskData) {
      const task: Task = JSON.parse(taskData);

      // Remove task from its current lane
      this.lanes.forEach(lane => {
        lane.tasks = lane.tasks.filter(t => t.id !== task.id);
      });

      // Add task to the new lane
      this.lanes[laneIndex].tasks.push(task);
    }
  }

  // Triggered when dragging a task
  onDragStart(event: DragEvent, task: Task) {
    event.dataTransfer?.setData('task', JSON.stringify(task));
  }

  // Optional: Allow dragover to indicate a valid drop target
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necessary to allow dropping
  }
}
