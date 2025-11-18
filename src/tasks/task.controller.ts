import { Controller, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/model/role.enum';
import { TasksService } from './task.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findUserTasks(@Req() req) {
    return this.tasksService.findByUserRole(req.user.role);
  }

  @Patch(':id')
  @Roles(Role.DEV, Role.DESIGNER) // só quem tiver esses cargos pode atualizar
  toggleTask(@Param('id') id: number, @Req() req) {
    return this.tasksService.toggleDone(Number(id), req.user);
  }
}
