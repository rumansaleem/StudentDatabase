import { openDatabase } from 'react-native-sqlite-storage';

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    college VARCHAR(255),
    subject VARCHAR(255),
    latitude VARCHAR(255),
    longitude VARCHAR(255)
  )`,
];

const database = openDatabase({ name: 'StudentDatabase.db' });

database.transaction(
  txn => SCHEMA.forEach(query => txn.executeSql(query)),
  error => console.error(error),
  success => console.log(success)
);

export default database;