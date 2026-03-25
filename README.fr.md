# Frontend Archetype — Clean Architecture

Monorepo front-end structuré en Clean Architecture. Le code métier (`packages/core`) est 100% agnostique du framework et partagé entre une app Angular et une app React.

Le projet implémente un domaine concret : catalogue d'articles, panier avec calcul de TVA, et authentification mock. Le même core est consommé par les deux apps — sans duplication, sans réécriture lors d'un changement de framework.

---

## Architecture

```
domain          → entités, interfaces repository, erreurs, Result
application     → use cases, ports (interfaces techniques), mappers
infrastructure  → implémentations concrètes des ports (HTTP, logger, storage...)
presentation    → ViewModels, presenters, mappers vers la vue
```

### Règles de dépendance

```
domain        ← ne dépend de rien
application   ← dépend de domain uniquement
infrastructure← dépend de domain + application
presentation  ← dépend de domain + application
```

Ces règles sont vérifiées automatiquement par les tests d'architecture.

---

## Structure du projet

```
frontend-archetype/
├── packages/
│   ├── core/                          # Code métier partagé (@frontend-archetype/core)
│   │   └── src/
│   │       ├── domain/
│   │       │   ├── entities/          # User, Article, Cart, CartItem
│   │       │   ├── repositories/      # IUserRepository, IArticleRepository
│   │       │   ├── errors/            # DomainError, UserNotFoundError, ArticleNotFoundError
│   │       │   └── shared/            # Result<T, E>
│   │       ├── application/
│   │       │   ├── ports/             # ILogger, IHttpClient, IStorageService, ICookieService, IAuthService
│   │       │   └── use-cases/         # GetUser, GetAllUsers, GetArticle, GetAllArticles, AddToCart, Login
│   │       ├── infrastructure/
│   │       │   ├── repositories/      # InMemoryUserRepository, HttpUserRepository, InMemoryArticleRepository, HttpArticleRepository
│   │       │   ├── services/          # MockAuthService
│   │       │   └── adapters/          # ConsoleLogger, AxiosHttpClient, FetchHttpClient...
│   │       ├── presentation/
│   │       │   ├── user/              # UserViewModel, GetUserPresenter, GetAllUsersPresenter
│   │       │   └── article/           # ArticleViewModel, CartViewModel, GetAllArticlesPresenter, AddToCartPresenter
│   │       └── tests/
│   │           ├── architecture/      # Tests de règles de dépendance
│   │           ├── application/       # Tests des use cases
│   │           ├── infrastructure/    # Tests des repositories
│   │           └── presentation/      # Tests des presenters
│   ├── app-angular/                   # App Angular 17 standalone + Signals + InjectionToken
│   └── app-react/                     # App React 18 + Redux Toolkit + ioctopus (container IoC)
├── docker/
│   ├── docker-compose.yml             # JSON Server (API de développement)
│   └── db.json                        # Données seed
└── package.json                       # npm workspaces
```

---

## Démarrage rapide

### Prérequis
- Node.js 20+
- Docker Desktop

### Installation

```bash
git clone https://github.com/ake-deviant/frontend-clean-archetype.git
cd frontend-clean-archetype
npm install
```

### Lancer l'API de développement

```bash
npm run docker:up
# API disponible sur http://localhost:3001
# GET http://localhost:3001/users
# GET http://localhost:3001/users/1
# GET http://localhost:3001/articles
# GET http://localhost:3001/articles/1
```

### Lancer les apps

```bash
# Angular
cd packages/app-angular
npm start              # http://localhost:4200

# React
cd packages/app-react
npm run dev            # http://localhost:5173
```

---

## Scripts racine

| Commande | Description |
|---|---|
| `npm test` | Lance les tests Jest du core |
| `npm run lint` | ESLint sur tous les packages |
| `npm run lint:fix` | ESLint avec correction automatique |
| `npm run format` | Prettier sur tous les fichiers |
| `npm run format:check` | Vérifie le formatage sans modifier |
| `npm run build:core` | Compile le core vers `dist/` |
| `npm run docker:up` | Démarre l'API JSON Server |
| `npm run docker:down` | Arrête l'API JSON Server |

---

## Ajouter une feature

Exemple : ajouter `CreateUser`.

**1. Domain** — si nécessaire, ajouter une méthode à `IUserRepository` :
```typescript
// domain/repositories/user.repository.interface.ts
create(user: Omit<User, 'id'>): Promise<User>;
```

**2. Application** — créer le use case :
```
application/use-cases/create-user/
├── create-user.dto.ts
├── create-user.mapper.ts
└── create-user.use-case.ts
```

**3. Infrastructure** — implémenter dans les repositories :
```typescript
// InMemoryUserRepository et HttpUserRepository
async create(user: Omit<User, 'id'>): Promise<User> { ... }
```

**4. Presentation** — créer le presenter et le ViewModel si nécessaire.

**5. Tests** :
```
tests/
├── application/use-cases/create-user/create-user.use-case.spec.ts
└── presentation/user/create-user.presenter.spec.ts
```

**6. Composition root** — enregistrer le use case dans `app.providers.ts` (Angular) et `container.ts` (React).

---

## Principes clés

### Result pattern

Les use cases ne lèvent jamais d'exception métier. Ils retournent un `Result<T, E>` :

```typescript
const result = await getUserUseCase.execute({ userId: '1' });

if (result.isErr) {
  // result.error est typé : UserNotFoundError
  console.error(result.error.message);
  return;
}

// result.value est typé : GetUserResponse
const viewModel = presenter.present(result.value);
```

### Ports & Adapters

Toute dépendance externe est abstraite derrière une interface (port). L'implémentation concrète (adapter) est injectée dans la composition root :

```typescript
// Port (application/ports)
interface IHttpClient {
  get<T>(url: string): Promise<T>;
}

// Adapters disponibles (infrastructure/adapters)
new AxiosHttpClient(baseUrl)   // utilise axios
new FetchHttpClient(baseUrl)   // utilise fetch natif
```

### Composition root

L'assemblage des dépendances se fait en un seul endroit par app, sans que le core ne sache quel adapter est utilisé :

- Angular : `src/app/di/app.providers.ts` — utilise les `InjectionToken` natifs d'Angular + `useFactory`
- React : `src/di/container.ts` — utilise [ioctopus](https://www.npmjs.com/package/@evyweb/ioctopus), un conteneur IoC léger

#### Conteneur IoC React (ioctopus)

Les dépendances sont déclarées via des tokens typés et résolues automatiquement :

```typescript
// di/tokens.ts — registre typé
type AppRegistry = {
  httpClient: IHttpClient;
  articleRepository: IArticleRepository;
  addToCartUseCase: AddToCartUseCase;
  // ...
};

// di/container.ts — composition root
container.bind(DI_TOKENS.HTTP_CLIENT).toFactory(() => new AxiosHttpClient(env.apiUrl));
container.bind(DI_TOKENS.ARTICLE_REPOSITORY).toClass(HttpArticleRepository, [DI_TOKENS.HTTP_CLIENT]);
container.bind(DI_TOKENS.ADD_TO_CART_USE_CASE).toClass(AddToCartUseCase, [DI_TOKENS.ARTICLE_REPOSITORY, DI_TOKENS.LOGGER]);

// utilisation — entièrement typé
const useCase = container.get(DI_TOKENS.GET_USER_USE_CASE);
```

Changer d'implémentation ne nécessite de modifier qu'un seul appel `bind`.

### Variables d'environnement

| Fichier | Contexte |
|---|---|
| `packages/app-react/.env` | Dev React |
| `packages/app-react/.env.production` | Prod React |
| `packages/app-angular/src/environments/environment.development.ts` | Dev Angular |
| `packages/app-angular/src/environments/environment.ts` | Prod Angular |
