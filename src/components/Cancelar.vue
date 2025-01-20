<template>
	
	<q-card class="q-pb-md" style="margin-top:4%;">
		<div class="q-px-lg q-mb-lg" v-if="oc.rowsOrdenes.length > 0">
            <q-expansion-item  icon="" v-model="oc.exOrden" class="" label="Ordenes de Servicio">
                <q-table flat bordered title="Ordenes" dense :rows="oc.rowsOrdenes" :columns="columnsOrdenes" row-key="name" selection="single" v-model:selected="oc.selectOrden" 
                    class="my-sticky-header-table"
                    @update:selected="oc.selectedOrden"  :filter="oc.filter" :rows-per-page-options="rppo">
                    <template v-slot:top-right>
                        <q-input style="width:400px;" color="black" autofocus dense debounce="300" v-model="oc.filter" placeholder="Search">
                            <template v-slot:append>
                                <q-icon :name="oc.filter == '' ? 'search' : 'close'" @click="oc.filter = ''" class="cursor-pointer" />
                            </template>
                        </q-input>
                    </template>   
                </q-table>
            </q-expansion-item>
        </div>   

        <div class="q-px-lg q-mb-lg" v-if="oc.selectOrden.length > 0">
            <q-table flat bordered title="Orden" dense :rows="oc.selectOrden" :columns="columnsOrden" row-key="name" :rows-per-page-options="rppo" />
            <q-table flat bordered title="Motocicleta" dense :rows="oc.selectOrden" :columns="columnsMoto" row-key="name" :rows-per-page-options="rppo" />
        </div>

        <div class="row " style="" v-if="oc.selectOrden.length > 0">
                <!--Servicios Solicitados-->
            <q-expansion-item  icon="" v-model="ex" class="col-6 q-px-lg" label="Servicios Solicitados">
                    <q-table  flat bordered title="" :rows-per-page-options="rppo" row-key="id" class="col-6" :rows="oc.datosServicios" :columns="columns" dense>

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
                    <q-table  flat bordered title="" :rows-per-page-options="rppo" row-key="id" class="col-6" :rows="oc.datosServicios" :columns="columns" dense>

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
                                    <q-checkbox dense :true-value="trueValue" :false-value="falseValue" v-model="props.row.realizado" color="dark" disable/>
                                </q-td>
                                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                                    {{ col.value }}
                                </q-td>
                                
                            </q-tr>

                        </template>
                    </q-table>
                </q-expansion-item>

            </div>

             
            <div class="row " style="" v-if="oc.selectOrden.length > 0" >     
                <q-expansion-item  icon="" v-model="ex2" class="col-6 q-px-lg" label="Solicitudes">
                    
                    <q-input v-model="oc.s1"  readonly outlined  stack-label label="Solicitud 1" color="black" class="q-mb-xs" />
                    <q-input v-model="oc.s2"  readonly outlined  stack-label label="Solicitud 2" color="black" class="q-mb-xs" />
                    <q-input v-model="oc.s3"  readonly outlined  stack-label label="Solicitud 3" color="black" class="q-mb-xs" />
                    <q-input v-model="oc.s4"  readonly outlined  stack-label label="Solicitud 4" color="black" class="q-mb-xs" />
                    <q-input v-model="oc.s5"  readonly outlined  stack-label label="Solicitud 5" color="black" class="q-mb-xs" />
                    </q-expansion-item>
                 
                 <q-expansion-item expand-separator icon="" v-model="ex2" class="col-6 q-px-lg " label="Realizados">
                    <q-input v-model="oc.r1" readonly outlined  stack-label label="Respuesta 1" color="black" class="q-mb-xs" />
                    <q-input v-model="oc.r2" readonly outlined  stack-label label="Respuesta 2" color="black" class="q-mb-xs" />
                    <q-input v-model="oc.r3" readonly outlined  stack-label label="Respuesta 3" color="black" class="q-mb-xs" />
                    <q-input v-model="oc.r4" readonly outlined  stack-label label="Respuesta 4" color="black" class="q-mb-xs" />
                    <q-input v-model="oc.r5" readonly outlined  stack-label label="Respuesta 5" color="black" class="q-mb-xs" />
                </q-expansion-item>

             </div>

            <q-card-actions align="right" v-if="oc.selectOrden.length > 0" class="q-mr-md q-mt-md">
                <q-btn color="negative"  @click="oc.cancelarOrden" style="width:90px">Cancelar</q-btn>
                <!--<q-btn color="primary"  @click="oc.finalizarOrden" style="width:90px">Finalizar</q-btn>-->
            </q-card-actions>   

             <div class="q-px-lg q-mt-lg flex flex-center" v-if="oc.rowsOrdenes.length == 0">
                <h3 class="text-center">No se Encontraron Resultados</h3>
            </div>

            <div class="q-px-lg q-mt-lg flex flex-center" v-if="oc.selectOrden.length == 0 && oc.rowsOrdenes.length > 0">
                <h3 class="text-center">Seleccione una Orden de Servicio</h3>
            </div>
    </q-card>

        <!--Dialogo-->
        <q-dialog v-model="oc.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ oc.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="oc.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>

    <q-dialog v-model="oc.modalCancelar">
        <q-card>
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Desea Cancelar la Orden #{{oc.dato.name}}</div>
            </q-card-section>
            <q-card-actions align="right" class="q-pr-md q-mt-lg q-mb-md">
                    <q-btn color="negative" @click="oc.confirmarCancel(false)">Cancelar</q-btn>
                    <q-btn color="primary" @click="oc.confirmarCancel(true)"  style="width:90px">Confirmar</q-btn>
                </q-card-actions>
        </q-card>

    </q-dialog>

</template>

<script >
	import { defineComponent } from 'vue';
	import { ref } from 'vue';  
	import { ov as oc } from "../models/cancelar.js";
	export default defineComponent({
   		name: 'VerOrdenaPage',
    	data() {
    		return{
    			oc,
    			ex: true,
            	ex2: true,
            	rppo: [0],
            	columns,
                columnsOrden,
                columnsMoto,
                columnsOrdenes,
            	trueValue: 1,
            	falseValue:0
    		}
    	},
    	beforeMount() {
        	oc.init();
        },
    	methods:{

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
        { name: 'fechasalida', align: 'left', label: 'Fecha Salida', field:'fechasalida'},
        { name: 'km', align: 'left', label: 'Kilometraje', field:'km'},
        { name: 'estado', align: 'left', label: 'Estado', field:'estado'},
        { name: 'Tecnico', align: 'left', label: 'Tecnico', field:row=> row.tecnico.nombre}

    ]

    const columnsOrdenes = [
        {
            name: 'name',
            required: true,
            label: 'Orden #',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: null
        },
        { name: 'placa', align: 'left', label: 'Placa', field:row=> row.moto.name},
        { name: 'persona', align: 'left', label: 'Propietario', field:row=> row.persona.nombre},
        { name: 'fechaentrada', align: 'left', label: 'Fecha Entrada', field:'fechaentrada'},
        { name: 'fechasalida', align: 'left', label: 'Fecha Salida', field:'fechasalida'},
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

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    z-index: 1000
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>