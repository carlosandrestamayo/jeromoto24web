<template>
    <q-card class="q-pb-md" style="margin-top:4%;min-height:700px;">
		<div class="q-px-lg q-mb-lg">
            <q-expansion-item  icon="" v-model="of.exOrden" class="" label="Ordenes de Servicio">
                <q-table flat bordered title="Ordenes Iniciadas" dense :rows="of.rowsOrdenes" :columns="columnsOrden" row-key="name" selection="single" v-model:selected="of.selectOrden"
                    @update:selected="of.selectedOrden"  :filter="of.filter" :rows-per-page-options="rppo">
                    <template v-slot:top-right>
                        <q-input style="width:400px;" color="black" autofocus dense debounce="300" v-model="of.filter" placeholder="Search">
                            <template v-slot:append>
                                <q-icon :name="of.filter == '' ? 'search' : 'close'" @click="of.filter = ''" class="cursor-pointer" />
                            </template>
                        </q-input>
                    </template>  
                </q-table>
            </q-expansion-item>
        </div> 
        
         <div class="q-px-lg q-mb-lg" v-if="of.selectOrden.length > 0">
            <q-table flat bordered title="Orden" dense :rows="of.selectOrden" :columns="columnsOrden" row-key="name" :rows-per-page-options="rppo" />
            <q-table flat bordered title="Motocicleta" dense :rows="of.selectOrden" :columns="columnsMoto" row-key="name" :rows-per-page-options="rppo" />
        </div>

        <div class="row " style="" v-if="of.selectOrden.length > 0">
            <!--Servicios Solicitados-->
            <q-expansion-item  icon="" v-model="ex" class="col-6 q-px-lg" label="Servicios Solicitados">
                    <q-table  flat bordered title="" :rows-per-page-options="rppo" row-key="id" class="col-6" :rows="of.listaServiciosSolicitados" :columns="columns" dense>

                        <template v-slot:header="props">

                            <q-tr :props="props">
                                <q-th auto-whidt></q-th>
                                <q-th auto-whidt v-for="col in props.cols" :key="col.name" :props="props">
                                    {{ col.label }}
                                </q-th>
                            </q-tr>

                        </template>
 
                        <template v-slot:body="props">

                            <q-tr :props="props">
                                <q-td auto-width>
                                    <q-checkbox dense :true-value="trueValue" :false-value="falseValue" v-model="props.row.solicitado" color="dark" disable/>
                                </q-td>
                                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                                    {{ col.value }}
                                </q-td>
                                
                            </q-tr>

                        </template>
                    </q-table>
                </q-expansion-item>
                
                <q-expansion-item  icon="" v-model="ex" class="col-6 q-px-lg"
                    label="Servicios Realizados">
                    <q-table class="col-6" flat bordered dense title="" :rows="of.listaServiciosRealizados" 
                        :columns="columns" :rows-per-page-options="rppo" row-key="id" selection="multiple"
                        v-model:selected="of.selectedServiciosRealizados" />
                </q-expansion-item>
            
            </div>

            <div class="row " style="" v-if="of.selectOrden.length > 0">  

                 <q-expansion-item  icon="" v-model="ex2" class="col-6 q-px-lg" label="Solicitudes">
                    
                    <q-input v-model="of.s1"  readonly outlined  stack-label label="Solicitud 1" color="black" class="q-mb-xs" />
                    <q-input v-model="of.s2"  readonly outlined  stack-label label="Solicitud 2" color="black" class="q-mb-xs" />
                    <q-input v-model="of.s3"  readonly outlined  stack-label label="Solicitud 3" color="black" class="q-mb-xs" />
                    <q-input v-model="of.s4"  readonly outlined  stack-label label="Solicitud 4" color="black" class="q-mb-xs" />
                    <q-input v-model="of.s5"  readonly outlined  stack-label label="Solicitud 5" color="black" class="q-mb-xs" />
                    </q-expansion-item>
                 
                 <q-expansion-item expand-separator icon="" v-model="ex2" class="col-6 q-px-lg " label="Realizados">
                    <q-input v-model="of.r1" outlined  stack-label label="Respuesta 1" color="black" class="q-mb-xs" />
                    <q-input v-model="of.r2" outlined  stack-label label="Respuesta 2" color="black" class="q-mb-xs" />
                    <q-input v-model="of.r3" outlined  stack-label label="Respuesta 3" color="black" class="q-mb-xs" />
                    <q-input v-model="of.r4" outlined  stack-label label="Respuesta 4" color="black" class="q-mb-xs" />
                    <q-input v-model="of.r5" outlined  stack-label label="Respuesta 5" color="black" class="q-mb-xs" />
                </q-expansion-item>
  
             </div>

              <q-card-actions align="right" v-if="of.selectOrden.length > 0" class="q-mr-md q-mt-md">
                <q-btn color="negative"  @click="of.cancelarOrden" style="width:90px">Cancelar</q-btn>
                <q-btn color="primary"  @click="of.finalizarOrden" style="width:90px">Finalizar</q-btn>
            </q-card-actions>   
    
    </q-card>    
    
     <!--Dialogo-->

        <q-dialog v-model="of.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ of.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="of.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>
                    
        
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { ordenFin as of } from "../models/ordenFin.js";


export default defineComponent({
    name: 'MarcaPage',
    data() {
        return {
            of,
            ex: true,
            ex2: true,
            rppo: [0],
            columns,
            columnsOrden,
            columnsMoto,
            trueValue: 1,
            falseValue:0
        }
    },
    methods: {
        
    },
    beforeMount() {
        of.init();
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

 const columnsOrden = [
        {
            name: 'name',
            required: true,
            label: 'Orden #',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: null
        },
        { name: 'fechaentrada', align: 'left', label: 'Fecha Entrada', field:'fechaentrada'},
        { name: 'fechasalida', align: 'left', label: 'Fecha Entrada', field:'fechasalida'},
        { name: 'km', align: 'left', label: 'Kilometraje', field:'km'},
        { name: 'estado', align: 'left', label: 'Estado', field:'estado'},
        { name: 'Tecnico', align: 'left', label: 'Tecnico', field:row=> row.tecnico.nombre}

    ]

    const columnsMoto = [
        {
            name: 'name',
            required: true,
            label: 'Placa',
            align: 'left',
            field: row => row.moto.name,
            format: val => `${val}`,
            sortable: null
        },
        { name: 'tipo', align: 'left', label: 'Tipo aceite', field:row=> row.moto.tipoaceite},
        { name: 'tipo', align: 'left', label: 'Referencia', field:row=> row.tipo.name},
        { name: 'marca', align: 'left', label: 'Marca', field:row=> row.marca.name},
        { name: 'propietario', align: 'left', label: 'Propietario', field:row=> row.persona.nombre}
    ]

</script>