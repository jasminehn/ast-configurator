# Configuration

There are two files within the `app/` directory that configure the generation of pages within the app: `screens.config.ts` and `groups.config.ts`. Each of these files exports their own `config` object.

## groups.config.ts

`groups.config.ts` manages the groups of sections. A group is an object with a `string` `name` and an array of objects representing the `sections`. Each section has a `string` `name` and a `Section` `data` that is imported from a file. Group names and section names should be globally unique.

### Groups interface

The interface for the config file as defined in `groups.config.ts`:

```typescript
interface IGroupConfig {
  /** The list of all groups */
  groups: Array<{
    /** The name of the group */
    name: string;
    /** The sections within the group */
    sections: Array<{
      /** name of the section */
      name: string;
      /** Section data imported from JSON */
      data: Section;
    }>;
  }>;
```

### New groups

New groups can be added to the `groups` array by appending a new object with a unique `name` and properly created and imported `sections`, but they won't actually display until they are registered within `screens.config.ts`

## screens.config.ts

`screens.config.ts` manages the screens within the app. For our purposes, a "screen" is either a page that takes in `IPage` as props or a group, which has individual views managed within `GroupBuilder`. The configurator is divided in this way so screens can be inserted between groups of sections.

### Screens interface

The interface for the config file as defined in `screens.config.ts`:

```typescript
 interface IScreenConfig {
   screens: Array<Screen | CustomScreen>;
 }
 
 interface Screen {
   name: string;
   type: string
 }
 
 interface CustomScreen extends Screen {
   component: ComponentType<IPage>
 }
```

The `name` of a screen should be unique and is used to match groups defined in `groups.config.ts` to screens.

### Registering new groups

Once new groups are defined within `groups.config.ts`, they can be registered within `screens.config.ts`. To do this, add a new object to the `screens` array containing the `name` of the group and the `type` as `screen`.

### Custom screens

New screens can be added onto the application by adding a new object to the `screens` array containing the `name` of the screen, the `type` as `screen`, and the `component` as a dyanmic import structured as `dynamic(() => import(path))`. Each screen takes in a router defined by `IPage`:

```typescript
export interface IPage {
  /** The router for the application */
  router: {
    /** Pushes a page onto the routing stack. Please don't push backwards. */
    push: (page: number | ((old: number) => number)) => void
    /** Pops a page off the routing stack */
    back: () => void
    /** Checks to see if a page is on the routing stack */
    onPath: (page: number) => boolean
    /** A boolean indicating if the last navigation action was a back button press */
    movedBack: boolean;
  }
}
```

The screen returns back a React Fragment, containing a `Head` component from `next/Head` and a body with content. It can use the `router` object to navigate to other screens and to inspect the stack. A simple example of a custom screen is located at `app/screens/home.tsx`.
