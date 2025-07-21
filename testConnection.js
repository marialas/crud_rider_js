import { pool } from './config/db.js';

pool.query('SELECT NOW() AS now')
  .then(([rows]) => console.log('Conexión OK:', rows))
  .catch(err => console.error('Fallo conexión:', err));
