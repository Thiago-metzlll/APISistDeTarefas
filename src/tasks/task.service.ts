import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Task } from './model/tasks.model';
import { Role } from '../user/model/role.enum';
import { User } from '../user/model/users.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  // Criar tarefas manualmente só para teste (o professor não quer POST)
  seedTasks() {
    this.tasks.push(
      { id: this.idCounter++, title: 'Criar API', done: false, role: Role.DEV },
      { id: this.idCounter++, title: 'Criar protótipo', done: false, role: Role.DESIGNER },
      { id: this.idCounter++, title: 'Revisar equipe', done: false, role: Role.MANAGER },
    );
  }

  findByUserRole(role: Role) {
    return this.tasks.filter(task => task.role === role);
  }

  toggleDone(id: number, user: User) {
    const task = this.tasks.find(t => t.id === id);

    if (!task) throw new NotFoundException('Tarefa não encontrada');

    if (task.role !== user.role) {
      throw new ForbiddenException('Você não tem permissão para alterar esta tarefa');
    }

    task.done = !task.done;

    return task;
  }
}
