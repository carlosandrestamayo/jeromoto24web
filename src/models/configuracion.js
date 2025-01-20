import { Configuracion as Cfg} from "../clases/configuracion.js";
import { reactive } from 'vue';
import { gestion } from "./db.js";

export const cfg = reactive({
    dato: new Cfg(),
    datoEdit:new Cfg(),
    
    filter: "",  
    notificacion: {
        type: false,
        icon: "",
        msg: ""
    },

    rows: [],
    getRows: () => {

        gestion(Cfg.url(), { params: { opcion: 1 } })
            .then(response => {
                cfg.dato = response;
                //console.log(response)
            }).catch(e => {
                cfg.notificacion.type = true;
                cfg.notificacion.icon = "error";
                cfg.notificacion.msg = e;
            })
    },

    accion: { value: -1, label: "NEUTRO" },
    openModal: () => {
        
        
            //cfg.dato = new Cfg();
        cfg.accion = { value: 1, label: "Editar" };
        cfg.datoEdit = JSON.parse(JSON.stringify(cfg.dato));
            //console.log(cfg.datoEdit)
        
    },

    closeModal: () => {
        cfg.accion = { value: -1, label: "NEUTRO" };
        //cfg.dato = new Cfg();
    },

    crud: async () => {

        /*if (marca.accion.value == 0) {

                await gestion(Marca.url(), {
                    params: { opcion: 2, id: marca.dato.id, name: marca.dato.name }
                }).then(response => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "close";
                    marca.filter = marca.dato.name;
                    marca.notificacion.msg = "Se agrego Exitosamente";
                }).catch(e => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "error";
                    marca.notificacion.msg = e;
                })
                await marca.init();
                marca.notificacion.type = true;

            } else {

                await gestion(Marca.url(), {
                    params: { opcion: 3, id: marca.dato.id, name: marca.dato.name }
                }).then(response => {
                    marca.filter = marca.dato.name;
                    marca.notificacion.icon = "close";
                    marca.notificacion.type = true;
                    marca.notificacion.msg = "Edicion Exitosa";
                }).catch(e => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "error";
                    marca.notificacion.msg = e;
                })
                await marca.init();
            }*/
    },

    disabled: () => {
        cfg.datoEdit.razonsocial = cfg.datoEdit.razonsocial.replace(/\s+/g, ' ');
        cfg.datoEdit.actividad = cfg.datoEdit.actividad.replace(/\s+/g, ' ');
        //return marca.dato.name.length == 0
        return cfg.datoEdit.razonsocial.length == 0 || cfg.datoEdit.actividad.length == 0
    },

    editar:()=>{
        let obj = cfg.datoEdit;  
        let query = "UPDATE configuraciones SET razonsocial = "+obj.razonsocial +", actividad = " + obj.actividad + ", telefono = " + obj.telefono + ", telefono2 = " + obj.telefono2 + ", `direccion` = 'cra 19 # 3-47', `ciudad` = 'Aguachicac', `correo` = 'jeromotos24@gmail.comc' WHERE `configuraciones`.`id` = 1"
        console.log(query)    
    },

    init: async () => {
        cfg.getRows();
        cfg.accion = { value: -1, label: "NEUTRO" };
        cfg.dato = new Cfg();
        cfg.datoEdit = new Cfg();
    },
    //columns: Marca.columns()
})