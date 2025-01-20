<template>
    <div class="q-pa-md">
        
        <q-table v-if="persona.accion.value == -1 && !persona.modalMotos " flat bordered title="Personas"    
            :rows="persona.rows" :columns="persona.columns" row-key="name" :filter="persona.filter" 
            :rows-per-page-options="rppo" style="margin-top: 1%;" >

            <template v-slot:top-right>
                <q-input color="black" autofocus style="width:400px;" dense debounce="300" v-model="persona.filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon :name="persona.filter == '' ? 'search' : 'close'" @click="persona.filter = ''"
                            class="cursor-pointer" />
                    </template>
                </q-input>
            </template>

            <template v-slot:header="props">

                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                    <!--<q-th auto-whidt>Administrador</q-th>
                    <q-th auto-whidt>Secretaria</q-th>-->
                    <q-th auto-whidt>Tecnico</q-th>
                    <q-th auto-whidt/>
                    <q-th auto-width>
                        <q-btn size="md" color="primary" round dense @click="persona.openModal(0)" icon="add" />
                    </q-th>
                </q-tr>

            </template>

            <template v-slot:body="props">

                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                     <!--<q-td auto-width>
                        <q-checkbox :true-value="trueValue" :false-value="falseValue" v-model="props.row.arrRoles[1]" color="dark" disable/>
                    </q-td>
                    <q-td auto-width>
                        <q-checkbox :true-value="trueValue" :false-value="falseValue" v-model="props.row.arrRoles[2]" color="dark" disable/>
                    </q-td>-->
                   <q-td auto-width>
                        <q-checkbox :true-value="trueValue" :false-value="falseValue" 
                            v-model="props.row.rol" color="dark" disable/>
                    </q-td>
                     <q-td auto-width>
                        <q-btn size="md" color="dark" round dense @click="persona.openModalMotos(props.row)" icon="motorcycle" />
                    </q-td>
                    <q-td auto-width>
                        <q-btn size="md" color="negative" round dense @click="persona.openModal(props.row)" icon="edit" />
                    </q-td>
                </q-tr>

            </template>

        </q-table>
        <!--Formulario Moto-->
        <q-card class="q-pb-md" v-if="persona.accion.value !== -1 && !persona.modalMotos" style="width:60%;margin-left:20%;margin-top:1%" >
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">{{ persona.accion.label }} Persona </div>
                <!--<div>{{persona.dato}}</div>-->
            </q-card-section>

            <q-card-section class="row">
                <q-input autofocus  color="black" class="col-4" bottom-slots v-model.trim="persona.dato.name" label="*Nit" stack-label counter
                    maxlength="2">

                    <template v-slot:append>
                        <q-icon :name="persona.dato.name == '' ? '' : 'close'" @click="persona.dato.name = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 12 caracteres
                    </template>
                </q-input>
                <div class="col-1"></div>
                <q-input class="col-7"  color="black" bottom-slots v-model.trim="persona.dato.nombre" label="*Nombre" counter maxlength="50" stack-label>

                    <template v-slot:append>
                        <q-icon :name="persona.dato.nombre == '' ? '' : 'close'" @click="persona.dato.nombre = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 50 caracteres
                    </template>
                </q-input>
            </q-card-section>

            <q-card-section class="row">
                <q-input class="col-4" color="black" unmasked-value mask="###-###-####" bottom-slots v-model="persona.dato.telefono" label="Telefono 1" stack-label counter maxlength="12">

                    <template v-slot:append>
                        <q-icon :name="persona.dato.telefono == '' ? '' : 'close'" @click="persona.dato.telefono = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 10 caracteres
                    </template>
                </q-input>
                <div class="col-1"></div>
                <q-input class="col-7" stack-label color="black" bottom-slots v-model.trim="persona.dato.direccion" label="Direccion" counter
                    maxlength="30">

                    <template v-slot:append>
                        <q-icon :name="persona.dato.direccion == '' ? '' : 'close'" @click="persona.dato.direccion = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 30 caracteres
                    </template>
                </q-input>
            </q-card-section>

            <q-card-section class="row">  

                 <q-input stack-label class="col-4" color="black" unmasked-value mask="###-###-####" bottom-slots v-model="persona.dato.telefono2" label="Telefono 2"
                    counter maxlength="12">

                    <template v-slot:append>
                        <q-icon :name="persona.dato.telefono2 == '' ? '' : 'close'" @click="persona.dato.telefono2 = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 10 caracteres
                    </template>
                </q-input>

                 <div class="col-1"></div>

                <q-input class="col-7" color="black" bottom-slots v-model.trim="persona.dato.correo" label="Correo" counter maxlength="60" stack-label>

                    <template v-slot:append v-if="!persona.disabled()">
                        <!--<q-icon :name="persona.dato.correo == '' ? '' : 'close'" @click="persona.dato.correo = ''"
                            class="cursor-pointer" />-->
                        <q-icon  name="email" @click="persona.createCorreo" class="cursor-pointer" />   
                    </template>

                    <template v-slot:hint>
                        Maximo 60 caracteres
                    </template>
                </q-input>
            </q-card-section>

            <q-card-section class ="row">
                <!--<q-checkbox class="" size="md" :true-value="trueValue" :false-value="falseValue" left-label label="Administrador" v-model="persona.dato.arrRoles[1]" color="dark" />
                <q-checkbox class="" size="md" :true-value="trueValue" :false-value="falseValue" left-label label="Secretaria" v-model="persona.dato.arrRoles[2]" color="dark" />-->
                <q-checkbox class="" size="md" :true-value="trueValue" :false-value="falseValue" left-label label="Tecnico" v-model="persona.dato.rol" color="dark" />

            </q-card-section>

            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="persona.closeModal">Cancelar</q-btn>
                <q-btn color="primary" @click="persona.crud" :disabled="persona.disabled()" style="width:90px">{{
                    persona.accion.label }}</q-btn>
            </q-card-actions>
        </q-card>

         

        <!--Ver Motos-->
        <q-card class="my-card q-pb-md" style="width:80%;margin-left:10%;margin-top:1%"
            v-if="persona.modalMotos">
                <modal-moto ></modal-moto>
                <q-card-actions align="right" class="q-pr-md">
                   <q-btn color="primary"  @click="persona.closeModalMotos" style="width:90px">Ok</q-btn>
            </q-card-actions>
        </q-card>  

        <!--Notificacion-->
        <q-dialog v-model="persona.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ persona.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="persona.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>
    
</template>
  
<script>
import { defineComponent } from 'vue'
import { persona } from "../models/persona.js";
import ModalMoto from "./ModalMoto.vue";

export default defineComponent({
    name: 'PersonaPage',
    components:{ ModalMoto },
    data() {
        return {
            persona,
            rppo: [7],
            trueValue: 1,
            falseValue:0

        }
    },
    beforeMount() {
        persona.init();
        persona.filter = "";
    }
})
</script>