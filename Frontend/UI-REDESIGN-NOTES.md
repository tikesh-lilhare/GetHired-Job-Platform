# GetHired UI redesign – notes

- `/` is now a public Home page. Login moved to `/login`.
- Public routes: `/`, `/login`, `/register`, `/jobs`, `/jobs/:id`. Everything else redirects to `/login` without a token (`components/ProtectedRoute.jsx`).
- Theme lives in `src/index.css` (design tokens + Bootstrap overrides). Bootstrap grid is still used.
- Shared pieces: `src/components/*` (Icon, Logo, Footer, Loader, EmptyState, PageHeader, StatusBadge, StatusStepper, ScoreRing), `src/utils/format.js`, `src/utils/toast.js` (replaces `alert()`).
- Import paths fixed to match real file names (`NavBar.jsx`, `Jobservice.jsx`) so the project builds on Linux/macOS.
- No service / API / localStorage logic was changed.
- To let anonymous visitors see live jobs on the Home page, allow `GET /jobs/all` and `GET /jobs/{id}` without JWT in your API Gateway / Spring Security config.
