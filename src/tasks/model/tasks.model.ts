import { Role } from "../../user/model/role.enum";

export class Task {
  id: number;
  title: string;
  done: boolean;
  role: Role;  // quem pode ver e atualizar
}
