 import { Moto } from "../clases/moto.js";
import { Tipo } from "src/clases/tipo.js";
import { Persona } from "src/clases/persona.js";
import { Orden } from "src/clases/orden.js";
import { ServicioTaller } from "src/clases/servicioTaller.js";
import { gestion } from "./db.js";
import { reactive } from 'vue';
  

export const mt = reactive({
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
    //listaPersonas: [],
    listaMotos: [],
    rows: [],
    
    getRows: async () => {
        
        await gestion(Moto.url(), { params: { opcion: 6} }).then(datos => {
            mt.rows = datos;
        }).catch(e=>{
            mt.notificacion.type = true;
            mt.notificacion.icon = "error";
            mt.notificacion.msg = e;
        })
    },

    //Referencia
    selectTipo: new Tipo(),
    optionsTipo: [],
    selectedTipo: (val) => {
        mt.dato.tipoId = val.value;
    },

    //Persona
    persona: new Persona(),
    optionsPersona: [],
    columnsPersona: Moto.columnsPersona(),
    selectPersona: [],
    filterPersona: "",
    selectedPersona: (newVal) => {
        if (newVal.length == 0) {
            mt.selectPersona = []
        } else {
            //console.log("else")
        }
    },
    modalPersona: false,
    disabledPersona: () => {
        if (mt.selectPersona.length == 0) {
            return true;
        }
        return mt.selectPersona[0].id == 0
    },

    editPersona: () => {
        //console.log("edit persona");
        mt.persona = mt.selectPersona[0];
        mt.dato.personaId = mt.selectPersona[0].id;
        mt.modalPersona = false;
        mt.filterPersona = ""
    },

    openModalPersona: () => {

        if (mt.dato.personaId == 0) {
            mt.selectPersona = [];
        } else {
            mt.selectPersona = [mt.persona]
        }
        mt.modalPersona = true;
        mt.filterPersona = ""
    },
    closeModalPersona: () => {
        mt.modalPersona = false;
        mt.filterPersona = ""
    },

    accion: { value: -1, label: "NEUTRO" },
    openModal: (row) => {
        mt.filter = "";
        if (row == 0) {

            mt.accion = { value: 0, label: "Agregar" };
            mt.dato = new Moto();
            //mt.selectTipo = new Tipo();
            mt.selectTipo = {value:0,label:"",description:""};
            mt.persona = new Persona();
            mt.dato.id = mt.rows.length + 1;

        } else {

            mt.accion = { value: 1, label: "Editar" };
            mt.dato = new Moto(row);
            mt.selectTipo = {value:row.tipo.id,label:row.tipo.name,description:row.marca.name};
            mt.persona = new Persona(row.persona);
            //mt.dato = JSON.parse(JSON.stringify(new Moto(mt.rows.find(d => d.id == id))));
            //mt.selectTipo = mt.listaTipos.find(t => t.id == mt.dato.tipoId);
            //mt.persona = mt.listaPersonas.find(p => p.id == mt.dato.personaId);

            console.log(row)

        }
    },

    closeModal: () => {
        mt.accion = { value: -1, label: "NEUTRO" };
        mt.dato = new Moto();
        mt.modalPersona = false;
    },

    modalViewPersona:false,
    openModalViewPersona:(row)=>{
        //mt.dato = JSON.parse(JSON.stringify(new Moto(mt.rows.find(d => d.id == id))));
        //mt.persona = mt.listaPersonas.find(p => p.id == mt.dato.personaId);
        mt.dato = row;
        mt.persona = row.persona;
        mt.modalViewPersona = true;
    },

    closeModalViewPersona:()=>{
        //console.log(val)
        mt.modalViewPersona = false;
    },

    modalViewTabla:false,
    listaTabla:[],
    openModalViewContador:async(id)=>{

        mt.modalViewTabla = true;

        await gestion(Orden.url(), { params: { opcion: 10, motoId:id } }).then(datos => {
            console.log(datos)
            gestion(ServicioTaller.url(), { params: { opcion: 1 } }).then(response => {
                //console.log(response)
                let arr = response.map(s=>{
                    let f = datos.filter(d=> d.servicioTallerId == s.id);
                    //console.log(f)
                    if(f.length == 0){
                        return null
                    }
                    if(f.length == 1){
                        return f[0]
                    }
                    if(f.length == 2){
                        return f[0]
                    }
                })

                mt.listaTabla = arr.filter(a=> a != null);

                //console.log(arr.filter(a=> a != null))

            })
        }).catch(e=>{
            mt.notificacion.type = true;
            mt.notificacion.icon = "error";
            mt.notificacion.msg = e;
        })
    },  

    closeModalViewTabla:()=>{
        //console.log(val)
        mt.modalViewTabla = false;
    },

    modalViewOrdenes:false,
    openModalViewOrdenes:async(id)=>{
        //mt.modalViewOrdenes = true;
        //console.log(mt.rows.find(m=> m.id == id))
        await gestion(Orden.url(), { params: { opcion: 20, motoId:id } }).then(datos => {
            //mt.rows = datos;
            console.log(datos)
        }).catch(e=>{
            mt.notificacion.type = true;
            mt.notificacion.icon = "error";
            mt.notificacion.msg = e;
        })

    },

    closeModalViewOrdenes:()=>{
        mt.modalViewTabla = false;
    },


    crud: async () => {

       
            mt.filter = mt.dato.name;

            mt.notificacion.icon = "close";
            if (mt.accion.value == 0) {

                await gestion(Moto.url(), {
                    params: {
                        opcion: 2,
                        id: mt.dato.id,
                        name: mt.dato.name,
                        color: mt.dato.color == "" ? "NO REGISTRA" : mt.dato.color,
                        tipoId: mt.dato.tipoId,
                        personaId: mt.dato.personaId
                    }
                }).then(res => {
                    mt.init();
                    mt.notificacion.msg = "Se agrego Exitosamente";
                    mt.notificacion.type = true;
                }).catch(e=>{
                    mt.notificacion.type = true;
                    mt.notificacion.icon = "error";
                    mt.notificacion.msg = e;
                })


            } else {

                await gestion(Moto.url(), {
                    params: {
                        opcion: 3,
                        id: mt.dato.id,
                        name: mt.dato.name,
                        color: mt.dato.color == "" ? "NO REGISTRA" : mt.dato.color,
                        tipoId: mt.dato.tipoId,
                        personaId: mt.dato.personaId
                    }
                }).then(res => {
                    mt.init();
                    mt.notificacion.msg = "Edicion Exitosa";
                    mt.notificacion.type = true;
                }).catch(e=>{
                    mt.notificacion.type = true;
                    mt.notificacion.icon = "error";
                    mt.notificacion.msg = e;
                })
            }

        
    },


    personaComputed: () => {
        if (mt.selectPersona.length == 0) {
            return { id: 0, name: "", nombre: "" }
        } else {
            return { id: mt.selectPersona[0].id, name: mt.selectPersona[0].name, nombre: mt.selectPersona[0].nombre }
        }
    },

    disabled: () => {
        mt.dato.name = mt.dato.name.replace(/\s+/g, '').toUpperCase();
        mt.dato.color = mt.dato.color.replace(/\s+/g, ' ').toUpperCase();
        return mt.dato.name.length < 5 || mt.dato.tipoId == 0 || mt.dato.personaId == 0
    },

    init: async () => {

        await gestion(Tipo.url(), { params: { opcion: 5 } }).then(res => {
            //mt.listaTipos = res;
            mt.optionsTipo = JSON.parse(JSON.stringify(res));
        }).catch(e=>{
            mt.notificacion.type = true;
            mt.notificacion.icon = "error";
            mt.notificacion.msg = e;
        })

        await gestion(Persona.url(), { params: { opcion: 1 } }).then(res => {
            //mt.listaPersonas = res;
            mt.optionsPersona = JSON.parse(JSON.stringify(res));
        }).catch(e=>{
            mt.notificacion.type = true;
            mt.notificacion.icon = "error";
            mt.notificacion.msg = e;
        })

        await mt.getRows();
        mt.accion = { value: -1, label: "NEUTRO" };
        mt.dato = new Moto();
        mt.modalPersona = false;
        mt.modalViewPersona = false;
        mt.modalViewTabla =false;
        mt.listaTabla = false;
        mt.modalViewOrdenes = false;

    },


    columns: Moto.columnsNew()
})