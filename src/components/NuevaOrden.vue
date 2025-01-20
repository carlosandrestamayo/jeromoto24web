<template>
    <div class="q-pa-xs"> 
       
        <q-card class=" q-pb-md" v-if="!orden.modalMoto" style="margin-top:1%">
            
            <div class="row q-px-md q-mx-md" v-if="orden.datoMoto.id == 0">
                <q-input class="col-2" v-model="orden.datoMoto.name" bottom-slots placeholder="Buscar Motocicleta" label="Placa" readonly>

                    <template v-slot:append>
                        <q-icon name="search" @click="orden.openModalMoto" class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Buscar Motocicleta
                    </template>
                </q-input>
                
            </div>

            <div class="q-px-lg q-mb-lg" v-if="orden.datoMoto.id != 0">

                <q-table flat bordered title="Motocicleta" dense :rows="orden.selectMoto" :columns="columnsMoto" row-key="name" :rows-per-page-options="rppo" :filter="orden.datoMoto.name" >
                    
                    <template v-slot:top-right>
                        <q-input color="black" bottom-slots autofocus  style="width:350px;" 
                        v-model="orden.datoMoto.name" class="q-mb-md" label="Placa" readonly  placeholder="Search">
                            <template v-slot:append>
                                <q-icon name="search" @click="orden.openModalMoto" class="cursor-pointer" />
                            </template>
                            <template v-slot:hint>
                                Buscar Motocicleta
                            </template>
                        </q-input>
                    </template>

                </q-table>
            </div>

            <q-card class="q-ma-md">
                <div class="row">
                    <q-input color="black" mask="######" stack-label autofocus v-model="orden.dato.km" 
                            label="*Kilometraje"   class="col-2 q-px-md" v-if="orden.datoMoto.id > 0" />

                    <q-input color="black" stack-label readonly v-model="orden.ultimoKm" 
                        label="Ultimo Kilometraje" class="col-2 q-px-md" v-if="orden.datoMoto.id > 0" />
            
                    <q-input v-model="orden.dato.fechaentrega"  type="date" stack-label label="*Fecha de Entrega" class="col-2 q-px-md" v-if="orden.datoMoto.id > 0" />

                    <q-input v-model="orden.dato.horaentrega" @update:model-value="orden.changeHoraEntrega"         stack-label label="*Hora de entrega" type="time" class="col-2 q-px-md" 
                        v-if="orden.datoMoto.id > 0"  />  

                    <q-select label="*Tecnico" color="black" v-model="orden.selectTecnico" :options="orden.optionsTecnico"  @update:model-value="orden.selectedTecnico" class="col-4 q-px-md" 
                            v-if="orden.datoMoto.id > 0" >
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section>
                              <q-item-label>{{ scope.opt.label }}</q-item-label>
                              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>  
                </div>
            </q-card>
            
                        
            <!--Servicios-->
            <div class="row q-px-lg" style="" v-if="orden.datoMoto.id != 0">   
                
                <!--Servicios Solicitados-->
                <q-expansion-item  icon=""  v-model="ex" class="col-6"
                    label="Servicios Solicitados">
                    <q-table class="col-6" flat bordered dense title="" :rows="orden.listaServiciosTaller"
                        :columns="columns" :rows-per-page-options="rppo" row-key="id" selection="multiple"
                        v-model:selected="orden.selectServiciosTallerOrden" />
                </q-expansion-item>
                
                <!--Solicitudes-->    
                <q-expansion-item expand-separator icon="" v-model="ex" class="col-6 q-pl-md" label="   Solicitudes">
                    <q-card>
                        <q-input v-model="orden.s1" outlined  stack-label label="Solicitud 1" color="black" class="q-mb-xs" />
                        <q-input v-model="orden.s2" outlined stack-label label="Solicitud 2" color="black" class="q-mb-xs"/>
                        <q-input v-model="orden.s3"  outlined stack-label label="Solicitud 3" color="black" class="q-mb-xs" />
                        <q-input v-model="orden.s4" outlined stack-label label="Solicitud 4" color="black" class="q-mb-xs" />
                        <q-input v-model="orden.s5" outlined stack-label label="Solicitud 5" color="black" />
                    </q-card>
                </q-expansion-item>
                
            </div>

             
            <q-card-actions align="right" class="q-pr-md">
                <!--<q-btn color="negative" >Cancelar</q-btn>-->
                <q-btn color="primary"  @click="orden.createOrden" :disabled="orden.disabledMoto() || orden.dato.km <= 0 || orden.computedKm() || orden.dato.fechaentrega == '' || orden.dato.horaentrega == '' || orden.dato.tecnicoId == 0"
                    style="" class="q-mt-md">Crear Orden Servicio</q-btn>
            </q-card-actions>
        </q-card>

        <!--Buscar Motocicleta--> 
        <q-card v-if="orden.modalMoto" style="width:90%;margin-left:5%;">

            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Buscar Motocicleta</div>
            </q-card-section>
            
            <q-card-section class="row">
                <q-input class="col-6" dense :hint="orden.motoComputed().personaNombre" bottom-slots v-model=" orden.motoComputed().name" label="Placa" readonly />
            </q-card-section>

            <q-table  flat bordered title="Motocicletas" dense :rows="orden.listaMotos" :columns="moto.columns" row-key="name"
                    selection="single" v-model:selected="orden.selectMoto" @update:selected="orden.selectedMoto"    :filter="orden.filterMoto" :rows-per-page-options="rppop">
                <template v-slot:top-right>
                    <q-input  color="black" autofocus style="width:400px;" dense debounce="300" v-model="orden.filterMoto"
                        placeholder="Search">
                            <template v-slot:append>
                                <q-icon :name="orden.filterMoto == '' ? 'search' : 'close'" @click="orden.filterMoto = ''" class="cursor-pointer" />
                            </template>
                    </q-input>
                </template>
            </q-table>
            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="orden.closeModalMoto">Cancelar</q-btn>
                <q-btn color="primary"  @click="orden.editMoto" :disabled="orden.disabledMoto()"
                    style="width:90px">Ok</q-btn>
            </q-card-actions>
        </q-card>   

          <!--Dialogo-->

        <q-dialog v-model="orden.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ orden.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="orden.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>
    
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { orden } from "../models/ordenNueva.js";
import { moto } from "../models/moto.js";


export default defineComponent({
    name: 'MarcaPage',
    data() {
        return {
            orden,
            moto,
            rppop: [5],
            columns,
            columnsMoto,
            rppo: [0],
            ex: true
        }
    },
    beforeMount() {
        orden.init();
    }
})

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Servicio Taller',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: null
    }
]

const columnsMoto = [
        {
            name: 'name',
            required: true,
            label: 'Placa',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: null
        },
        { name: 'color', align: 'left', label: 'Color', field:row=> row.color},
        { name: 'tipoaceite', align: 'left', label: 'Tipo aceite', field:row=> row.tipoaceite},
        { name: 'tipo', align: 'left', label: 'Referencia', field:row=> row.tipo.name},
        { name: 'marca', align: 'left', label: 'Marca', field:row=> row.marca.name},
        { name: 'propietario', align: 'left', label: 'Propietario', field:row=> row.persona.nombre}
    ]

</script>