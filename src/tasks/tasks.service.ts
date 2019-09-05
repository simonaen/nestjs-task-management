import { Injectable, NotFoundException, Inject } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task-dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}


    // private tasks: Task[] = []

    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const {status, search} = filterDto

    //     let tasks = this.getAllTasks()

    //     if(status) {
    //         tasks = tasks.filter(t => t.status === status)
    //     }

    //     if(search) {
    //         tasks = tasks.filter(t => 
    //             t.title.includes(search) || 
    //             t.description.includes(search)
    //             )
    //     }

    //     return tasks
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return found
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }
    // deleteTask(id: string): Task[] {
    //     const found = this.getTaskById(id)

    //     this.tasks = this.tasks.filter(t => t.id !== found.id)
        
    //     return this.tasks
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task: Task = this.getTaskById(id)
    //     task.status = status

    //     return task
    // }
}
