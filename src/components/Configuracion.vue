<template>
	<div class="q-pa-md">
		<q-card v-if="cfg.accion.value == -1" class="my-card q-pb-md" style="width:50%;margin-left:25%;margin-top:1%">
			<q-card-section class="bg-primary text-white">
                <div class="text-h6">Configuracion</div>
            </q-card-section>

            <div class="q-pa-md" style="max-width:80%;margin-left:10%;">
             <q-list bordered separator style="">
                
                <q-item >
                    <q-item-section>
                        <q-item-label overline>Razon Social</q-item-label>
                        <q-item-label >{{cfg.dato.razonsocial}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Actividad</q-item-label>
                        <q-item-label>{{cfg.dato.actividad}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Telefono</q-item-label>
                        <q-item-label>{{cfg.dato.telefono}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Telefono 2</q-item-label>
                        <q-item-label>{{cfg.dato.telefono2}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Direccion</q-item-label>
                        <q-item-label>{{cfg.dato.direccion}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Ciudad</q-item-label>
                        <q-item-label>{{cfg.dato.ciudad}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Correo</q-item-label>
                        <q-item-label>{{cfg.dato.correo}}</q-item-label>
                    </q-item-section>
                </q-item>

            </q-list>
        </div>

        <!--<q-card-section class="row q-ml-lg">
        	<q-input readonly color="black" class="col-5" v-model.trim="cfg.dato.razonsocial" label="Razon Social" />
        	<div class="col-1"></div>
        	<q-input readonly color="black" class="col-5" v-model.trim="cfg.dato.actividad" label="Actividad" />
            
           
        </q-card-section>

        <q-card-section class="row q-ml-lg">
            <q-input readonly color="black" class="col-5" v-model.trim="cfg.dato.telefono" label="Telefono" />
            <div class="col-1"></div>
            <q-input readonly color="black" class="col-5" v-model.trim="cfg.dato.telefono2" label="Telefono2" />
        </q-card-section>        

        <q-card-section class="row q-ml-lg">
        	<q-input readonly color="black" class="col-5" v-model.trim="cfg.dato.direccion" label="Direccion" />
        	<div class="col-1"></div>
        	<q-input readonly color="black" class="col-5" v-model.trim="cfg.dato.ciudad" label="Ciudad" />
        </q-card-section>

        <q-card-section class="row q-ml-lg">
            <q-input readonly color="black" class="col-11" v-model.trim="cfg.dato.correo" label="Correo" />
        </q-card-section>-->
		

		<!--<q-card-section class="row">
                <q-input autofocus  color="black" class="col-4" bottom-slots v-model.trim="cfg.dato.razonsocial" label="Razon Social" counter
                    maxlength="12">

                    <template v-slot:append>
                        <q-icon :name="cfg.dato.razonsocial == '' ? '' : 'close'" @click="cfg.dato.razonsocial = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 12 caracteres
                    </template>
                </q-input>
                <div class="col-1"></div>
                <q-input class="col-7"  color="black" bottom-slots v-model.trim="cfg.dato.direccion" label="Direccion" counter
                    maxlength="50">

                    <template v-slot:append>
                        <q-icon :name="cfg.dato.direccion == '' ? '' : 'close'" @click="cfg.dato.direccion = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 50 caracteres
                    </template>
                </q-input>
            </q-card-section>-->
        	<q-card-actions align="right" class="q-pr-md">
                <!--<q-btn color="negative" @click="persona.closeModal">Cancelar</q-btn>-->
                <q-btn color="primary" @click="cfg.openModal"  style="width:90px">Editar</q-btn>
            </q-card-actions>    	


        </q-card>

        <q-card class="q-pb-md" style="width:60%;margin-left:20%;margin-top:1%" v-else>
            
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Editar</div>
            </q-card-section>
            
            <q-card-section class="row q-ml-lg q-py-xs">
              <q-input bottom-slots stack-label v-model.trim="cfg.datoEdit.razonsocial" autofocus label="Razon Social" counter maxlength="50" color="black" class="col-5">
                    <template v-slot:append>
                        <q-icon :name="cfg.datoEdit.razonsocial == '' ? '' : 'close'" @click="cfg.datoEdit.razonsocial = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 50 caracteres
                    </template>
                </q-input>
                <div class="col-1"></div>
                <q-input bottom-slots stack-label v-model.trim="cfg.datoEdit.actividad"  label="Actividad" counter maxlength="50" color="black" class="col-5">
                    <template v-slot:append>
                        <q-icon :name="cfg.datoEdit.actividad == '' ? '' : 'close'" @click="cfg.datoEdit.actividad = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 50 caracteres
                    </template>
                </q-input>
            </q-card-section>

             <q-card-section class="row q-ml-lg q-py-xs">
              <q-input bottom-slots stack-label unmasked-value mask="###-###-####" v-model.trim="cfg.datoEdit.telefono"  label="Telefono" counter maxlength="12" color="black" class="col-5">
                    <template v-slot:append>
                        <q-icon :name="cfg.dato.telefono == '' ? '' : 'close'" @click="cfg.datoEdit.telefono = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 10 caracteres
                    </template>
                </q-input>
                <div class="col-1"></div>
                <q-input bottom-slots stack-label v-model.trim="cfg.datoEdit.telefono2"  label="Telefono 2" counter maxlength="12" unmasked-value mask="###-###-####" color="black" class="col-5">
                    <template v-slot:append>
                        <q-icon :name="cfg.datoEdit.telefono2 == '' ? '' : 'close'" @click="cfg.datoEdit.telefono2 = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 10 caracteres
                    </template>
                </q-input>
            </q-card-section>

             <q-card-section class="row q-ml-lg q-py-xs">
              <q-input bottom-slots stack-label v-model.trim="cfg.datoEdit.ciudad"  label="Ciudad" counter maxlength="50" color="black" class="col-5">
                    <template v-slot:append>
                        <q-icon :name="cfg.datoEdit.ciudad == '' ? '' : 'close'" @click="cfg.datoEdit.ciudad = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 50 caracteres
                    </template>
                </q-input>
                <div class="col-1"></div>
                <q-input bottom-slots stack-label v-model.trim="cfg.datoEdit.direccion"  label="Direccion" counter maxlength="50" color="black" class="col-5">
                    <template v-slot:append>
                        <q-icon :name="cfg.datoEdit.direccion == '' ? '' : 'close'" @click="cfg.datoEdit.direccion = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 50 caracteres
                    </template>
                </q-input>
            </q-card-section>

             <q-card-section class="row q-ml-lg q-py-xs">
              <q-input bottom-slots stack-label v-model.trim="cfg.datoEdit.correo" label="Correo" counter maxlength="100" color="black" class="col-11">
                    <template v-slot:append>
                        <q-icon :name="cfg.datoEdit.correo == '' ? '' : 'close'" @click="cfg.datoEdit.correo = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 100 caracteres
                    </template>
                </q-input>
                
            </q-card-section>

            <q-card-actions align="right" class="q-pr-md q-ma-lg">
                <q-btn color="negative" @click="cfg.closeModal">Cancelar</q-btn>
                <q-btn color="primary" @click="cfg.editar" :disabled="cfg.disabled()" style="width:90px">Aceptar</q-btn>
            </q-card-actions>   
    

        </q-card>



	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { cfg } from "../models/configuracion.js"

export default defineComponent({
    name: 'ConfiguracionPage',
    data() {
        return {
        	cfg
	    }
    },
    beforeMount() {
        cfg.init();
        //persona.init();
        //persona.filter = "";
    }
})
</script>