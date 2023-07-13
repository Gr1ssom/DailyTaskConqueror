import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const editorDb = await openDB('jate', 1);
  const transaction = editorDb.transaction('jate', 'readwrite');
  const openStore = transaction.objectStore('jate');
  const request = openStore.put({ id: 1, value: content });
  const result = await request;
  console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const editorDb = await openDB('jate', 1);
  const transaction = editorDb.transaction('jate', 'readonly');
  const openStore = transaction.objectStore('jate');
  const request = openStore.get(1);
  const result = await request;
  result
    ? console.log('data found, result.value')
    : console.log('data not found');

  return result?.value;
};

initdb();
