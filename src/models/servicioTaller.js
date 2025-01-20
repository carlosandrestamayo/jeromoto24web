import { ServicioTaller } from "../clases/servicioTaller.js";
import { reactive } from 'vue';
import { gestion } from "./db.js";

export const servicioTaller = reactive({
    dato: new ServicioTaller(),
    titulo: "Tabla Servicio Taller",
    filter: "",

    notificacion: {
        type: false,
        icon: "",
        msg: ""
    },

    rows: [],
    getRows: () => {

        gestion(ServicioTaller.url(), { params: { opcion: 1 } })
            .then(response => {
                servicioTaller.rows = response.sort((a, b) => {
                    return a.medible > b.medible ? -1 : 1
                })
            }).catch(e => {
                servicioTaller.notificacion.type = true;
                servicioTaller.notificacion.icon = "error";
                servicioTaller.notificacion.msg = e;
            })
    },

    accion: { value: -1, label: "NEUTRO" },
    openModal: (id) => {
        servicioTaller.filter = "";
        if (id == 0) {
            servicioTaller.accion = { value: 0, label: "Agregar" };
            servicioTaller.dato = new ServicioTaller();
            servicioTaller.dato.id = servicioTaller.rows.length + 1;
        } else {
            servicioTaller.accion = { value: 1, label: "Editar" };
            servicioTaller.dato = JSON.parse(JSON.stringify(servicioTaller.rows.find(d => d.id == id)));
        }
    },

    closeModal: () => {
        servicioTaller.accion = { value: -1, label: "NEUTRO" };
        servicioTaller.dato = new ServicioTaller();
    },

    crud: async () => {

        let res = servicioTaller.rows.filter(d => d.name == servicioTaller.dato.name && d.id !== servicioTaller.dato.id);

        if (res.length == 0) {

            if (servicioTaller.accion.value == 0) {

                await gestion(ServicioTaller.url(), {
                    params: {
                        opcion: 2,
                        id: servicioTaller.dato.id,
                        name: servicioTaller.dato.name,
                        medible: servicioTaller.dato.medible
                    }
                }).then(response => {
                    console.log(response);
                    servicioTaller.notificacion.type = true;
                    servicioTaller.notificacion.icon = "close";
                    servicioTaller.filter = servicioTaller.dato.name;
                    servicioTaller.notificacion.msg = "Se agrego Exitosamente";
                }).catch(e => {
                    servicioTaller.notificacion.type = true;
                    servicioTaller.notificacion.icon = "error";
                    servicioTaller.notificacion.msg = e;
                })

                await servicioTaller.init();

            } else {

                await gestion(ServicioTaller.url(), {
                    params: {
                        opcion: 3,
                        id: servicioTaller.dato.id,
                        name: servicioTaller.dato.name,
                        medible: servicioTaller.dato.medible
                    }
                }).then(response => {
                    servicioTaller.filter = servicioTaller.dato.name;
                    servicioTaller.notificacion.type = true;
                    servicioTaller.notificacion.icon = "close";
                    servicioTaller.notificacion.msg = "Edicion Exitosa";
                }).catch(e => {
                    servicioTaller.notificacion.type = true;
                    servicioTaller.notificacion.icon = "error";
                    servicioTaller.notificacion.msg = e;
                })
                await servicioTaller.init();
            }

        } else {
            servicioTaller.notificacion.type = true;
            servicioTaller.notificacion.icon = "error";
            servicioTaller.notificacion.msg = "Campo ServicioTaller debe ser Unico";
        }

    },

    disabled: () => {
        servicioTaller.dato.name = servicioTaller.dato.name.replace(/\s+/g, ' ').toUpperCase();
        return servicioTaller.dato.name.length == 0
    },

    init: async () => {
        servicioTaller.getRows();
        servicioTaller.accion = { value: -1, label: "NEUTRO" };
        servicioTaller.dato = new ServicioTaller();
    },
    columns: ServicioTaller.columns()
})