# Store
Store holds the whole state tree of your application.

## Usage

```ts
// sample application state
interface AppState {
    hero: HeroState;
}

interface HeroState {
    items: string[];
}
```

```ts
//inject store
constructor(
    private store: Store<AppState>
) {
}

// initialize state
const initialState = {
    hero: { items: [] }
};
this.store.initialize(initialState);

// set
this.store.set("hero", {
    items: ["rengar", "kha'zix"]
});

// read once from the state
this.heroState = this.store.get("hero");

// subscribe for a particular state and receive last value set.
this.subscription$$ = this.store.subscribe("hero", x => this.heroState = x);
```