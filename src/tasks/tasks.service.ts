import { Injectable, NotFoundException, Inject } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task-dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}



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

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)
 
        if(result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} doesn't exist`)
        }
     }

    // updateTaskStatus(id: number, status: TaskStatus): Promise<UpdateResult> {
    //     return this.taskRepository.update(id,status)
    // }
}
