import { Persona } from "../clases/persona.js";
import { setDb, gestion, ValidateEmail } from "./db.js";
import { reactive } from "vue";

import {app, database, auth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from "./firebase.js"
//console.log(database)
export const persona = reactive({
    dato: new Persona(),
    titulo: "Tabla Persona ",
    filter: "",
    notificacion: {
        type: false,
        icon: "",
        msg: ""
    },
    listaRoles:[],
    rows: [],

    getRol:(arrRol)=>{
        for (var i = arrRol.length - 1; i >= 0; i--) {
            //console.log(i)
        }
    },
    getRows: () => {
        
        gestion(Persona.url(), { params: { opcion: 1 } }).then(response => {
            //console.log(response)
            persona.rows = response.map(p=>{
                p.arrRoles = p.roles.rol.split("").map(n=>{ return n*1});
                return p
            })
            //console.log(persona.rows)
        }).catch(e => {
            persona.notificacion.type = true;
            persona.notificacion.icon = "error";
            persona.notificacion.msg = e;
        })
    },

    accion: { value: -1, label: "NEUTRO" },
    openModal: (row) => {
        persona.filter = "";
        if (row == 0) {
            persona.accion = { value: 0, label: "Agregar" };
            persona.dato = new Persona();
            persona.dato.id = persona.rows.length + 1;
        } else {
            persona.accion = { value: 1, label: "Editar" };
            //persona.dato = JSON.parse(JSON.stringify(persona.rows.find(d => d.id == id)));
            persona.dato = new Persona(row);
        }
    },

    closeModal: () => {
        persona.accion = { value: -1, label: "NEUTRO" };
        persona.dato = new Persona();
    },
    modalMotos:false,
    listaMotos:[],
    openModalMotos:async(row)=>{
        //console.log(row);
       
        persona.dato = new Persona(row);
        await gestion(Persona.url(),{params:{opcion:4,id:row.id}})
        .then(res=>{
            //console.log(res);
            persona.listaMotos = res;
            persona.modalMotos = true;
        })
        .catch(e => {
            persona.notificacion.type = true;
            persona.notificacion.icon = "error";
            persona.notificacion.msg = e;
        })
    },

    closeModalMotos:()=>{
        persona.modalMotos = false;
    },
    disabledCorreo:()=>{

    },    
    createCorreo:()=>{
           persona.dato.correo = persona.dato.nombre.toLowerCase().replace(/\s+/g,'') + persona.dato.name.toLowerCase() + "@gmail.com";     
    },
    crud:async()=>{
        //let correo = persona.dato.correo == "" ? persona.dato.nombre.toLowerCase().replace(/\s+/g,'') + persona.dato.name + "@gmail.com" : persona.dato.correo;
        let pwd = persona.dato.name;
        let correo  = "";    
        //alert(correo)
            if(ValidateEmail(persona.dato.correo)){
                gestion(Persona.url(),{
                	params:{
                		opcion:8,
                		name:persona.dato.name,
                		correo:persona.dato.correo
                	}})
                .then(res=>{
                	console.log(res.count)       
                	if(res.count == 0){
                		persona.filter = persona.dato.name;
            			persona.notificacion.icon = "close";

            			persona.getRol(persona.dato.arrRoles)

                		if (persona.accion.value == 0) {
                			createUserWithEmailAndPassword(auth,persona.dato.correo,persona.dato.name)
                			.then((userCredential) => {
                 				const uid = userCredential.user.uid;
                 				console.log(uid);
                 				gestion(Persona.url(), {
                    				params: {
                        				opcion: 2,
                        				id: persona.dato.id,
                        				name: persona.dato.name,
                        				nombre: persona.dato.nombre,
                        				telefono: persona.dato.telefono == "" ? "0000000000" : persona.dato.telefono,
                        				telefono2: persona.dato.telefono2  == "" ? "0000000000" : persona.dato.telefono2,
                        				direccion: persona.dato.direccion == "" ? "NO REGISTRA" : persona.dato.direccion,
                        				//correo: persona.dato.correo == "" ? "NO REGISTRA" : persona.dato.correo,
                        				correo: persona.dato.correo,
                        				rol:persona.dato.rol,
                        				uid:uid,
                        				pwd:persona.dato.name
                    				}})
                 					.then(res=>{
                    					persona.init();
                    					persona.notificacion.msg = "Se agrego Exitosamente";
                    					persona.notificacion.type = true;
                    				})
                    				.catch(e=>{

                    				})

							})
             				.catch(err=>{
             					persona.notificacion.type = true;
            					persona.notificacion.icon = "error";
            					persona.notificacion.msg = err.message;			
             				})
          	
                		}					
                	}else{
                		persona.notificacion.type = true;
            			persona.notificacion.icon = "error";
            			persona.notificacion.msg = "Nit y correo debe ser unico";	
                	}
            	})
            	.catch(e=>{
                	console.error(e);
                	persona.notificacion.type = true;
                    persona.notificacion.icon = "error";
                    persona.notificacion.msg = e;
            	})        
            }else{
            	persona.notificacion.type = true;
            	persona.notificacion.icon = "error";
            	persona.notificacion.msg = "Ingrese un correo valido";	
            }
        
            
            

        /*createUserWithEmailAndPassword(auth, correo, pwd)
                .then((userCredential) => {
                // Signed in 
                 const user = userCredential.user;
                 console.log(user.uid)
             })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message)
              });*/
    },

    crud2: async () => {

            persona.filter = persona.dato.name;
            persona.notificacion.icon = "close";

            persona.getRol(persona.dato.arrRoles)

           if (persona.accion.value == 0) {
                    await gestion(Persona.url(), {
                    params: {
                        opcion: 2,
                        id: persona.dato.id,
                        name: persona.dato.name,
                        nombre: persona.dato.nombre,
                        telefono: persona.dato.telefono == "" ? "0000000000" : persona.dato.telefono,
                        telefono2: persona.dato.telefono2  == "" ? "0000000000" : persona.dato.telefono2,
                        direccion: persona.dato.direccion == "" ? "NO REGISTRA" : persona.dato.direccion,
                        correo: persona.dato.correo == "" ? "NO REGISTRA" : persona.dato.correo,
                        //correo: persona.dato.correo == "" ? persona.dato.nombre.toLowerCase() + "" : persona.dato.correo,
                        rol:persona.dato.rol
                    }
                }).then(response => {

                    //console.log()

                    persona.init();
                    persona.notificacion.msg = "Se agrego Exitosamente";
                    persona.notificacion.type = true;
                }).catch(e => {
                    persona.notificacion.type = true;
                    persona.notificacion.icon = "error";
                    persona.notificacion.msg = e;
                })

            } else {

                await gestion(Persona.url(), {
                    params: {
                        opcion: 3,
                        id: persona.dato.id,
                        name: persona.dato.name,
                        nombre: persona.dato.nombre,
                        telefono: persona.dato.telefono == "" ? "0000000000" : persona.dato.telefono,
                        telefono2: persona.dato.telefono2  == "" ? "0000000000" : persona.dato.telefono2,
                        direccion: persona.dato.direccion == "" ? "NO REGISTRA" : persona.dato.direccion,
                        correo: persona.dato.correo == "" ? "NO REGISTRA" : persona.dato.correo,
                         rol:persona.dato.rol
                    }
                }).then(response => {
                    persona.init();
                    persona.notificacion.msg = "Edicion Exitosa";
                    persona.notificacion.type = true;
                }).catch(e => {
                    persona.notificacion.type = true;
                    persona.notificacion.icon = "error";
                    persona.notificacion.msg = e;
                })
            }

    },

    disabled: () => {
        persona.dato.name = persona.dato.name.replace(/\s+/g, '').toUpperCase();
        persona.dato.nombre = persona.dato.nombre.replace(/\s+/g, ' ').toUpperCase();
        //persona.dato.correo = persona.dato.correo == "" ? "NO REGISTRA" : persona.dato.correo;
        //persona.dato.correo = persona.dato.nombre.toLowerCase().replace(/\s+/g,'') + persona.dato.name + "@gmail.com";
        return persona.dato.name.length < 6 || persona.dato.nombre.length == 0
    },

    init: async () => {
        persona.getRows();
        persona.accion = { value: -1, label: "NEUTRO" };
        persona.dato = new Persona();
        persona.modalMotos = false;

        gestion(Persona.url(),{ params:{ opcion:7 } }).then(roles=>{
            //console.log(roles);
            persona.listaRoles = roles;
        })
        .catch(e => {
            persona.notificacion.type = true;
            persona.notificacion.icon = "error";
            persona.notificacion.msg = e;
        })
    },


    columns: Persona.columns()
})