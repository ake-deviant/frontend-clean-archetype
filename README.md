# Frontend Archetype — Clean Architecture

> 🇫🇷 [Version française](./README.fr.md)

A front-end monorepo structured around Clean Architecture. The business logic (`packages/core`) is 100% framework-agnostic and shared between an Angular app and a React app.

---

## Architecture

```
domain          → entities, repository interfaces, errors, Result
application     → use cases, ports (technical interfaces), mappers
infrastructure  → concrete implementations of ports (HTTP, logger, storage...)
presentation    → ViewModels, presenters, view mappers
```

### Dependency rules

```
domain         ← depends on nothing
application    ← depends on domain only
infrastructure ← depends on domain + application
presentation   ← depends on domain + application
```

These rules are automatically enforced by architecture tests.

---

## Project structure

```
frontend-archetype/
├── packages/
│   ├── core/                          # Shared business logic (@frontend-archetype/core)
│   │   └── src/
│   │       ├── domain/
│   │       │   ├── entities/          # User
│   │       │   ├── repositories/      # IUserRepository
│   │       │   ├── errors/            # DomainError, UserNotFoundError
│   │       │   └── shared/            # Result<T, E>
│   │       ├── application/
│   │       │   ├── ports/             # ILogger, IHttpClient, IStorageService, ICookieService
│   │       │   └── use-cases/         # GetUserUseCase, GetAllUsersUseCase
│   │       ├── infrastructure/
│   │       │   ├── repositories/      # InMemoryUserRepository, HttpUserRepository
│   │       │   └── adapters/          # ConsoleLogger, AxiosHttpClient, FetchHttpClient...
│   │       ├── presentation/
│   │       │   └── user/              # UserViewModel, GetUserPresenter, GetAllUsersPresenter
│   │       └── tests/
│   │           ├── architecture/      # Dependency rule tests
│   │           ├── application/       # Use case tests
│   │           ├── infrastructure/    # Repository tests
│   │           └── presentation/      # Presenter tests
│   ├── app-angular/                   # Angular 17 standalone + Signals
│   └── app-react/                     # React 18 + Redux Toolkit
├── docker/
│   ├── docker-compose.yml             # JSON Server (development API)
│   └── db.json                        # Seed data
└── package.json                       # npm workspaces
```

---

## Getting started

### Prerequisites
- Node.js 20+
- Docker Desktop

### Installation

```bash
git clone https://github.com/ake-deviant/frontend-clean-archetype.git
cd frontend-clean-archetype
npm install
```

### Start the development API

```bash
npm run docker:up
# API available at http://localhost:3001
# GET http://localhost:3001/users
# GET http://localhost:3001/users/1
```

### Run the apps

```bash
# Angular
cd packages/app-angular
npm start              # http://localhost:4200

# React
cd packages/app-react
npm run dev            # http://localhost:5173
```

---

## Available scripts

| Command | Description |
|---|---|
| `npm test` | Run Jest tests on core |
| `npm run lint` | ESLint on all packages |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier on all files |
| `npm run format:check` | Check formatting without modifying |
| `npm run build:core` | Compile core to `dist/` |
| `npm run docker:up` | Start JSON Server API |
| `npm run docker:down` | Stop JSON Server API |

---

## Adding a feature

Example: adding `CreateUser`.

**1. Domain** — if needed, add a method to `IUserRepository`:
```typescript
// domain/repositories/user.repository.interface.ts
create(user: Omit<User, 'id'>): Promise<User>;
```

**2. Application** — create the use case:
```
application/use-cases/create-user/
├── create-user.dto.ts
├── create-user.mapper.ts
└── create-user.use-case.ts
```

**3. Infrastructure** — implement in the repositories:
```typescript
// InMemoryUserRepository and HttpUserRepository
async create(user: Omit<User, 'id'>): Promise<User> { ... }
```

**4. Presentation** — create the presenter and ViewModel if needed.

**5. Tests**:
```
tests/
├── application/use-cases/create-user/create-user.use-case.spec.ts
└── presentation/user/create-user.presenter.spec.ts
```

**6. Composition root** — register the use case in `app.providers.ts` (Angular) and `container.ts` (React).

---

## Key concepts

### Result pattern

Use cases never throw business exceptions. They return a `Result<T, E>`:

```typescript
const result = await getUserUseCase.execute({ userId: '1' });

if (result.isErr) {
  // result.error is typed: UserNotFoundError
  console.error(result.error.message);
  return;
}

// result.value is typed: GetUserResponse
const viewModel = presenter.present(result.value);
```

### Ports & Adapters

Every external dependency is abstracted behind an interface (port). The concrete implementation (adapter) is injected at the composition root:

```typescript
// Port (application/ports)
interface IHttpClient {
  get<T>(url: string): Promise<T>;
}

// Available adapters (infrastructure/adapters)
new AxiosHttpClient(baseUrl)   // uses axios
new FetchHttpClient(baseUrl)   // uses native fetch
```

### Composition root

Dependency wiring happens in a single place per app — the core never knows which adapter is used:

- Angular: `src/app/di/app.providers.ts`
- React: `src/di/container.ts`

### Environment variables

| File | Context |
|---|---|
| `packages/app-react/.env` | React dev |
| `packages/app-react/.env.production` | React prod |
| `packages/app-angular/src/environments/environment.development.ts` | Angular dev |
| `packages/app-angular/src/environments/environment.ts` | Angular prod |
