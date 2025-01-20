import axios from 'axios'
import { ServicioTaller } from "../clases/servicioTaller.js";
import { Orden } from "../clases/orden.js";

export function setDb(config) {
    const { listaName, key, keySort } = config
    if (localStorage[listaName] == undefined) {
        localStorage[listaName] = JSON.stringify(new Array(0))
    }
    return JSON.parse(localStorage[listaName]).sort((a, b) => {
        return a[keySort] < b[keySort] ? -1 : 1
    })
}

export function setDb2(config) {

    const { listaName, key, keySort } = config
    console.log({ listaName })
    //console.log(sessionStorage[listaName])
    if (sessionStorage[listaName] == undefined) {
        console.log(listaName)
        sessionStorage[listaName] = JSON.stringify(new Array(0))
    }
    //console.log(sessionStorage[listaName])
    return JSON.parse(sessionStorage[listaName]).sort((a, b) => {
        return a[keySort] < b[keySort] ? -1 : 1
    })
}
//console.log(axios)

export function historialServicios(row){

    return new Promise((resolve,reject)=>{


    gestion(Orden.url(), { params: {  opcion: 20, motoId:row.id } }).then(datos => {
        //console.log(datos)
        gestion(ServicioTaller.url(),{params:{opcion:1}})
            .then(response=>{

                let listaServiciosTaller = response;
                let arrServicios = [];
                let arrOrdenes = [];
                let obj = {name:"",ordenes:[]}
                for(let j = 0; j < listaServiciosTaller.length;j++){
                    let st = listaServiciosTaller[j];
                    arrOrdenes = [];
                    obj = {name:"",ordenes:[]}
                    for (let i = 0; i < datos.length; i++) {

                        let val = datos[i].servicios.filter(s=> s.servicioTallerId == st.id && s.realizado == 1);

                        if(val.length > 0){
                            arrOrdenes.push({orden:datos[i].name,fecha:datos[i].fechasalida,km:datos[i].km,name:st.name})
                        }

                    }
                    if(arrOrdenes.length > 0){
                        obj.name = st.name
                        obj.ordenes = arrOrdenes;
                        arrServicios.push(obj)
                    }
                }

                resolve(arrServicios);
            })
        })
    })

}


export function gestion(url, params) {
    return new Promise((resolve, reject) => {
      console.log(url)
        axios.get(url, params)
            .then(response => {
                //console.log(response)
                if(!response.data.error){
                    //console.log(response)
                    resolve(response.data.datos);
                }else{
                    reject(response.data.msg);
                }
            }).catch(e=>{
                //console.log(e.message)
                reject(e.message)
            })
    })
}

export function db(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                //console.log(response)
                if(!response.data.error){
                    //console.log(response)
                    resolve(response.data.datos);
                }else{
                    reject(response.data.msg);
                }
            }).catch(e=>{
                //console.log(e.message)
                reject(e.message)
            })
    })
}


export function ValidateEmails(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    //alert("correo ok")
    return (true)
  }
    //alert("You have entered an invalid email address!")
    return (false)
}

export function ValidateEmail(mail){
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
}
