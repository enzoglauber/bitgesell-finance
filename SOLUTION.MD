## 🔧 Backend Improvements

- ✅ Replaced `fs.readFileSync` with asynchronous `fs.promises.readFile` to prevent blocking I/O
- ✅ Created reusable utility functions (`readData`, `writeData`)
- ✅ Added payload validation using `zod` with a shared `ItemSchema`
- ✅ Implemented proper error handling:
  - 400 for invalid payloads or malformed IDs
  - 404 when an item is not found
- ✅ Refactored the `/api/stats` endpoint with in-memory cache for performance optimization
- ✅ Refined `/api/items` to support `limit` and `q` query parameters for server-side filtering and pagination
- ✅ Added unit tests with Jest + Supertest using mocks to simulate data and cache behavior

## 🧪 Test Coverage

- ✅ `GET /api/items`
- ✅ `GET /api/items/:id`
- ✅ `POST /api/items`
- ✅ `GET /api/stats` (mocked, including cache simulation)

## 💻 Frontend Improvements

- ✅ Refactored `ItemsTable` into a reusable, generic and typed component using TanStack React Table
- ✅ Implemented dark/light theme toggle
- ✅ Implemented server-side pagination and filtering with `page`, `limit`, and `q` query parameters
- ✅ Created `useItems` hook using React Query with `placeholderData` for smooth transitions
- ✅ Search is now fully server-driven (no local filtering)
- ✅ Skeleton loaders added for a polished loading state experience
- ✅ Pagination integrated using ShadCN UI's `Pagination`, `PaginationNext`, `PaginationPrevious`
- ✅ Row-level navigation implemented (`onClick` on `TableRow` navigates to item detail)
- ✅ Folder structure organized following feature-first and component separation practices
- ✅ Add total results indicator (e.g., "42 items found")
- ✅ Debounce search input to reduce request frequency
- ✅ New form page `/items/new` built with accessible `Card`, `Input`, `Label`, and dynamic error messages
- ✅ Used `react-hook-form` combined with `zod` schema and `zodResolver` for strong and scalable form validation
- ✅ Integrated `sonner` toast system to display feedback on successful item creation
- ✅ Created `StatsCards` component to display stats (total items, avg price, unique categories)
- ✅ Refactored `StatsCards` to receive data via props for better reusability and separation of concerns
- ✅ Integrated `useStats` hook with React Query and passed data to `StatsCards`
- ✅ Ensured stats are updated in real-time by invalidating `stats` query on item creation
- ✅ Added floating action button in `ItemsTable` for navigation to the item creation form

## 🧠 Architectural Decisions

- 📦 Server-side filtering allows for large-scale datasets and removes unnecessary client-side filtering logic
- 🧩 React Query handles caching, loading and background fetch states
- ♻️ Extracted table logic from page for reuse and better testability
- ✨ ShadCN and Tailwind CSS provide clean, accessible UI with low overhead
