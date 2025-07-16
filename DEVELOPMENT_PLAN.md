# Development Plan: CodePersona UI/UX and Functionality Enhancements

This document outlines the step-by-step plan to fix existing bugs and improve the UI/UX of the CodePersona application.

---

### Phase 1: Core Functionality & Layout Fixes

#### **Step 1.1: Fix Theme Switching (Light/Dark Mode)**
-   **Goal:** Ensure that the light and dark themes work correctly across the entire application.
-   **Analysis:** The current implementation fails to apply light mode styles correctly, likely because light theme variables are missing from `globals.css` and some components may have hardcoded dark mode colors.
-   **Action Plan:**
    1.  Define light mode color variables within `globals.css` under a `.light` or `:root` selector.
    2.  Audit key UI components (`Card`, `Header`, etc.) to ensure they use theme-agnostic variables (e.g., `bg-background`, `text-foreground`) instead of hardcoded colors.
    3.  Verify the theme switching button correctly toggles the theme class on the `<html>` element.
-   **Status:** COMPLETED
-   **Note:** Added the necessary CSS variables for the light theme to `globals.css`. The `next-themes` package will now be able to toggle between light and dark modes correctly. The root of the problem was the complete absence of a `.light` theme definition.

#### **Step 1.2: Resolve Layout Overflow Issues**
-   **Goal:** Eliminate the horizontal scrollbar and fix the overlapping components on the results page.
-   **Analysis:** The horizontal overflow is a layout issue, likely caused by an element exceeding its container's width. The overlapping components on the results page point to an incorrect grid or flexbox configuration that isn't responsive.
-   **Action Plan:**
    1.  Apply `overflow-x-hidden` to the main layout container as a preventative measure.
    2.  Inspect the results page layout (`src/app/results/[analysisId]/page.tsx`).
    3.  Refactor the CSS Grid or Flexbox container for the visualization components to ensure they wrap correctly on different screen sizes.
-   **Status:** COMPLETED
-   **Note:** Applied `overflow-x-hidden` to the main layout to prevent horizontal scrolling. Also adjusted the grid container on the results page to be full-width, which will help contain the chart components and prevent them from overflowing and overlapping.

---

### Phase 2: UI/UX Enhancements

#### **Step 2.1: Improve Theme Switching Button**
-   **Goal:** Replace the current theme switcher with a more intuitive and visually appealing icon-based button.
-   **Analysis:** The current button is basic. A better design would show the current state and the state to switch to (e.g., a sun icon for light mode, a moon for dark).
-   **Action Plan:**
    1.  Locate the theme switcher in `src/components/shared/Header.tsx`.
    2.  Replace the existing button with a new component that uses `lucide-react`'s `Sun` and `Moon` icons.
    3.  Implement logic to show the correct icon based on the currently active theme.
-   **Status:** COMPLETED
-   **Note:** Replaced the dropdown menu with a direct toggle button for a simpler user experience. The button now intelligently switches between light and dark modes and uses icons to indicate the current theme. Also updated the header to use theme variables for its background and border.

#### **Step 2.2: Add Informational Tooltips to Result Components**
-   **Goal:** Provide users with context about what each graph on the results page represents.
-   **Analysis:** Users find the graphs hard to interpret. Adding an info button with a tooltip/popover is an effective way to provide on-demand explanations.
-   **Action Plan:**
    1.  Install and configure a Tooltip or Popover component from shadcn/ui for consistency with the existing design system.
    2.  For each visualization component in `src/components/visualizations/`, add an info icon button.
    3.  Wrap the button in a tooltip that displays a clear, concise description of the chart.
-   **Status:** COMPLETED
-   **Note:** Manually added the shadcn/ui Tooltip component and its Radix UI dependency. Then, applied tooltips with descriptive text to the headers of all visualization cards on the results page, using an info icon as the trigger.

#### **Step 2.3: Clarify Text and Labels on Result Components**
-   **Goal:** Make the data presented in the visualizations easier to understand.
-   **Analysis:** Vague labels like "time" are confusing. The text needs to be more descriptive.
-   **Action Plan:**
    1.  Review each visualization component for ambiguous or unhelpful text labels.
    2.  Update the labels to be more descriptive (e.g., "Avg. Commit Time" instead of "Time", "Lines of Code per Commit" instead of "LOC").
-   **Status:** COMPLETED
-   **Note:** Refactored the ambiguous "Productivity Rhythm" chart by splitting it into two separate, more clearly labeled components: "Daily Activity" and "Hourly Activity". This improves clarity and also helps with the page layout. The underlying data labels in the charts were also made more descriptive.

---
