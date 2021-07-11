# electron-persist-secure
### Optimized persistant storage for electron with use of a secure contextBridge.

### - **Works with redux-persist out of the box!**

### -  **Made for our [electron-typescript-react-tailwind-redux](https://github.com/saucesteals/electron-typescript-react-tailwind-redux) boilerplate**

---
## **Guide**

1. **Create the store in your main process:**
```ts

const createStores = (): void => {;

  new Store({
    configName: string = "config" // The stores name. Default: "config"
  });

}

const createWindow = (): void => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: "your.preload.file",
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL("index.html");

};

app.on("ready", createWindow);

createStores() // Make sure this is called only ONCE
```


1. **Create bindings in your preload:**
```ts
import { createStoreBindings } from 'electron-persist-secure/lib/bindings';


contextBridge.exposeInMainWorld('store', {
  ...createStoreBindings(storeName: string = 'config'),
});

```


3. **Use it in your renderer!**
```ts
window.store.get('key')
window.store.set('key', 'value')
window.store.delete('key')
window.store.has('key')
...
```

## - **Usage**

### **Detailed docs: [conf](https://www.npmjs.com/package/conf)**

- The name of getters in the renderer bindings are replaced with `get[Origname]()` \
  ex. `bindings.getPath()` instead of `store.path`

- Methods `onDidChange` & `onDidAnyChange` are omitted from renderer bindings as the usage of them is not possible with electron's two-threaded design. You can still use these on the store created in the main thread.

---
## Usage with redux-persist

```ts
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: {
      // window.store if you have the same exposed name as the guide above
      setItem: window.store.set,
      getItem:  window.store.get,
      removeItem: window.store.delete,
  } 
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

```