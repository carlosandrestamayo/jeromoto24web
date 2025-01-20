import { Moto } from "../clases/moto.js";
import { Tipo } from "src/clases/tipo.js";
import { Persona } from "src/clases/persona.js";
import { Orden } from "src/clases/orden.js";
import { ServicioTaller } from "src/clases/servicioTaller.js";
import { gestion, historialServicios } from "./db.js";
import { reactive } from 'vue';
import moment from 'moment';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

import { imprimirGestionMantenimientos, imprimirGestionMantenimientosAll } from "./imprimir.js"	
    
export const moto = reactive({
    dato: new Moto(),
    titulo: "Tabla Motocicleta",
    filter: "",
    notificacion: {  
        type: false,  
        icon: "",
        msg: ""
    },
    selectMoto: [],
    listaTipos: [],
    listaPersonas: [],
    listaMotos: [],
    objMoto: {}, 
    rows: [],
    listaServiciosTaller:[],

    s1:"",s2:"",s3:"",s4:"",s5:"",
   r1:"",r2:"",r3:"",r4:"",r5:"",
    
    getRows: async () => {
        
        await gestion(Moto.url(), { params: { opcion: 6 } }).then(datos => {
            moto.rows = datos;
        }).catch(e=>{
            moto.notificacion.type = true;
            moto.notificacion.icon = "error";
            moto.notificacion.msg = e;
        })
    },

    //Referencia
    selectTipo: new Tipo(),
    optionsTipo: [],
    selectedTipo: (val) => {
        moto.dato.tipoId = val.id;
    },

    //Persona
    persona: new Persona(),
    optionsPersona: [],
    columnsPersona: Moto.columnsPersona(),
    selectPersona: [],
    filterPersona: "",
    selectedPersona: (newVal) => {
        if (newVal.length == 0) {
            moto.selectPersona = []
        } else {
            //console.log("else")
        }
    },
    modalPersona: false,
    disabledPersona: () => {
        if (moto.selectPersona.length == 0) {
            return true;
        }
        return moto.selectPersona[0].id == 0
    },

    editPersona: () => {
        //console.log("edit persona");
        moto.persona = moto.selectPersona[0];
        moto.dato.personaId = moto.selectPersona[0].id;
        moto.modalPersona = false;
        moto.filterPersona = ""
    },

    openModalPersona: () => {

        if (moto.dato.personaId == 0) {
            moto.selectPersona = [];
        } else {
            moto.selectPersona = [moto.persona]
        }
        moto.modalPersona = true;
        moto.filterPersona = ""
    },
    closeModalPersona: () => {
        moto.modalPersona = false;
        moto.filterPersona = ""
    },

    accion: { value: -1, label: "NEUTRO" },
    openModal: (row) => {
        moto.filter = "";
        if (row == 0) {

            moto.accion = { value: 0, label: "Agregar" };
            moto.dato = new Moto();
            moto.selectTipo = new Tipo();
            moto.persona = new Persona();
            moto.dato.id = moto.rows.length + 1;

        } else {

            moto.accion = { value: 1, label: "Editar" };
            moto.dato = new Moto(row);
            moto.selectTipo = row.tipo;
            moto.persona = row.persona;

        }
    },

    closeModal: () => {
        moto.accion = { value: -1, label: "NEUTRO" };
        moto.dato = new Moto();
        moto.modalPersona = false;
    },

    modalViewPersona:false,
    openModalViewPersona:(id)=>{ 
        moto.dato = JSON.parse(JSON.stringify(new Moto(moto.rows.find(d => d.id == id))));
        moto.persona = moto.listaPersonas.find(p => p.id == moto.dato.personaId);
        moto.modalViewPersona = true;
    },

    selectedOrden:(newVal)=>{
        
    },
    closeModalViewPersona:()=>{
        //console.log(val)
        moto.modalViewPersona = false;
    },

    modalViewTabla:false,
    listaTabla:[],

    getMaxFechaSalida:async(lista,kmpromedio)=>{
        return new Promise(async(resolve,reject)=>{
            
            resolve(lista.map(r=>{
                return (r.ordenes.length == 0) ? undefined : r
            })
            .filter(a=> a != undefined)
            .map(l=>{
                return {
                    id:l.id,
                    name:l.name,
                    medible:l.medible,
                    tablaKm:l.tablaKm,
                    kmpromedio:kmpromedio,
                    orden:l.ordenes.reduce((a,b)=> { return new Date(a.fechasalida) > new Date(b.fechasalida) ? a : b; })
                }
            })
            .map(c=>{
                c.fechaestimada = moment( moment(new Date(c.orden.fechasalida)).add(parseInt(c.tablaKm/kmpromedio),'days')).format("YYYY-MM-DD");
                return c
            }))
        })
    },

    openModalViewContador:async(row)=>{
            //console.log(row)
            moto.objMoto  = row;   
        await gestion(Orden.url(),{params:{opcion:10,motoId:row.id,tipoId:row.tipoId}})
            .then(res=>{
               //console .log(res);
                moto.getMaxFechaSalida(res,row.kmpromedio).then(response=>{
                    //console.log(response);
                    moto.listaTabla = response;
                    moto.modalViewTabla =true;
                    moto.dato = new Moto(row);
                });
            })
            .catch(e=>{
                 moto.notificacion.type = true;
                moto.notificacion.icon = "error";
                moto.notificacion.msg = e;
            })
    },
    
    closeModalViewTabla:()=>{
        moto.modalViewTabla = false;
    },
	imprimirTabla:()=>{
    	imprimirGestionMantenimientos(moto);	
        /*historialServicios(moto.dato).then(res=>{
               imprimirGestionMantenimientosAll(moto,res) 
               console.log(res)
        })*/
         

    },
    imprimirTablas:()=>{
        console.log(moto.rows);
        let obj = moto.rows.find(mt=> mt.id == moto.dato.id)
        const doc = new jsPDF();
        const listaTabla = moto.listaTabla;
        let arrHeaders = [];
        let arrBodys = [];
        let contador = new Array(listaTabla.length).fill(0).map((i,j)=> j);
        console.log(obj)
        
        autoTable(doc,{
            head:[["Jeromotos 24 Almacen y Taller","Cra 19 # 3-42","321563869"]],
            body:[]
        }) 
        autoTable(doc,{
            head:[["Motocicleta","Referencia","Marca","Tipo Aceite","Km Promedio","Propietario"]],
            body:[[obj.name,obj.tipo.name,obj.marca.name,obj.tipoaceite,obj.kmpromedio,obj.persona.nombre]]
        })
        
        let filas = 4;
        for(let i = 0; i < listaTabla.length; i++){
            let dato = listaTabla[i];
            arrHeaders.push([dato.name + " Realizar Cada " + dato.tablaKm + " km "]);
            arrBodys.push(
                ["Proximo Servicio a los " + parseInt(dato.orden.km*1+dato.tablaKm*1) + " kms"],
                ["Ultimo Servicio a los " + dato.orden.km + " kms el " + dato.orden.fechasalida + " en la orden de servicio # " + dato.orden.name ],
                ["Realizar cada " + dato.tablaKm + " kms"])

            if(dato.tablaKm == 0 || dato.kmpromedio == 0){
                arrBodys.push(["No se puede calcular Tabla de  mantenimiento 0 kms o Km Promedio igual a 0 km/dia"])
            }else{
                arrBodys.push(["Proximo Servicio estimado a la fecha " + dato.fechaestimada])
            }
        }

        for(let i = 0; i < listaTabla.length; i++){
            if(i == contador[i]){
                autoTable(doc,{
                    head:[arrHeaders[i]],
                    body:[arrBodys[i*filas],arrBodys[i*filas+1],arrBodys[i*filas+2]]
                })
            }
        }

        doc.save("jeromotos24_motocicleta " + moto.dato.name + "  " + moment(new Date()).format("YYYY-MM-DD") + "pdf");
    },

    modalViewOrdenes:false,
    listaOrdenes:[],
    rowsOrdenes:[],
    datoMoto:{},
    exOrden:false,
    openModalViewOrdenes:async(row)=>{
        //console.log(row)
        moto.dato = row;
        moto.objMoto  = row;   


        await gestion(Orden.url(), { params: {  opcion: 20, motoId:row.id } }).then(datos => {
            //console.log(datos);
            
            moto.listaOrdenes = datos;
            
            //console.log(historialServicios(row))
            historialServicios(row).then(res=>{
                console.log(res)
            })
            moto.modalViewOrdenes = true;
        }).catch(e=>{
            moto.notificacion.type = true;
            moto.notificacion.icon = "error";
            moto.notificacion.msg = e;
        })

    },

    imprimirOrdenesMoto:()=>{
        console.log(moto.listaOrdenes)
    },

    imprimirOrden:()=>{
        console.log("imp")
    },

    closeModalViewOrdenes:()=>{
        moto.modalViewOrdenes = false;
    },
    
    crud: async () => {

       
            moto.filter = moto.dato.name;

            moto.notificacion.icon = "close";
            if (moto.accion.value == 0) {

                await gestion(Moto.url(), {
                    params: {
                        opcion: 2,
                        id: moto.dato.id,
                        name: moto.dato.name,
                        color: moto.dato.color == "" ? "NO REGISTRA" : moto.dato.color,
                        tipoaceite: moto.dato.tipoaceite == "" ? "NO REGISTRA" : moto.dato.tipoaceite,
                        tipoId: moto.dato.tipoId,
                        personaId: moto.dato.personaId
                    }
                }).then(res => {
                    moto.init();
                    moto.notificacion.msg = "Se agrego Exitosamente";
                    moto.notificacion.type = true;
                }).catch(e=>{
                    moto.notificacion.type = true;
                    moto.notificacion.icon = "error";
                    moto.notificacion.msg = e;
                })


            } else {

                await gestion(Moto.url(), {
                    params: {
                        opcion: 3,
                        id: moto.dato.id,
                        name: moto.dato.name,
                        color: moto.dato.color == "" ? "NO REGISTRA" : moto.dato.color,
                        tipoaceite: moto.dato.tipoaceite == "" ? "NO REGISTRA" : moto.dato.tipoaceite,
                        tipoId: moto.dato.tipoId,
                        personaId: moto.dato.personaId
                    }
                }).then(res => {
                    moto.init();
                    moto.notificacion.msg = "Edicion Exitosa";
                    moto.notificacion.type = true;
                }).catch(e=>{
                    moto.notificacion.type = true;
                    moto.notificacion.icon = "error";
                    moto.notificacion.msg = e;
                })
            }    
    },
    
    personaComputed: () => {
        if (moto.selectPersona.length == 0) {
            return { id: 0, name: "", nombre: "" }
        } else {
            return { id: moto.selectPersona[0].id, name: moto.selectPersona[0].name, nombre: moto.selectPersona[0].nombre }
        }
    },

    disabled: () => {
        moto.dato.name = moto.dato.name.replace(/\s+/g, '').toUpperCase();
        moto.dato.color = moto.dato.color.replace(/\s+/g, ' ').toUpperCase();
        moto.dato.tipoaceite = moto.dato.tipoaceite.replace(/\s+/g, ' ').toUpperCase();
        return moto.dato.name.length < 5 || moto.dato.tipoId == 0 || moto.dato.personaId == 0
    },

    init: async () => {

        await gestion(Tipo.url(), { params: { opcion: 1 } }).then(res => {
            moto.listaTipos = res;
            moto.optionsTipo = JSON.parse(JSON.stringify(res));
        }).catch(e=>{
            moto.notificacion.type = true;
            moto.notificacion.icon = "error";
            moto.notificacion.msg = e;
        })

        await gestion(ServicioTaller.url(), { params: { opcion: 1 } }).then(res => {
            moto.listaServiciosTaller = res;
            //console.log(res)
            //moto.optionsTipo = JSON.parse(JSON.stringify(res));
        }).catch(e=>{
            moto.notificacion.type = true;
            moto.notificacion.icon = "error";
            moto.notificacion.msg = e;
        })


        await gestion(Persona.url(), { params: { opcion: 1 } }).then(res => {
            moto.listaPersonas = res;
            moto.optionsPersona = JSON.parse(JSON.stringify(res));
        }).catch(e=>{
            moto.notificacion.type = true;
            moto.notificacion.icon = "error";
            moto.notificacion.msg = e;
        })

        await moto.getRows();
        moto.accion = { value: -1, label: "NEUTRO" };
        moto.dato = new Moto();
        moto.modalPersona = false;
        moto.modalViewPersona = false;
        moto.modalViewTabla =false; 
        moto.listaTabla = false;
        moto.modalViewOrdenes = false;
        moto.rowsOrdenes = [];
        moto.selectOrden = [];
        moto.exOrden = false;
        moto.listaOrdenes = [];
        moto.listaServiciosTaller = [];

    },


    columns: Moto.columnsNew()
})