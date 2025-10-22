# Padrões de Projeto no VARU

Este documento indica onde já existem exemplos ou pontos de partida para os padrões de projeto solicitados, conforme o código atual do VARU.

## Implementações CRUD Completas

Foram implementadas funcionalidades CRUD completas para:

- Clientes
- Fornecedores
- Movimentações

Seguindo os mesmos padrões e design do CRUD de produtos já existente.

---

## Opção 01

### Singleton (2 exemplos)

- **Exemplo 1:** Instância única do Prisma Client  
  [`src/lib/prisma.ts`](src/lib/prisma.ts)

- **Exemplo 2:** Você pode criar um singleton para configuração global ou para um serviço de autenticação  
  Sugestão de local: [`src/lib/utils.ts`](src/lib/utils.ts)

---

### Template Method (3 exemplos)

- **Exemplo 1:** Classe base para relatórios, com método template para gerar diferentes tipos de relatório  
  Sugestão de local: [`src/app/relatorios/`](src/app/relatorios/)

- **Exemplo 2:** Classe base para movimentações, com método template para diferentes operações  
  Sugestão de local: [`src/app/movimentacoes/`](src/app/movimentacoes/)

- **Exemplo 3:** Classe base para produtos ou fornecedores, com método template para validação ou cadastro  
  Sugestão de local: [`src/app/produtos/`](src/app/produtos/) ou [`src/app/fornecedores/`](src/app/fornecedores/)

---

### Novo Design Pattern (3 exemplos)

Escolha um padrão, por exemplo, **Factory**, **Strategy** ou **Observer**.

- **Exemplo 1:** Factory para criação de clientes, produtos ou fornecedores  
  Sugestão de local: [`src/app/clientes/`](src/app/clientes/), [`src/app/produtos/`](src/app/produtos/)

- **Exemplo 2:** Strategy para diferentes formas de cálculo ou validação  
  Sugestão de local: [`src/lib/utils.ts`](src/lib/utils.ts)

- **Exemplo 3:** Observer para notificações de movimentações ou relatórios  
  Sugestão de local: [`src/hooks/use-toast.ts`](src/hooks/use-toast.ts)

---

## Opção 02

### 3 outros padrões de projetos (2 exemplos de cada)

Escolha três padrões diferentes, por exemplo: **Factory**, **Strategy**, **Observer**.

- **Factory**
  - Exemplo 1: Criação de instâncias de clientes  
    [`src/app/clientes/`](src/app/clientes/)
  - Exemplo 2: Criação de instâncias de produtos  
    [`src/app/produtos/`](src/app/produtos/)

- **Strategy**
  - Exemplo 1: Estratégias de validação de dados  
    [`src/lib/utils.ts`](src/lib/utils.ts)
  - Exemplo 2: Estratégias de cálculo em movimentações  
    [`src/app/movimentacoes/`](src/app/movimentacoes/)

- **Observer**
  - Exemplo 1: Notificações de toast  
    [`src/hooks/use-toast.ts`](src/hooks/use-toast.ts)
  - Exemplo 2: Atualização de relatórios em tempo real  
    [`src/app/relatorios/`](src/app/relatorios/)

---

## Observações

- Os arquivos e pastas indicados já existem no projeto VARU e podem ser usados como base para implementar os padrões.
- Adapte este documento conforme for implementando os exemplos.
- Todos os códigos dos padrões devem ser entregues zipados.
- É obrigatório entrar na equipe **REUSO** no AVA para receber nota.


---


hoje dia 21/10/2025 - foi realizada a seguinte atividade (06 Sistema - Conexão BD, ORM e DatabaseFirst) contendo tudo conforme pedido na ativadade.
