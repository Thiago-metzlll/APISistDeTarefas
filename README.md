Este projeto é uma evolução da newAPINest, já que reaproveita praticamente toda a base do projeto original.
Mantivemos o uso do NestJS, a mesma arquitetura modular e conceitos como DTOs, pipes, guards, strategies, além de autenticação com bcrypt, tokens e cookies.

A API foi pensada para integrar com um sistema de gerenciamento de tarefas, no qual cada usuário possui um papel específico e tarefas associadas a ele.

Por isso, além das tecnologias já utilizadas, foi criado um decorator customizado (roles.decorator), junto com um enum, para definir os papéis dos usuários diretamente na API e controlar quais tarefas cada um pode acessar.
