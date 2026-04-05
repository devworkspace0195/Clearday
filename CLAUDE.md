# Clearday — Claude Code Briefing

## Project
React Native app (TypeScript) — personal task, note & activity tracker.
Latest React Native version. MVVM architecture per feature.

## Architecture — MVVM (strict)
Each screen and component has its own folder containing exactly 5 files.
All filenames are `<FolderName><Suffix>` — every file is PascalCase.

```
ExampleFolder/
  ExampleFolder.stories.tsx   # storybook story
  ExampleFolderView.tsx       # view — renders only, zero logic
  ExampleFolderViewModel.ts   # viewmodel — all business logic, state, API calls (exports a use* hook)
  ExampleFolderStyles.ts      # styles — StyleSheet.create() only
  ExampleFolderModel.ts       # model — TypeScript types and interfaces
```

Examples of correct filenames:
- `LoginScreen/` → `LoginScreenView.tsx`, `LoginScreenViewModel.ts`, `LoginScreenStyles.ts`, `LoginScreenModel.ts`, `LoginScreen.stories.tsx`
- `Button/` → `ButtonView.tsx`, `ButtonViewModel.ts`, `ButtonStyles.ts`, `ButtonModel.ts`, `Button.stories.tsx`

Same pattern applies to every screen in `src/screens/` and every component in `src/components/`.

## Folder structure
src/
  screens/        # one folder per screen (LoginScreen, HomeScreen, etc.)
  components/     # one folder per reusable component (Button, Input, Card, etc.)
  store/          # Redux Toolkit slices + store config
  context/        # ThemeContext (dark/light)
  navigation/     # React Navigation stack + tab config
  hooks/          # shared custom hooks (e.g. useRestoreSession)
  utils/          # helpers, formatters, constants
  constants/      # colors, spacing, typography, strings, API keys (no hardcoding elsewhere)
  types/          # global TypeScript types

## TypeScript
- Strict mode ON (`strict: true` in tsconfig)
- No `any` — ever
- All props typed with interfaces
- All API responses typed

## State management
- Redux Toolkit — global state (auth, tasks, notes)
- Context API — theme only
- No prop drilling beyond 2 levels

## Styling
- All styles in `styles/` folder using `StyleSheet.create()`
- No inline styles
- Responsive layout using Dimensions or react-native-responsive-screen
- Dark and light theme support via ThemeContext

## Reusable components
Every UI element must be a reusable component in `src/components/`.
Never rewrite a button, input, card, loader, skeleton inline.
Components must accept and use theme props.

## Performance rules
- `React.memo` on every list item component
- `useCallback` for all functions passed as props
- `useMemo` for derived/computed values
- FlatList: always set `keyExtractor`, `getItemLayout` where possible, `removeClippedSubviews`
- Lazy load screens using React.lazy or dynamic imports
- No anonymous functions in JSX

## API & data loading
- Every screen that loads from API must show a Skeleton loader while loading
- Every API call must have error handling with a user-facing error state
- Use a custom `useApi` hook for all API calls (loading / data / error states)

## Security
- No hardcoded API keys — use `.env` with `react-native-config`
- Sensitive data (tokens, user info) stored in `react-native-keychain`, not AsyncStorage
- Input sanitization on all form fields
- Certificate pinning for production API calls

## Testing — Jest
- Every reusable component has a snapshot test
- Every viewmodel hook has a unit test
- Every util function has a unit test
- Test files live next to the file: `ButtonView.test.tsx` beside `ButtonView.tsx`

## Storybook
- Every component in `src/components/<ComponentName>/` has a `ComponentName.stories.tsx` file
- Every screen in `src/screens/<ScreenName>/` has a `ScreenName.stories.tsx` file

## Code quality
- ESLint + Prettier enforced
- No unused imports
- No console.log in production code (use a logger util)
- Meaningful variable names — no `x`, `temp`, `data2`
- Functions do one thing

## Naming conventions
- All screen/component files: `<FolderName><Suffix>.tsx/ts` — always PascalCase
- Suffixes: `View`, `ViewModel`, `Styles`, `Model`, `.stories`
- ViewModel hook exports: camelCase starting with `use` (e.g. `useLoginScreenViewModel`)
- Utility/hook files outside screens and components: camelCase (e.g. `useRestoreSession.ts`)
- Constants: UPPER_SNAKE_CASE

## Strings
- All user-facing strings live in `src/constants/strings.ts` and are exported via `src/constants/index.ts`
- Import as `import { STRINGS } from '../../constants'`
- Organised by screen/component: `STRINGS.LOGIN`, `STRINGS.SIGNUP`, `STRINGS.HOME`, `STRINGS.PROFILE`, `STRINGS.TASK`, `STRINGS.INPUT`, `STRINGS.APP`
- Static strings are UPPER_SNAKE_CASE keys; dynamic strings (requiring arguments) are camelCase functions on the same object
- Never hardcode a user-facing string directly in a view file — always reference `STRINGS`

## DO NOT
- No class components
- No inline styles
- No `any` type
- No hardcoded strings/colors/sizes outside constants
- No hardcoded user-facing strings in view files — use `STRINGS` from `src/constants/strings.ts`
- No logic inside view files
- No direct API calls inside view files

## Dependency management
- After adding any new JS dependency, always run `yarn install` automatically
- After adding any new native dependency (anything that touches iOS/Android), 
  always run `cd ios && pod install && cd ..` automatically
- Never just add to package.json and leave it — always install immediately
- If unsure whether a package needs pod install, run it anyway to be safe