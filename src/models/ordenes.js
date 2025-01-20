import { Orden } from "../clases/orden.js";
import {Moto }from "../clases/moto.js"
import { reactive } from 'vue';
import { gestion } from "./db.js";
import { ServicioTaller } from "../clases/servicioTaller.js";
import { Persona } from "../clases/persona.js"



export const orden = reactive({
    dato: new Orden(),
    s1:"",
    s2:"",
    s3:"",
    s4:"",
    s5:"",
    filter:"",
    notificacion: {  
        type: false,
        icon: "",
        msg: ""
    },
    rowsMoto:[],
    
    
    listaIniciadas:[],
    listaServiciosTaller:[],
    listaMotos:[],
    
    optionsOrdenes:[],
    selectServiciosTallerOrden:[],
    
    getRows: async () => {
    
        await gestion(Orden.url(),{ params: { opcion: 5} })
        .then(response=>{
            orden.dato.id = (response[0].newId+1);
            orden.dato.name = (orden.dato.id).toString().padStart(10,0);
            gestion(ServicioTaller.url(), { params: { opcion: 1 } }).then(response=>{
                    orden.listaServiciosTaller = response;
                    gestion(Moto.url(), { params: { opcion: 6 } }).then(response=>{
                        orden.listaMotos = response;
                        gestion(Persona.url(),{params:{opcion:5}}).then(response=>{
                            orden.optionsTecnico = response.map(t=>{
                                return{
                                    value:t.id,
                                    label:t.nombre,
                                    description:t.name
                                }
                            });
                        })

                    })
            })
        })
        .catch(e=>{
            orden.notificacion.type = true;
            orden.notificacion.icon = "error";
            orden.notificacion.msg = e;
        });

    },

    selectedOrden:(newVal)=>{
         //console.log(newVal)   
         orden.dato = JSON.parse(JSON.stringify(orden.listaIniciadas.find(o=> o.id == newVal.value)));
         //console.log(orden.dato)
    },

    //Moto
    listaMotos:[],
    modalMoto:false,
    selectMoto: [],
    datoMoto:{id:0,name:"",color:"",tipoId:0,personaId:0,personaName:"",personaNombre:"",
                telefono:"",telefono2:"",direccion:"",correo:"",tipoName:"",marcaName:""},

    filterMoto: "",
    selectedMoto: (newVal) => {
        if (newVal.length == 0) {
            orden.selectMoto = []
        } else {
            //console.log("else")
        }
    },
    motoComputed: () => {
        if (orden.selectMoto.length == 0) {
            return { id: 0, name: "", personaNombre:""}
        } else {
            return { id: orden.selectMoto[0].id, name: orden.selectMoto[0].name, personaNombre: orden.selectMoto[0].personaNombre }
        }
    },
    modalMoto: false,
    openModalMoto:()=>{

        if (orden.datoMoto.id == 0) {
            orden.selectMoto = [];
        } else {
            orden.selectMoto = [orden.datoMoto]
            orden.dato.motoId = orden.datoMoto.id
        }

        orden.modalMoto = true;
        
    },
    closeModalMoto:()=>{
        orden.modalMoto = false;
        orden.filterMoto = ""
    },
    disabledMoto: () => {
        //return false;
        if (orden.selectMoto.length == 0) {
            return true;
        }
        return orden.selectMoto[0].id == 0
    },

    ultimoKm:0,
    time:"",
    changeHoraEntrega:(val)=>{
       orden.dato.horaentrega = val+":00";
    },
    editMoto: async() => {
       

        await gestion(Orden.url(),{params:{opcion:12,motoId:orden.selectMoto[0].id}})
        .then(response=>{
            if(response == 1){
                orden.notificacion.type = true;
                orden.notificacion.icon = "error";
                orden.notificacion.msg = "La motocicleta tiene una orden iniciada";
            }else{
                orden.datoMoto = orden.selectMoto[0];
                orden.dato.motoId = orden.selectMoto[0].id;
                //orden.rowsMoto=[{name:orden.selectMoto[0].name}];

                //let row = JSON.parse(JSON.stringify(orden.selectMoto[0]));

                //orden.rowsMoto = [row];
                console.log(orden.selectMoto)
                orden.modalMoto = false;
                orden.filterMoto = ""

                gestion(Orden.url(),{params:{opcion:13,motoId:orden.datoMoto.id}})
                .then(ukm =>{
                    //console.log(ukm);
                    if(ukm == null){
                        //console.log(null+0)
                        orden.ultimoKm = 0;
                    }else{
                        orden.ultimoKm = ukm;
                    }
                })
            }
        })
        .catch(e=>{
            orden.notificacion.type = true;
            orden.notificacion.icon = "error";
            orden.notificacion.msg = e;
        })
    },

    selectTecnico:{value:0,label:"",description:""},
    optionsTecnico:[],
    selectedTecnico:(newVal)=>{
        //console.log(newVal);
        orden.dato.tecnicoId = newVal.value;
    },
    computedKm:()=>{
        return parseInt(orden.dato.km) <= orden.ultimoKm
    },

    init: async()=>{
        orden.getRows();
        orden.rowsMoto = [];
        orden.dato = new Orden();
        orden.modalMoto = false;
        orden.filterMoto = "";
        orden.selectMoto = [];
        orden.datoMoto = {id:0,name:"",color:"",tipoId:0,personaId:0,personaName:"",personaNombre:"",telefono:"",telefono2:"",direccion:"",correo:"",tipoName:"",marcaName:""};
        orden.listaIniciadas = [];
        orden.listaServiciosTaller = [];
        orden.listaMotos = [];
        
        orden.optionsOrdenes = [];
        orden.selectServiciosTallerOrden = [];
        orden.ultimoKm = 0;
        orden.selectTecnico = {value:0,label:"",description:""};
        orden.optionsTecnico = [];


    },

    createOrden:async()=>{
        
        let objSol = {s1:orden.s1,s2:orden.s2,s3:orden.s3,s4:orden.s4,s5:orden.s5};
        let objReal = {r1:"",r2:"",r3:"",r4:"",r5:""};
        
        let values = "VALUES("+orden.dato.id+",'"+orden.dato.name+"',"+orden.dato.km+",'Iniciada','"+JSON.stringify(objSol)+"',current_timestamp(),current_timestamp(),current_timestamp(),current_timestamp(),'"+orden.dato.fechaentrega+"','"+orden.dato.horaentrega+"',"+orden.dato.motoId+","+orden.dato.tecnicoId+")";
        let query = "INSERT INTO `ordenes` (`id`, `name`, `km`, `estado`, `solicitados`,`fechaentrada`, `horaentrada`, `fechasalida`, `horasalida`, `fechaentrega`, `horaentrega`, `motoId`,`tecnicoId`)" + values;
        
        //let sql = "INSERT INTO ordenes VALUES("+orden.dato.id+",'"+orden.dato.name+"',"+orden.dato.km+",0,'"+JSON.stringify(objSol)+"','"+JSON.stringify(objReal)+"',"+orden.dato.motoId+");"
        
        
        let str = "INSERT INTO servicios VALUES";
        for(let i =0; i < orden.listaServiciosTaller.length;i++){
            let s = orden.listaServiciosTaller[i];
            let o = orden.selectServiciosTallerOrden.find(k=> k.id == s.id);

            if(orden.listaServiciosTaller.length -1 == i){
                if(o==undefined){
                    str +=  "('', '0', '0',"+s.id+ ","+orden.dato.id+");";
                }else{
                    str +=  "('', '1', '0',"+s.id+ ","+orden.dato.id+");";
                }
            }else{
                if(o==undefined){
                    str +=  "('', '0', '0',"+s.id+ ","+orden.dato.id+"),";
                }else{
                    str +=  "('', '1', '0',"+s.id+ ","+orden.dato.id+"),";
                }
            }

            
        }

       await gestion(Orden.url(), {
                    params: {
                        opcion: 2,
                        //sql:sql,
                        sql:query,
                        sql2:str
                    }
                }).then(res => {
                    
                    orden.notificacion.type = true;
                    orden.notificacion.icon = "close";
                    orden.notificacion.msg = "Creada Orden # " + orden.dato.name ;
                    orden.init();
                }).catch(e=>{
                    orden.notificacion.type = true;
                    orden.notificacion.icon = "error";
                    orden.notificacion.msg = e;
                })
    }
})