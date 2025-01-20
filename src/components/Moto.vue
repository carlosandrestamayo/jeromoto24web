 <template>
    
    <div class="q-pa-md">
         {{mt.selectTipo}}   
        <q-table v-if="mt.accion.value == -1 && !mt.modalViewPersona && !mt.modalViewTabla" flat bordered title="Motocicletas" :rows="mt.rows" :columns="mt.columns"
            row-key="name" :filter="mt.filter" :rows-per-page-options="rppo" style="width:90%;margin-left:5%;">

            <template v-slot:top-right>
                <q-input  style="width:400px;" autofocus color="black" dense debounce="300" v-model="mt.filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon :name="mt.filter == '' ? 'search' : 'close'" @click="mt.filter = ''" class="cursor-pointer" />
                    </template>
                </q-input>
            </template>

            <template v-slot:header="props">

                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                    <q-th auto-width/>
                    <q-th auto-width/>
                    <q-th auto-width/>
                    <q-th auto-width>
                        <q-btn size="md" color="primary" round dense @click="mt.openModal(0)" icon="add" />
                    </q-th>
                </q-tr>

            </template>

            <template v-slot:body="props">

                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                     <q-td auto-width>
                        <q-btn size="md" color="blue" round dense @click="mt.openModalViewOrdenes(props.row.id)" icon="save" />
                    </q-td> 
                    <q-td auto-width>
                        <q-btn size="md" color="dark" round dense @click="mt.openModalViewContador(props.row.id)" icon="save" />
                    </q-td> 
                    <q-td auto-width>
                        <q-btn size="md" color="dark" round dense @click="mt.openModalViewPersona(props.row)" icon="person" />
                    </q-td>    
                    <q-td auto-width>
                        <q-btn size="md" color="negative" round dense @click="mt.openModal(props.row)" icon="edit" />
                    </q-td>
                </q-tr>

            </template>

        </q-table>

        <!--Ver Persona-->
        <q-card class="my-card q-pb-md" style="width:50%;margin-left:25%;margin-top:1%"
            v-if="mt.modalViewPersona">
                <modal-persona :persona="mt.persona" ></modal-persona>
                <q-card-actions align="right" class="q-pr-md">
                    <!--<q-btn color="negative" @click="mt.closeModalPersona">Cancelar</q-btn>-->
                   <q-btn color="primary"  @click="mt.closeModalViewPersona"
                    style="width:90px">Ok</q-btn>
            </q-card-actions>
        </q-card>        

        <!--Ver Tabla-->
        <q-card class="my-card q-pb-md" style="width:50%;margin-left:25%;margin-top:1%"
            v-if="mt.modalViewTabla">
                <modal-tabla :listaTabla="mt.listaTabla"></modal-tabla>
                <q-card-actions align="right" class="q-pr-md">
                    <!--<q-btn color="negative" @click="mt.closeModalPersona">Cancelar</q-btn>-->
                   <q-btn color="primary"  @click="mt.closeModalViewTabla"
                    style="width:90px">Ok</q-btn>
            </q-card-actions>
        </q-card>        

        

        <!--Formulario Moto-->
        <q-card class="my-card q-pb-md" style="width:60%;margin-left:20%;margin-top:1%"
            v-if="mt.accion.value !== -1 && !mt.modalPersona ">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">{{ mt.accion.label }} Moto</div>
                <p>{{mt.dato}}</p>
            </q-card-section>

            <q-card-section class="row">
                <q-input bottom-slots color="black" mask="AAA##A" stack-label autofocus v-model.trim="mt.dato.name" label="Placa" counter maxlength="6" class="col-3">

                    <template v-slot:append>
                        <q-icon :name="mt.dato.name == '' ? '' : 'close'" @click="mt.dato.name = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 6 caracteres
                    </template>
                </q-input>
                
                <div class="col-1"></div>
                
                <q-input bottom-slots stack-label color="black" v-model.trim="mt.dato.color" label="Color" counter maxlength="12" class="col-3">

                    <template v-slot:append>
                        <q-icon :name="mt.dato.color == '' ? '' : 'close'" @click="mt.dato.color = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 12 caracteres
                    </template>
                </q-input>

                <div class="col-1"></div>

                <q-select label="Referencias" color="black" v-model="mt.selectTipo" :options="mt.optionsTipo"  
                		@update:model-value="mt.selectedTipo" class="col-4" >
                	<template v-slot:option="scope">
				        <q-item v-bind="scope.itemProps">
				            <q-item-section>
				              <q-item-label>{{ scope.opt.label }}</q-item-label>
				              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
				            </q-item-section>
				        </q-item>
        			</template>
                </q-select>

                </q-card-section>

                <q-card-section>
                

                <q-input bottom-slots stack-label color="black" v-model="mt.persona.nombre" label="Propietario" readonly>

                    <template v-slot:append>
                        <q-icon name="search" @click="mt.openModalPersona" class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        {{ mt.persona.name }}
                    </template>
                </q-input>

            </q-card-section>

            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="mt.closeModal">Cancelar</q-btn>
                <q-btn color="primary" @click="mt.crud" :disabled="mt.disabled()" style="width:90px">{{
                    mt.accion.label }}</q-btn>
            </q-card-actions>
        </q-card>

        <!--Buscar Persona-->

        <q-card class="my-card q-pb-md" style="width:60%;margin-left:20%;margin-top:1%" v-if="mt.modalPersona">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Buscar Persona</div>
            </q-card-section>
            
            <q-card-section class="row">
                <q-input class="col-6" dense :hint="mt.personaComputed().name" bottom-slots v-model="mt.personaComputed().nombre" label="Persona" readonly />
            </q-card-section>
            
            <q-table flat bordered title="Personas" dense :rows="mt.optionsPersona" :columns="mt.columnsPersona"
                row-key="name" selection="single" v-model:selected="mt.selectPersona"
                @update:selected="mt.selectedPersona" :filter="mt.filterPersona" :rows-per-page-options="rppop">
                <template v-slot:top-right>
                    <q-input style="width:400px;" color="black" autofocus dense debounce="300" v-model="mt.filterPersona"
                        placeholder="Search">
                        <template v-slot:append>
                            <q-icon :name="mt.filterPersona == '' ? 'search' : 'close'" @click="mt.filterPersona = ''"
                                class="cursor-pointer" />
                        </template>
                    </q-input>
                </template>
            </q-table>

            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="mt.closeModalPersona">Cancelar</q-btn>
                <q-btn color="primary" :disabled="mt.disabledPersona()" @click="mt.editPersona"
                    style="width:90px">Ok</q-btn>
            </q-card-actions>
        </q-card>

        <!--Dialogo Orden Moto-->  

        <q-dialog style="background: #58585c;" v-model="mt.modalViewOrdenes">
            <orden-moto style="width:700px;"></orden-moto>
        </q-dialog>

        <!--Dialogo-->

        <q-dialog v-model="mt.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ mt.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="mt.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>
    
</template>
  
<script>
import { defineComponent } from 'vue';
import ModalPersona from '../components/ModalPersona.vue';
import ModalTabla from '../components/ModalTabla.vue';
import OrdenMoto from '../components/OrdenMoto.vue';
import { mt } from "../models/mt.js";
export default defineComponent({
    name: 'MotoPage',
    components:{ModalPersona,ModalTabla,OrdenMoto},
    data() {
        return {
            mt,
            rppo: [7],
            rppop: [5]
        }
    },
    beforeMount() {
        mt.init();
        mt.filter = "";
    }
})
</script>