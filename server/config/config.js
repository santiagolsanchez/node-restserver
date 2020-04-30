// ============================
// Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
// Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
// Basde de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
// Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
// SEED de autenticacion
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
// Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '453990552126-nf956dpv74kjqhume78p2pduvia99a77.apps.googleusercontent.com';