import { Marca } from "../clases/marca.js";
import { Tipo } from "../clases/tipo.js";
import { reactive } from 'vue';
import { gestion } from "./db.js";
import { TablaMantenimiento as Tabla} from "../clases/TablaMantenimiento.js";

export const tipo = reactive({
    dato: new Tipo(),
    titulo: "Tabla Referencias",
    filter: "",
    notificacion: {
        type: false,
        icon: "",
        msg: ""
    },

    listaTipos: [],
    rows: [],
    getRows: async () => {

        await gestion(Tipo.url(), { params: { opcion: 1 } }).then(datos => {
            tipo.rows = datos;
            tipo.listaTipos = datos;
        }).catch(e=>{
            tipo.notificacion.type = true;
            tipo.notificacion.icon = "error";
            tipo.notificacion.msg = e;
        })
    
    },

    //Tabla Marca
    selectMarca: new Marca(),
    optionsMarca: [],
    selectedMarca: (val) => {
        tipo.dato.marcaId = val.id;
    },

    //Tabla Mantenimiento
    optionsTabla:[],
    columnsTabla: Tabla.columns(),
    modalTabla:false,
    datoTabla:{
        id:0,
        km:0,
        servicioTallerId:0,
        tipoId:0,
        medible:0,
        name:""
    },
    modalEditTabla:false,
    openTabla:(val)=>{
        tipo.modalTabla = true;
        tipo.filter = "";
        tipo.dato = JSON.parse(JSON.stringify(new Tipo(tipo.rows.find(d => d.id == val))));
        gestion(Tabla.url(),{params:{opcion:4,tipoId:val}}).then(response=>{
            //tipo.optionsTabla = response;
            tipo.optionsTabla = response.sort((a, b) => {
                    return a.medible > b.medible ? -1 : 1
            })
        }).catch(e=>{
            tipo.notificacion.type = true;
            tipo.notificacion.icon = "error";
            tipo.notificacion.msg = e;
        })
    },

    closeModalTabla:()=>{
        tipo.modalTabla = false;
        tipo.filter = "";
    },

    openModalEditTabla:(id)=>{
         tipo.datoTabla = JSON.parse(JSON.stringify(new Tabla(tipo.optionsTabla.find(d => d.id == id))));
         tipo.modalEditTabla = true;
    },

    closeModalEditTabla:()=>{
        tipo.modalEditTabla = false;
    },

    editTabla:async()=>{
        
        await gestion(Tabla.url(), {
                    params: {
                        opcion: 3, 
                        id: tipo.datoTabla.id, 
                        km: tipo.datoTabla.km, 
                        servicioTallerId: tipo.datoTabla.servicioTallerId,
                        tipoId: tipo.datoTabla.tipoId
                    }
                }).then(response => {
                    console.log(response)
                    tipo.notificacion.type = true;
                    tipo.notificacion.icon = "close";
                    tipo.filter = tipo.datoTabla.name;
                    tipo.notificacion.msg = "Edicion Exitosa";

                    gestion(Tabla.url(),{params:{opcion:4,tipoId:tipo.datoTabla.tipoId}})
                    .then(response=>{
                        tipo.optionsTabla = response.sort((a, b) => {
                            return a.medible > b.medible ? -1 : 1
                        })
                        tipo.modalEditTabla = false;
                        tipo.filter = tipo.datoTabla.name;
                    })
                }).catch(e => {
                    tipo.notificacion.type = true;
                    tipo.notificacion.icon = "error";
                    tipo.notificacion.msg = e;
                })

    },
    
    accion: { value: -1, label: "NEUTRO" },
    openModal: (id) => {
        tipo.filter = "";
        tipo.modalTabla = false;
        if (id == 0) {
            tipo.accion = { value: 0, label: "Agregar" };
            tipo.dato = new Tipo();
            tipo.dato.id = tipo.rows.length + 1;
            tipo.selectMarca = new Marca();
        } else {
            tipo.accion = { value: 1, label: "Editar" };
            tipo.dato = JSON.parse(JSON.stringify(new Tipo(tipo.rows.find(d => d.id == id))));
            tipo.selectMarca = tipo.optionsMarca.find(m => m.id == tipo.dato.marcaId)
        }
    },

    closeModal: () => {
        tipo.accion = { value: -1, label: "NEUTRO" };
        tipo.dato = new Tipo();
        tipo.filter = "";
    },

    crud: async () => {

        //let res = tipo.rows.filter(d => d.name == tipo.dato.name && d.id !== tipo.dato.id);

        //if (res.length == 0) {
            
            if (tipo.accion.value == 0) {
                //console.log(tipo.dato.marcaId)
                await gestion(Tipo.url(), {
                    params: {
                        opcion: 2, 
                        id: tipo.dato.id, 
                        name: tipo.dato.name, 
                        marcaId: tipo.dato.marcaId
                    }
                }).then(response => {
                    //console.log(response)
                    tipo.notificacion.type = true;
                    tipo.notificacion.icon = "close";
                    tipo.filter = tipo.dato.name;
                    tipo.notificacion.msg = "Se agrego Exitosamente";
                }).catch(e => {
                    tipo.notificacion.type = true;
                    tipo.notificacion.icon = "error";
                    tipo.notificacion.msg = e;
                })

                await tipo.init();

            } else {

                await gestion(Tipo.url(), {
                    params: { 
                        opcion: 3, 
                        id: tipo.dato.id, 
                        name: tipo.dato.name, 
                        marcaId: tipo.dato.marcaId }
                }).then(response => {
                    tipo.notificacion.type = true;
                    tipo.notificacion.icon = "close";
                    tipo.filter = tipo.dato.name;
                    tipo.notificacion.msg = "Edicion Exitosa";
                }).catch(e => {
                    tipo.notificacion.type = true;
                    tipo.notificacion.icon = "error";
                    tipo.notificacion.msg = e;
                })
                await tipo.init();
            }
    },


    disabled: () => {
        tipo.dato.name = tipo.dato.name.replace(/\s+/g, '').toUpperCase();
        return tipo.dato.name.length == 0 || tipo.dato.marcaId == 0;
    },

    init: async () => {

        await gestion(Marca.url(), { params: { opcion: 1 } }).then(res => {
            tipo.optionsMarca = res;
        }).catch(e=>{
            tipo.notificacion.type = true;
            tipo.notificacion.icon = "error";
            tipo.notificacion.msg = e;
        })

        await tipo.getRows();
        tipo.accion = { value: -1, label: "NEUTRO" };
        tipo.selectMarca = new Marca();
        tipo.modalTabla=false;
        tipo.modalEditTabla=false;
        tipo.optionsTabla = [];
    },

    columns: Tipo.columns()
})
