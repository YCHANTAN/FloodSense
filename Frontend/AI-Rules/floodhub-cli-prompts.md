# FloodSense: Architecture Implementation Prompts (CLI Optimized)

*Instructions for User: Feed this entire document to your Gemini CLI or pass it as a system prompt/context file. The prompts are strictly divided into Backend and Frontend.*

---

## SYSTEM CONTEXT (Provide this to the CLI first)
**Role:** You are an expert Frontend TypeScript Developer and UI/UX Engineer specializing in modern Single Page Applications (SPAs).
**Task:** Build the FloodSense frontend application step-by-step based on the prompts provided below.
**Frontend Tech Stack (Strictly Enforced):**
* **Build Tool:** Vite
* **Framework:** React 18+ (Functional Components only)
* **Language:** TypeScript (Strict mode enabled, define interfaces/types for all props and state)
* **Styling:** Tailwind CSS
* **State Management:** Redux Toolkit (RTK)
* **Routing:** React Router v6
* **HTTP Client:** Axios
* **Mapping:** Mapbox GL JS / React Map GL

**Strict Rules:** 1. The Frontend must follow Feature-Driven Design. A feature cannot import internal components from another feature.
2. Output complete, production-ready TypeScript code for each file requested. Do not use placeholders unless explicitly told to.
3. Ensure all components are mobile-responsive and accessible.

---

## PART 1: FRONTEND (Vite + React SPA + TypeScript)

### Prompt 5: Setup & Store Configuration
Initialize the core setup for the FloodSense Vite SPA using TypeScript.

Create the following files:
1. `src/app/store.ts`: Set up Redux Toolkit `configureStore` with placeholders for `mapReducer` and `authReducer`. Export `RootState` and `AppDispatch` types.
2. `src/services/api.ts`: Create an Axios instance pointing to `import.meta.env.VITE_API_URL`. Add a request interceptor to attach a Bearer token. Export the configured instance.
3. `src/app/routes.tsx`: Define React Router v6 `createBrowserRouter`. Include paths for `/` (Dashboard/Map) and `/report` (Submit Report).
4. `src/main.tsx`: Wrap the application in the Redux `Provider` and `RouterProvider`. Ensure the root element is strictly typed.

### Prompt 6: Global UI Components
Generate reusable, accessible, global UI components using Tailwind CSS and TypeScript interfaces.

Create the following files:
1. `src/components/Button/Button.tsx`: A reusable button with variants (primary, secondary, danger) and a loading state (spinner). Define a `ButtonProps` interface extending standard HTML button attributes.
2. `src/components/Modal/Modal.tsx`: A reusable portal-based modal taking `isOpen`, `onClose`, `title`, and `children`. Define strict types for these props.
3. `src/hooks/useGeolocation.ts`: A custom hook that fetches browser coordinates. Return a strictly typed object: `{ location: { lat: number; lng: number } | null, error: string | null, loading: boolean }`.

### Prompt 7: The Map Feature
Build the core Map feature using React Map GL and Redux Toolkit.

Create the following files:
1. `src/features/map/mapSlice.ts`: Redux slice holding `viewport` (lat, lng, zoom), `activeReports` (array of typed Report objects), and `selectedReport` (null or Report object). Export the slice reducer and actions.
2. `src/features/map/services/mapApi.ts`: Axios service to fetch active flood reports from the backend (`/api/reports`). Ensure the API response is typed.
3. `src/features/map/components/LiveMap.tsx`: A full-screen React Map GL component (`h-screen w-screen`). Read viewport from Redux, fetch active reports, and render custom SVG MapMarkers based on `waterDepthCm`. 

### Prompt 8: The Report & AI Feature
Build the feature allowing users to submit crowd-sourced flood photos.

Create the following files:
1. `src/features/reports/services/reportApi.ts`: API function to POST `multipart/form-data` to the backend. Include TypeScript definitions for the expected API response (e.g., returning the AI depth estimation).
2. `src/features/reports/components/ImageDropzone.tsx`: A drag-and-drop zone for uploading a photo with file validation (max 5MB, jpeg/png). Ensure event handlers (drag, drop, change) are properly typed.
3. `src/features/reports/pages/SubmitReportPage.tsx`: A page combining `useGeolocation` and `ImageDropzone`. On submit, show a success message displaying the AI's estimated water depth. Ensure the UI aligns with a mobile-first, one-handed UX.