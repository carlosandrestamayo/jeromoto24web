import { Orden } from "../clases/orden.js";
import { Moto }from "../clases/moto.js";
import { Persona }from "../clases/persona.js";
import { reactive } from 'vue';
import { gestion } from "./db.js";
import { ServicioTaller } from "src/clases/servicioTaller.js";
import moment from 'moment';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export const ordenFin = reactive({
    dato: new Orden(),
    filter:"",
    s1:"",s2:"",s3:"",s4:"",s5:"",
    r1:"",r2:"",r3:"",r4:"",r5:"", 
    lista:[],
    listaImagenes:[],  
    ultimoKm:0,
    notificacion: {  
        type: false,
        icon: "",
        msg: ""
    },
    selectOrden :[],
    exOrden:true,
    rowsOrdenes:[],
    getRows:async()=>{
    	await gestion(Orden.url(),{ params: { opcion: 7} })
        .then(response=>{
            ordenFin.rowsOrdenes = response;
        })
        .catch(e=>{
        	ordenFin.notificacion.type = true;
            ordenFin.notificacion.icon = "error";
            ordenFin.notificacion.msg = e;
        })
    },

    selectedOrden:async(newVal)=>{
 
        if(newVal.length == 0){
            ordenFin.dato = new Orden();
            ordenFin.listaServiciosSolicitados = [];
            ordenFin.exOrden = true;
            ordenFin.lista = [];    
        }else{
            ordenFin.dato = new Orden(newVal[0]);
            ordenFin.listaServiciosSolicitados = newVal[0].servicios;
            ordenFin.listaServiciosRealizados = newVal[0].servicios;

            ordenFin.lista = newVal;

            ordenFin.s1 = JSON.parse(newVal[0].solicitados).s1;
            ordenFin.s2 = JSON.parse(newVal[0].solicitados).s2;
            ordenFin.s3 = JSON.parse(newVal[0].solicitados).s3;
            ordenFin.s4 = JSON.parse(newVal[0].solicitados).s4;
            ordenFin.s5 = JSON.parse(newVal[0].solicitados).s5;
            
            ordenFin.r1 = JSON.parse(newVal[0].realizados).r1;
            ordenFin.r2 = JSON.parse(newVal[0].realizados).r2;
            ordenFin.r3 = JSON.parse(newVal[0].realizados).r3;
            ordenFin.r4 = JSON.parse(newVal[0].realizados).r4;
            ordenFin.r5 = JSON.parse(newVal[0].realizados).r5;
            ordenFin.exOrden = false;
        }
        
      
    },

    listaServiciosRealizados:[],
    listaServiciosSolicitados:[],
    selectedServiciosRealizados:[],
    
    getSql:async()=>{
        return new Promise ((resolve,reject)=>{
            let arr = [];
            let sql = "";
            for(let i =0 ; i < ordenFin.selectedServiciosRealizados.length;i++){
                let obj = (ordenFin.selectedServiciosRealizados[i]);
                sql = "UPDATE `servicios` SET `realizado` = '1' WHERE `servicios`.`id` = " + obj.id +";" ;
                arr.push(sql)
            }
            if(arr.length == 0){
                arr = ["SELECT * FROM ordenes"]
            }
            resolve(arr); 
        })
    },
    getKmPromedio:async(datos)=>{
        return new Promise ((resolve,reject)=>{
            let kmi = 0;
            let kmf = 0;
            let deltaKm = 0;
            let fechai = "";
            let fechaf = "";
            let deltaFecha = 1;
            let delta = 0;
            let cns = "SELECT * FROM motos";
            let arr = [];
            let promedio = 0;
            let resultado = 0;
            let cantidad = 0;   

            if(datos.length == 0){
                cns = "UPDATE `motos` SET `kmpromedio` = 0 WHERE `motos`.`id` = "+ ordenFin.dato.motoId+";";
                resolve(cns);
            }
            else if(datos.length == 1){
                
                kmi = datos[0].km;
                kmf = ordenFin.dato.km;
                deltaKm = Math.abs(kmf-kmi);
                
                fechai = moment(datos[0].fechasalida);
                fechaf = moment(new Date());
                deltaFecha = Math.abs(fechai.diff(fechaf,'days'));
                
                if(deltaFecha == 0){
                    cns = "UPDATE `motos` SET `kmpromedio` = 0 WHERE `motos`.`id` = " + ordenFin.dato.motoId + ";";
                    resolve(cns);   
                }else{
                    promedio = parseInt(deltaKm /deltaFecha);
                    cns = "UPDATE `motos` SET `kmpromedio` = "+ promedio +" WHERE `motos`.`id` = " + ordenFin.dato.motoId + ";";
                    resolve(cns);       
                }   
            }
            else if(datos.length > 1){

                arr = [{km:ordenFin.dato.km,fecha:moment(new Date())}];
                for(let i = 0; i < datos.length; i++){
                    arr.push({km:datos[i].km,fecha:moment(datos[i].fechasalida)});
                }

                promedio = 0;
                cantidad = 0;
                for (let i = 0; i < arr.length ; i++) {
                    for (let j = i+1; j < arr.length; j++) {
                        deltaKm = Math.abs(arr[i].km-arr[j].km);
                        deltaFecha = Math.abs(arr[i].fecha.diff(arr[j].fecha,'days'));
                        if(deltaFecha == 0){
                            //cantidad = cantidad + 1;
                        }else{
                            cantidad = cantidad + 1;
                            promedio += parseInt(deltaKm/deltaFecha);    
                        }
                        //console.log({deltaKm,deltaFecha,promedio})
                    }
                }       
                //console.log({cantidad})
                resultado = parseInt(promedio/cantidad); 
                if(cantidad == 0 || isNaN (resultado)){
                    cns = "UPDATE `motos` SET `kmpromedio` = 0 WHERE `motos`.`id` = " + ordenFin.dato.motoId + ";";
                    resolve(cns);
                }else{
                    cns = "UPDATE `motos` SET `kmpromedio` = '"+resultado+"' WHERE `motos`.`id` = " + ordenFin.dato.motoId + ";";
                    resolve(cns);
                }
            }
            else{
                resolve(cns);
            }
        })
    },

    listaFotos:[],
    converToBase64:async ()=>{
        return new Promise((resolve,reject)=>{
            console.log(ordenFin.listaFotos)
            let arr = [];
            let str = "";
            const reader = new FileReader();
            const file = "";
            for(let i = 0; i < ordenFin.listaFotos.length ;i++){
                reader = new FileReader();
                file = ordenFin.listaFotos[i];
                reader.onloadend = async()=>{
                    console.log(typeof reader.result);
                    await arr.push(reader.result);
                    //arr[i] = reader.result;
                    //str += reader.result;
                    //console.log(str)
                }    
                reader.readAsDataURL(file);
            }

            for (var i = 0; i < arr.length; i++) {
                console.log(arr[i])
            }    
       

            resolve(arr)
        })    
    },


    finalizarOrden:async ()=>{
        
        await gestion(Orden.url(),{params:{opcion:22,motoId:ordenFin.dato.motoId}})
        .then(res=>{
            //console.log(res)
            ordenFin.getKmPromedio(res).then(cns=>{
                ordenFin.getSql().then(res=>{
                    /*ordenFin.converToBase64().then(fotos=>{
                        console.log(fotos)
                    })*/
                    let objRealizados = {r1:ordenFin.r1,r2:ordenFin.r2,r3:ordenFin.r3,r4:ordenFin.r4,r5:ordenFin.r5};
                    //let query = "UPDATE ordenes SET estado = 'Finalizada', fechasalida = current_timestamp(), horasalida = current_timestamp(), realizados='"+JSON.stringify(objRealizados)+"' , fotos= "+JSON.stringify(ordenFin.listaFotos)+" WHERE id = " +ordenFin.dato.id+";";
                    //console.log(JSON.stringify(ordenFin.listaFotos ))
                    let query = "UPDATE ordenes SET estado = 'Finalizada', fechasalida = current_timestamp(), horasalida = current_timestamp(), realizados='"+JSON.stringify(objRealizados)+"'  WHERE id = " +ordenFin.dato.id+";";
                    gestion(Orden.url(),{ params: { opcion: 3,sql:query,sql2:res,cns:cns} })
                        .then(response=>{
                            //console.log(response)
                            if(response){
                                ordenFin.notificacion.type = true;
                                ordenFin.notificacion.icon = "close";
                                ordenFin.notificacion.msg = "Finalizada Orden # " + ordenFin.dato.name;
                                ordenFin.init();
                            }else{
                                ordenFin.notificacion.type = true;
                                ordenFin.notificacion.icon = "close";
                                ordenFin.notificacion.msg = "No se pudo Realizar la Transaccion";
                            }
                            
                            ordenFin.init();
                    })
                })
           })
        })
        .catch(e=>{
            ordenFin.notificacion.type = true;
            ordenFin.notificacion.icon = "error";
            ordenFin.notificacion.msg = e;
        })

    },

    imprimirOrden:()=>{
        console.log(ordenFin.dato);
        const doc = new jsPDF();

        const obj = ordenFin.dato;

        //doc.text("Hello world!", 10, 10);
        //doc.save("a4.pdf");
        
        console.log(ordenFin.selectOrden);

        let lss = ordenFin.listaServiciosSolicitados;

        let arrSS = [];

        
        for (let i = 0; i < lss.length; i++) {
            let s = lss[i];
            let strS = s.solicitado == 1 ? " X " : "  ";
            arrSS.push([strS + s.name]);
        }

        console.log(arrSS)

        try{
            
            autoTable(doc, {
                head: [['Orden #', 'Fecha Entrada', 'Fecha Salida','Kilometraje','Estado','Tecnico']],
                body: [
                        [obj.name, obj.fechaentrada, obj.fechasalida,obj.km,obj.estado,"Tecnico"]
                    ],
            })

            autoTable(doc, {
                head: [['Orden #', 'Fecha Entrada', 'Fecha Salida','Kilometraje','Estado','Tecnico']],
                body: [
                        [obj.name, obj.fechaentrada, obj.fechasalida,obj.km,obj.estado,"Tecnico"]
                    ],
            })

            autoTable(doc, {
                head: [['Servicio Taller']],
                body: arrSS
            })
            
            
            //doc.table(10,10,[{"id":"1","name":"Yamaha"}],"[ID,MARCA]");
            doc.save("prueba.pdf");
        }
        catch(e){
            console.error(e)
        }
        
    },

    cancelarOrden:()=>{

    },

    getLabelOrdenes:()=>{

    },

    init:async()=>{
    	ordenFin.getRows();
        ordenFin.rowsOrdenes = [];
        ordenFin.dato = new Orden();
        ordenFin.selectOrden = [];
        ordenFin.filter = "";
        ordenFin.lista = [];
        
        ordenFin.listaServiciosSolicitados = [];
        ordenFin.listaServiciosRealizados = [];
        ordenFin.selectedServiciosRealizados = [];
        ordenFin.listaFotos = [];
        ordenFin.listaImagenes = [];
        
        
        ordenFin.s1 = "";
        ordenFin.s2 = "";
        ordenFin.s3 = "";
        ordenFin.s4 = "";
        ordenFin.s5 = "";

        ordenFin.r1 = "";
        ordenFin.r2 = "";
        ordenFin.r3 = "";
        ordenFin.r4 = "";
        ordenFin.r5 = "";

        ordenFin.exOrden = true;
    }

})