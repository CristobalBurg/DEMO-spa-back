import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express'
import * as cors from 'cors'


const firebase = require("firebase");
const serviceAccount = require('./config.json')

// Inicializar Cloud Firestore
firebase.initializeApp({
    apiKey: "AIzaSyAPcmwRQcwhHrTM6NYIEMs_PVBpDIKOBAQ",
    authDomain: "prueba-implementos.firebaseapp.com",
    projectId: "prueba-implementos",
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://prueba-implementos.firebaseio.com"
  });
  
const db = firebase.firestore();
 
 //Servidor Express
 const app = express();
 app.use(cors({origin:true}))

 //petición get All
 app.get('/productos', async (req,res) =>{

    const prodRef = db.collection('productos');
    const prodSnap = await prodRef.get();
    const listaProductos = prodSnap.docs.map( (doc:any) => doc.data())

    res.json(listaProductos)
 });
 
 //Petición get One   
 app.get('/producto', async (req,res) =>{
    let codigo = req.query.codigo;
   const prodRef = db.collection('productos').where("CODIGO", "==", `${codigo}`)
    const prodSnap = await prodRef.get();
    const listaProductos = prodSnap.docs.map( (doc:any) => doc.data())

    res.json(listaProductos)

 });
 //Petición get By Categoría
 app.get('/categoria', async (req,res) =>{
   let categoria = req.query.categoria;
    const prodRef = db.collection('productos').where("CATEGORIA","==",`${categoria}`)
    const prodSnap = await prodRef.get();
    const listaProductos = prodSnap.docs.map( (doc:any) => doc.data())

    res.json(listaProductos)
 });


 export const api = functions.https.onRequest( app );


 //Inserción de Elementos a la base de datos----//
 

/* const dbImplementos = require('./db_implementos.json')
     var db = firebase.firestore();

dbImplementos.forEach(function(obj:any) {
    db.collection("productos").add({
    CODIGO: obj.CODIGO,
    NOMBRE: obj.NOMBRE,
    UNITID:obj.UNITID,
    PRECIO_VENTA:obj.PRECIO_VENTA,
    COSTO_FINANCIERO:obj.COSTO_FINANCIERO,
    IDLINEA:obj.IDLINEA,
    IDCATEGORIA:obj.IDCATEGORIA,
    CodIDProveedor:obj.CodIDProveedor,
    ESTADO:obj.ESTADO,
    TIPOFABRICANTE:obj.TIPOFABRICANTE,
    NUMERO_PARTE:obj.NUMERO_PARTE,
    LINEA:obj.LINEA,
    CATEGORIA:obj.CATEGORIA,
    UEN:obj.UEN,
    MARCA:obj.MARCA,
    PRECIO_MINIMO:obj.PRECIO_MINIMO,
    DESCRIPCION:obj.DESCRIPCION,
    IMAGEN_150:obj.IMAGEN_150,
    IMAGEN_450:obj.IMAGEN_450
    }).then(function(docRef:any) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error:any) {
        console.error("Error adding document: ", error);
    });
}); */

