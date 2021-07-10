# electron-persist-secure
Optimized persistant storage for electron with use of a secure contextBridge.

## **Works with redux-persist out of the box!**


# **Guide**

1. **Create the store in your main process:**
```ts

new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: 'your-preload.file'
    })

new Store({
    cwd: app.getPath('userData')
    projectName: string = 'config' // This is your stores name
});



```
*For a more detailed guide on the options above, visit the [conf](https://www.npmjs.com/package/conf) package*


2. **Create bindings in your preload:**
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
window.store.has('key', 'value')
...
```

# Usage with redux-persist

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