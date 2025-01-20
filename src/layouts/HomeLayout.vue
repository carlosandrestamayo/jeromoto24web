<template>
    <q-layout view="hHh lpR fFf" v-if="login">

        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Jeromotos 24
                </q-toolbar-title>
                <q-tabs v-model="tab" align="right">
                    <!--<q-tab name="configuraciones" v-if="true" icon="settings"></q-tab>
                    <q-tab name="marcas" label="Marcas"></q-tab>
                    <q-tab name="tipos" label="Referencias"></q-tab>
                    <q-tab name="personas" label="Personas"></q-tab>
                    <q-tab name="motos" label="Motos"></q-tab>
                    <q-tab name="serviciosTaller" label="Servicios Taller"></q-tab>
                    <q-tab name="ordenes" v-if="true" label="Orden Servicio"></q-tab>-->
                </q-tabs>
                <q-btn dense flat round icon="logout" @click="closeSesion" />
            </q-toolbar>
        </q-header>

        <q-page-container>

            <!--<tabla-marca v-if="tab == 'marcas'"></tabla-marca>
            <tabla-tipo v-if="tab == 'tipos'"></tabla-tipo>
            <tabla-persona v-if="tab == 'personas'"></tabla-persona>
            <tabla-moto v-if="tab == 'motos'"></tabla-moto>
            <tabla-servicio-taller v-if="tab == 'serviciosTaller'"></tabla-servicio-taller>
            <configuracion v-if="tab=='configuraciones'"></configuracion>
            <orden v-if="tab == 'ordenes'"></orden>-->

        </q-page-container>

    </q-layout>
    <q-layout  view="hHh lpR fFf" v-else>
        <q-page-container  class="q-ma-none">

            <div style="width:100%;max-height: 100vh;">
                <!--<img style="object-fit: cover;min-width: 100%;max-height: 100vh;position:absolute;" src="../../public/imagenes/login.jpg" >-->
                <div style="" class="box">
                    <h4 class="text-center text-white text-bold">Jeromotos 24</h4>

                    <div style="margin-top: 60px;">
                        <label class=" text-white" style="margin: 0px 10%;width:80%;">Usuario</label>
                        <input type="text" v-model="user" class="" style="margin: 5px 10%;width:80%;font-size:16px;padding:5px;">
                    </div>

                    <label class="text-white" style="margin: 0px 10%;width:80%;">Contraseña</label>
                    <input type="password" v-model="password" class="" style="margin: 5px 10%;width:80%;font-size:16px;padding:5px;">
                    <input type="button" @click="logear" class="btn" style="" value="Login" >
                </div>
            </div>

        </q-page-container>
    </q-layout>
</template>

<script>

/*import TablaMarca from "../components/TablaMarca.vue";
import TablaTipo from "../components/TablaTipo.vue";
import TablaPersona from "../components/TablaPersona.vue";
import TablaMoto from "../components/TablaMoto.vue";
import TablaServicioTaller from "../components/TablaServicioTaller.vue";
import Configuracion from "../components/Configuracion.vue"
import Orden from "../components/Orden.vue";
import Login from "../components/Login.vue";
import { cfg } from "../models/configuracion.js";*/
import { ref } from 'vue';

//import {app, database, auth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from "../models/firebase.js"

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



export default {
    //components: { TablaMarca, TablaTipo, TablaPersona, TablaMoto, TablaServicioTaller,Orden,Configuracion,Login},
    setup() {

        return {
            login: ref(true),
            password: ref(""),
            isPwd: ref(true),
            user: ref(""),
            tab: ref('marcas'),
            cfg,
            srcImg:ref(1)
        }
    },
    beforeMount() {
        this.srcImg = getRandomInt(3)
        sessionStorage["user"] = JSON.stringify({ admin: "admin", pwd: "admin", activo: false });
        this.login = false;
        cfg.init();
    },
    methods: {
        closeSesion() {
            this.login = false;
            this.tab = "marcas";
            this.user = "";
            this.password = "";
            //console.log(getRandomInt(3));
            //console.log(arrImg[getRandomInt(3)]);

        },
        logear() {
            const obj = JSON.parse(sessionStorage["user"]);
            if(this.user == obj.admin || this.password == obj.pwd){
                this.login = true;
            }
            this.login = true;
        },
        logears(){
            createUserWithEmailAndPassword(auth, "hola@hotmail.com", "12345678")
                .then((userCredential) => {
                // Signed in
                 const user = userCredential.user;
                 console.log(user)
    // ...
             })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
              });

        }
    }
}
</script>

<style >

.box{
        width: 400px;
        height: 100%;
        position:absolute;
        right:  0;
        background:rgba(0,0,0,0.8);
        z-index:    1000;
    }

.btn{
    background: red;
    padding: 5px;
    font-size: 18px;
    font-weight: bold;
    color:  white;
    border-radius:  5px;
    border:  1px solid black;
    margin:20px 10%;
    width:80%;
    cursor:pointer;
}


.tabla{
    width:50%;
    margin-left:25%;
    margin-top: 1%;
}

.my-card{
    width:30%;
    margin-left:35%;
    margin-top:5%
}

@media only screen and (max-width: 390px) {
    .tabla {
        width:100%;
        margin-left:0%;
    }

    .my-card{
        width:100%;
        margin-left:0%;
        margin-top:5%
    }
}

</style>
