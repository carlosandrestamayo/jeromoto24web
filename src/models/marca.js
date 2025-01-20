import { Marca } from "../clases/marca.js";
import { reactive } from 'vue';
import { gestion , db} from "./db.js";
import axios from 'axios'


/*axios.get("http://localhost:3000/api/tutorials",{params:{}}).then(res=>{
    console.log(res)
})
.catch(e=>{
    console.error(e)
})*/

const url = "http://localhost:3000/api/marcas";

export const marca = reactive({
    dato: new Marca(),
    titulo: "Tabla Marca",
    filter: "",
    modalNotify:false,
    notificacion: {
        type: false,
        icon: "",
        msg: ""
    },

    rows: [],
    getRows: () => {

        db(url,{params:{}}).then(response=>{
            //marca.rows = response;
        })
        .catch(e=>{
            //console.error(e)
        })

        gestion(Marca.url(), { params: { opcion: 1 } })
            .then(response => {
                marca.rows = response;
            }).catch(e => {
                console.error(e)
                marca.notificacion.type = true;
                marca.notificacion.icon = "error";
                marca.notificacion.msg = e;
            })
    },

    accion: { value: -1, label: "NEUTRO" },
    openModal: (id) => {
        marca.filter = "";
        if (id == 0) {
            marca.accion = { value: 0, label: "Agregar" };
            marca.dato = new Marca();
        } else {
            marca.accion = { value: 1, label: "Editar" };
            marca.dato = JSON.parse(JSON.stringify(marca.rows.find(d => d.id == id)));
        }
    },

    closeModal: () => {
        marca.accion = { value: -1, label: "NEUTRO" };
        marca.dato = new Marca();
    },

    crud: async () => {

        if (marca.accion.value == 0) {

                await gestion(Marca.url(), {
                    params: { opcion: 2, id: marca.dato.id, name: marca.dato.name }
                }).then(response => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "close";
                    marca.filter = marca.dato.name;
                    marca.notificacion.msg = "Se agrego Exitosamente";
                    //marca.modalNotify = true;
                }).catch(e => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "error";
                    marca.notificacion.msg = e;
                })
                await marca.init();
               
                //marca.modalNotify= true;

            } else {

                await gestion(Marca.url(), {
                    params: { opcion: 3, id: marca.dato.id, name: marca.dato.name }
                }).then(response => {
                    marca.filter = marca.dato.name;
                    //marca.modalNotify= true;
                    marca.notificacion.icon = "close";
                    marca.notificacion.type = true;
                    marca.notificacion.msg = "Edicion Exitosa";
                }).catch(e => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "error";
                    marca.notificacion.msg = e;
                })
                await marca.init();
            }
    },

    crud2: async () => {

        if (marca.accion.value == 0) {

                await db(url+"/create", {
                    params: { opcion: 2, id: marca.dato.id, name: marca.dato.name }
                }).then(response => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "close";
                    marca.filter = marca.dato.name;
                    marca.notificacion.msg = "Se agrego Exitosamente";
                    //marca.modalNotify = true;
                }).catch(e => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "error";
                    marca.notificacion.msg = e;
                })
                await marca.init();
               
                //marca.modalNotify= true;

            } else {

                await gestion(url+"/update", {
                    params: { opcion: 3, id: marca.dato.id, name: marca.dato.name }
                }).then(response => {
                    marca.filter = marca.dato.name;
                    //marca.modalNotify= true;
                    marca.notificacion.icon = "close";
                    marca.notificacion.type = true;
                    marca.notificacion.msg = "Edicion Exitosa";
                }).catch(e => {
                    marca.notificacion.type = true;
                    marca.notificacion.icon = "error";
                    marca.notificacion.msg = e;
                })
                await marca.init();
            }
    },


    disabled: () => {
        marca.dato.name = marca.dato.name.replace(/\s+/g, '').toUpperCase();
        return marca.dato.name.length == 0
    },

    init: async () => {
        marca.getRows();
        marca.accion = { value: -1, label: "NEUTRO" };
        marca.dato = new Marca();
        marca.modalNotify= false;
        marca.notificacion={
            type: false,
            icon: "",
            msg: ""
        }

    },
    columns: Marca.columns()
})