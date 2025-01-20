import { reactive } from 'vue';
import { gestion } from "./db.js";
import { Moto } from "../clases/moto.js";
import { Persona } from "../clases/persona.js";
import { Orden } from "../clases/orden.js";
import { imprimirOrden	 } from "./imprimir.js"	
 
export const ov = reactive({
	dato:new Orden(),
	datosImprimir:{},
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
   getRows:async()=>{
		await gestion(Orden.url(),ov.params)
				.then(response=>{
           			ov.rowsOrdenes = response;  
           			//console.log(response);
           			
				})
        		.catch(e=>{
            	ov.notificacion.type = true;
            	ov.notificacion.icon = "error";
            	ov.notificacion.msg = e;
        		});
	},

	rowsOrdenes: [],
	listaFotos:"",
	selectedOrden:(newVal)=>{
		
		if(newVal.length == 0){
			ov.dato = new Orden();
			ov.datosServicios = [];
			ov.exOrden = true;
		}else{
			ov.datosImprimir = newVal[0];		
			ov.dato = newVal[0];
			ov.datosServicios = newVal[0].servicios;

			console.log(newVal[0]);

			//console.log(ov.dato)


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

	imprimirOrden:()=>{  
		console.log(ov.datosImprimir);
		imprimirOrden(ov.datosImprimir);  	
	},

	params:{params:{opcion:21}},  
	init: async (params)=>{
		//console.log(params)
		if(params == undefined){
			ov.params = { params :{opcion:21}}
		}else{
			ov.params = params;
		}

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

		ov.getRows();
	}

})