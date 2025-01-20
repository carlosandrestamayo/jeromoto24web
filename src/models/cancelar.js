import { reactive } from 'vue';
import { gestion } from "./db.js";
import { Moto } from "../clases/moto.js";
import { Persona } from "../clases/persona.js";
import { Orden } from "../clases/orden.js";
import moment from "moment";
 
export const ov = reactive({
	dato:new Orden(),
	listaOrdenes:[],
	datosServicios: [],
	filter:"",
	s1:"",s2:"",s3:"",s4:"",s5:"",
   r1:"",r2:"",r3:"",r4:"",r5:"",
	notificacion: {  
		type: false,
		icon: "",
		msg: ""
   },
	selectOrden :[],
   exOrden:true,
   modalCancelar:false,
   getRows:async()=>{
		gestion(Orden.url(),{ params: { opcion: 21} })
		.then(response=>{
			ov.rowsOrdenes = response;  
		})
		.catch(e=>{
			ov.notificacion.type = true;
			ov.notificacion.icon = "error";
			ov.notificacion.msg = e;  
		});
	},

	rowsOrdenes: [],

	selectedOrden:(newVal)=>{
		
		if(newVal.length == 0){
			ov.dato = new Orden();
			ov.datosServicios = [];
			ov.exOrden = true;
		}else{
			
			ov.dato = newVal[0];
			ov.datosServicios = newVal[0].servicios;

			ov.s1 = JSON.parse(newVal[0].solicitados).s1;
			ov.s2 = JSON.parse(newVal[0].solicitados).s2;
			ov.s3 = JSON.parse(newVal[0].solicitados).s3;
			ov.s4 = JSON.parse(newVal[0].solicitados).s4;
			ov.s5 = JSON.parse(newVal[0].solicitados).s5;
			
			ov.r1 = JSON.parse(newVal[0].realizados).r1;
			ov.r2 = JSON.parse(newVal[0].realizados).r2;
			ov.r3 = JSON.parse(newVal[0].realizados).r3;
			ov.r4 = JSON.parse(newVal[0].realizados).r4;
			ov.r5 = JSON.parse(newVal[0].realizados).r5;
			
			ov.exOrden = false;
		}
	},

	cancelarOrden:()=>{
		if(ov.dato.estado == 'Cancelada'){
			ov.notificacion.type = true;
		 ov.notificacion.icon = "error";
		 ov.notificacion.msg = "La Orden # " + ov.dato.name + " Ya esta Cancelada";
		}else{
			ov.modalCancelar = true;	
		}
	},
	
	getKmPromedio:async(datos)=>{

		return new Promise((resolve,reject)=>{
			let cns = "SELECT * FROM motos";
			let kmi = 0;
			let kmf = 0;
			let deltaKm = 0;
			let fechai = "";
			let fechaf = "";
			let deltaFecha = 0;
			let delta = 0;
			let arr = [];
			let promedio = 0;
			let resultado = 0;
			let cantidad = 0;
			
			if(datos.length < 2){
				cns = "UPDATE `motos` SET `kmpromedio` = 0 WHERE `motos`.`id` = "+ov.dato.motoId+";";
				resolve(cns);
			}
			else if(datos.length == 2){
				
				kmi = datos[0].km;
				kmf = datos[1].km;	
				deltaKm = Math.abs(kmi-kmf);

				fechai = moment(datos[0].fechasalida);
				fechaf = moment(datos[1].fechasalida);
				deltaFecha  = Math.abs(fechai.diff(fechaf,'days'));


				if(deltaFecha == 0){
					cns = "UPDATE `motos` SET `kmpromedio` = 0 WHERE `motos`.`id` = "+ov.dato.motoId+";";
					resolve(cns);   
				}else{
					promedio = parseInt(deltaKm /deltaFecha);
					cns = "UPDATE `motos` SET `kmpromedio` = "+ promedio +" WHERE `motos`.`id` = "+ov.dato.motoId+";";
					resolve(cns);       
				}	
			}
			else if(datos.length > 2){

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
						}else{
							cantidad = cantidad + 1;
							promedio += parseInt(deltaKm/deltaFecha);	
						}
					}
				}       
				resultado = parseInt(promedio/cantidad); 
				if(cantidad == 0 || isNaN (resultado)){
					cns = "UPDATE `motos` SET `kmpromedio` = 0 WHERE `motos`.`id` = "+ov.dato.motoId+";";
					resolve(cns);
				}else{
					cns = "UPDATE `motos` SET `kmpromedio` = '"+resultado+"' WHERE `motos`.`id` = "+ov.dato.motoId+";";
					resolve(cns);
				}    
				
			}
		})
	},
	confirmarCancel:(val)=>{
		
		if(val){
			if(ov.dato.estado == 'Iniciada'){
				gestion(Orden.url(),{params:{opcion:4,id:ov.dato.id}})
				.then(res=>{
					ov.notificacion.type = true;
					ov.notificacion.icon = "close";
					ov.notificacion.msg = "Cancelada Orden # " + ov.dato.name;
					ov.init();
				})
				.catch(e=>{
					ov.notificacion.type = true;
					ov.notificacion.icon = "error";
					ov.notificacion.msg = e;
				});	
			}
			if(ov.dato.estado == 'Finalizada'){
				let sql = "UPDATE ordenes SET estado = 'Cancelada' WHERE id =" + ov.dato.id + ";";
				gestion(Orden.url(),{params:{opcion:22,motoId:ov.dato.motoId}})
				.then(res=>{
					ov.listaOrdenes = res.filter(o=> o.id !== ov.dato.id);
					ov.getKmPromedio(res.filter(o=> o.id !== ov.dato.id)).then(res=>{
						
						gestion(Orden.url(),{params:{opcion:24,sql:sql,cns:res}})
						.then(res=>{
							ov.notificacion.type = true;
							ov.notificacion.icon = "close";
							ov.notificacion.msg = "Cancelada Orden # " + ov.dato.name;
							ov.init();
						})
						
					})
				})
				.catch(e=>{
					ov.notificacion.type = true;
					ov.notificacion.icon = "error";
					ov.notificacion.msg = e;  
				});
			}


		}else{
			ov.modalCancelar = false;
		}
	},
	init: async ()=>{
		
		ov.rowsOrdenes = [];
		
		ov.datosServicios = [];
		ov.filter = "";

		ov.selectOrden = [];
		ov.exOrden = true;
		
		ov.s1 = "";
		ov.s2 = "";
		ov.s3 = "";
		ov.s4 = "";
		ov.s5 = "";

		ov.r1 = "";
		ov.r2 = "";
		ov.r3 = "";
		ov.r4 = "";
		ov.r5 = "";

	  ov.modalCancelar = false;

		ov.getRows();
	}

})