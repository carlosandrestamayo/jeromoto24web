import { reactive } from 'vue';
import { gestion } from "./db.js";
import { Moto } from"../clases/moto.js";
import { Persona } from"../clases/persona.js";
import { Orden } from "../clases/orden.js";

//const urlOrden = "http://localhost/apijm/backend/orden.php";

export const oc = reactive({
	dato:new Orden(),
	datoMoto: new Moto(),
	datoPersona: new Persona(),
	datoTecnico:new Persona(),
	datosServicios: [],
	estado:"",
	filter:"",
	filterorden:"",
	s1:"",s2:"",s3:"",s4:"",s5:"",
    r1:"",r2:"",r3:"",r4:"",r5:"",
	notificacion: {  
        type: false,
        icon: "",
        msg: ""
    },

    listaOrdenes:[],
    select :[],
    exOrden:true,
    filterOrdenes:()=>{
    	//oc.selectOrden = {name:"",id:0,description:"000000"};
    	oc.datoMoto = new Moto();
		oc.datoPersona = new Persona();
		oc.datosServicios = [];
		oc.estado = "";
    	oc.listaOrdenes = JSON.parse(JSON.stringify(oc.optionsOrdenes)).filter(a=> a.moto.name.includes(oc.filter));
    	//return true
    },
    getRows:async()=>{
		
		 await gestion(Orden.url(),{ params: { opcion: 21} })
        .then(response=>{
           oc.optionsOrdenes = response;
           oc.listaOrdenes = JSON.parse(JSON.stringify(response));
           //console.log(response);
		})
        .catch(e=>{
            oc.notificacion.type = true;
            oc.notificacion.icon = "error";
            oc.notificacion.msg = e;
        });
	},

	cancelOrden:()=>{
		console.log(oc.dato)
	},

	//selectOrden:{name:"",id:0,description:"000000"},
	optionsOrdenes: [],

	selectedOrden:(newVal)=>{
		
		if(newVal.length == 0){
			oc.dato = {id:0,name:""};
			oc.estado = "No Registra";
			oc.datoMoto = new Moto();
			oc.datoPersona = new Persona();
			oc.datoTecnico = new Persona();
			oc.datosServicios = [];
			oc.exOrden = true;
		}else{
			//console.log(newVal[0])
			oc.dato = newVal[0];
			oc.estado = newVal[0].estado;
			oc.datoMoto = newVal[0].moto;
			oc.datoPersona = newVal[0].persona;
			oc.datoTecnico = newVal[0].tecnico;
			oc.datosServicios = newVal[0].servicios;
			
			oc.s1 = JSON.parse(newVal[0].solicitados).s1;
			oc.s2 = JSON.parse(newVal[0].solicitados).s2;
			oc.s3 = JSON.parse(newVal[0].solicitados).s3;
			oc.s4 = JSON.parse(newVal[0].solicitados).s4;
			oc.s5 = JSON.parse(newVal[0].solicitados).s5;
			
			oc.r1 = JSON.parse(newVal[0].realizados).r1;
			oc.r2 = JSON.parse(newVal[0].realizados).r2;
			oc.r3 = JSON.parse(newVal[0].realizados).r3;
			oc.r4 = JSON.parse(newVal[0].realizados).r4;
			oc.r5 = JSON.parse(newVal[0].realizados).r5;
			
			oc.exOrden = false;
		}
	},
	
	selectedOrden2:(val)=>{
		
		oc.dato = val;
		oc.estado = val.estado == 0 ? "Iniciada" : val.estado == 1 ? "Finalizada" : "Cancelada";
		oc.datoMoto = val.moto;
		oc.datoPersona = val.persona;
		oc.datosServicios = val.servicios;
		//oc.filter = "";
		
		oc.s1 = JSON.parse(val.solicitados).s1;
		oc.s2 = JSON.parse(val.solicitados).s2;
		oc.s3 = JSON.parse(val.solicitados).s3;
		oc.s4 = JSON.parse(val.solicitados).s4;
		oc.s5 = JSON.parse(val.solicitados).s5;

		oc.r1 = JSON.parse(val.realizados).r1;
		oc.r2 = JSON.parse(val.realizados).r2;
		oc.r3 = JSON.parse(val.realizados).r3;
		oc.r4 = JSON.parse(val.realizados).r4;
		oc.r5 = JSON.parse(val.realizados).r5;

	},


	init: async ()=>{
		
		//oc.selectOrden = {name:"",id:0,description:"000000"};
		oc.selectOrden = [];
		oc.optionsOrdenes = [];
		oc.datoMoto = new Moto();
		oc.datoPersona = new Persona();
		oc.datoTecnico = new Persona();
		oc.datosServicios = [];
		oc.estado = "";
		oc.filter = "";
		oc.listaOrdenes  = [];
		oc.filterorden = "";
		oc.select = [];
		oc.exOrden = true;
		oc.s1 = "";
	   oc.s2 = "";
	   oc.s3 = "";
	   oc.s4 = "";
	   oc.s5 = "";

      oc.r1 = "";
      oc.r2 = "";
      oc.r3 = "";
      oc.r4 = "";
      oc.r5 = "";

		oc.getRows();
	}

})