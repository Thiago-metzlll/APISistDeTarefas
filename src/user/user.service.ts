// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { User } from './model/users.model';



@Injectable()
export class UsersService {
    private users: User[] = [];
    private idCounter = 1;

    // Cria um novo usuário
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user: User = {
            id: this.idCounter++,
            ...createUserDto,
        };
        this.users.push(user);
        return user;
    }

    // Busca usuário por email
    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email);
    }

    // Busca usuário por ID
    async findById(id: number): Promise<User> {
        const user = this.users.find((u) => u.id === id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return user;
    }
}
