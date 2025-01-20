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
                <q-tabs
			      v-model="tab"
			      dense
			      class="text-white"
			      active-color="white"
			      indicator-color="white"
			      align="justify"
			      narrow-indicator
			    >
				  <q-tab name="marcas" label="Mails" />
				  <q-tab name="tipos" label="Alarms" />
				  <q-tab name="movies" label="Movies" />
        		</q-tabs>
                <!--<q-tabs v-model="tab" align="right">
                    <q-tab name="configuraciones" v-if="false" icon="settings"></q-tab>
                    <q-tab name="marcas" label="Marcas"></q-tab>
                    <q-tab name="tipos" label="Referencias"></q-tab>
                    <q-tab name="personas" label="Personas"></q-tab>
                    <q-tab name="motos" label="Motos"></q-tab>
                    <q-tab name="serviciosTaller" label="Servicios Taller"></q-tab>
                    <q-tab name="ordenes" v-if="true" label="Orden Servicio"></q-tab>
                </q-tabs>
                <q-btn dense flat round icon="logout" @click="closeSesion" />-->
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

             <q-tab-panels v-model="tab" animated>
          		<q-tab-panel name="marcas">
            		<tabla-marca></tabla-marca>
          		</q-tab-panel>

	          	<q-tab-panel name="tipos">
	            	<tabla-tipo></tabla-tipo>
	          	</q-tab-panel>
            </q-tab-panels>
        </q-page-container>

    </q-layout>
    <q-layout view="hHh lpR fFf" v-else>
        <q-page-container>
            
            <q-card class="my-card q-pb-md" style="width:30%;margin-left:35%;margin-top:5%">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h4">Login</div>
                    <div class="text-subtitle2">Jeromotos 24</div>
                </q-card-section>

                <q-card-section>
                    <q-input bottom-slots v-model="user" autofocus label="User" counter maxlength="15">

                        <template v-slot:append>
                            <q-icon :name="user == '' ? '' : 'close'" @click="user = ''" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            Maximo 15 caracteres
                        </template>
                    </q-input>
                    <q-input v-model="password" :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                    </q-input>

                </q-card-section>

                <q-card-actions align="right" class="q-pr-md">
                    <q-btn color="primary" style="width:90px" @click="logear">Logear</q-btn>
                </q-card-actions>
            </q-card>

        </q-page-container>
    </q-layout>
</template>
  
<script>

import TablaMarca from "../components/TablaMarca.vue";
import TablaTipo from "../components/TablaTipo.vue";
import TablaPersona from "../components/TablaPersona.vue";
import TablaMoto from "../components/TablaMoto.vue";
import TablaServicioTaller from "../components/TablaServicioTaller.vue";
import Configuracion from "../components/Configuracion.vue"
import Orden from "../components/Orden.vue";
//import Moto from "../components/Moto.vue"

import { cfg } from "../models/configuracion.js"

import { ref } from 'vue'

export default {
    components: { TablaMarca, TablaTipo, TablaPersona, TablaMoto, TablaServicioTaller,Orden,Configuracion},
    setup() {
        
        return {
            login: ref(true),
            password: ref(""), 
            isPwd: ref(true),
            user: ref(""),
            tab: ref('marcas'),
            cfg
        }
    },
    beforeMount() {
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
        },
        logear() {
            const obj = JSON.parse(sessionStorage["user"]);
            if(this.user == obj.admin || this.password == obj.pwd){
                this.login = true;  
            }
            this.login = true;
        }
    }
}
</script>