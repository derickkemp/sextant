let store;

function setStore(newStore) {
  store = newStore;
}

async function getStore() {
  return store;
}

export { getStore as get, setStore as set };
