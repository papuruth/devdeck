# DevDeck Copilot Instructions

This repository is a Next.js 15 App Router project built with TypeScript, React 18, Styled Components, MUI, Redux, Redux Saga, and Workbox-based PWA support.

## Project structure

- `src/app/` contains route folders and page entrypoints.
- `src/app/<tool>/page.tsx` exports route metadata and renders a client wrapper.
- `src/app/<tool>/client-wrapper.tsx` uses `dynamic(..., { ssr: false })` to load client-only UI.
- `src/components/` contains shared UI components and layout primitives.
- `src/views/` contains tool-specific UI and interactive page implementations.
- `src/store/` contains Redux reducers, sagas, and store setup.
- `src/localization/` centralizes user-facing strings in `english.tsx`.
- `src/lib/` contains provider wrappers and Next.js integration helpers.
- `src/sw.ts` contains the service worker logic for PWA caching and lifecycle.
- `src/components/PWAUpdateWatcher/` registers the SW and shows update notifications.
- `src/utils/` contains global constants, SEO metadata, hooks, and helper utilities.

## Coding conventions

- Follow the existing code style: TypeScript with React, double quotes for strings, semicolons, and interface/typed props.
- Keep server components separate from client components. Only use `"use client"` in files that need browser APIs or state/hooks.
- Use path aliases like `components/...`, `utils/...`, `lib/...`, `localization`, and `services/...` when importing.
- Avoid hardcoding localized strings. Use `localization` keys from `src/localization/languages/english.tsx` whenever possible.
- Keep route metadata in `page.tsx` and use `ToolJsonLd` plus `SEO_META` for per-page schema and metadata.
- Prefer `styled-components` for component-level styling and use CSS custom properties for theming.
- Use existing provider pattern in `src/app/layout.tsx` for global application state, theme, and analytics.

## When adding or updating tools

- Add a new route folder under `src/app/<slug>/`.
- Export `metadata` from the route page using `next` metadata types.
- Use a `client-wrapper.tsx` to load the client-only component if the tool requires browser behavior.
- Add or update the tool registry in `src/utils/globalConstants.tsx` to keep navigation and tool listing consistent.
- Keep shared UI in `src/components/` and tool-specific views in `src/views/`.

## Runtime expectations

- The app is a PWA with offline support and service worker registration.
- The service worker is implemented in `src/sw.ts` and uses Workbox for caching strategies.
- Update notifications are handled in `src/components/PWAUpdateWatcher/index.tsx`.

## Good practices

- Run `yarn format`, `yarn lint`, and `yarn typecheck` for final validation.
- Do not introduce server-side `window` or `document` access in app route files.
- Keep imports consistent with existing alias paths and avoid deep relative imports when aliased paths are available.
- Preserve the current UI direction, which is mostly functional and minimal with accessible button states.

## If asked for a task

- Prioritize existing patterns from `src/app/`, `src/components/`, `src/views/`, and `src/utils/`.
- Use the repository's conventions for localization, metadata, and PWA behavior.
- When generating code, match the current style and avoid broad architectural changes unless explicitly requested.
