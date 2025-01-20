 <template>
	
	<q-card class="q-pb-md" style="margin-top:4%;min-height:700px;">
		
        <div>
            <q-expansion-item  icon="" v-model="oc.exOrden" class="" label="Ordenes de Servicio">
                <q-table flat bordered title="Ordenes" dense :rows="oc.optionsOrdenes" :columns="columnsOrden"
                    row-key="name" selection="single" v-model:selected="oc.selectOrden"
                    @update:selected="oc.selected"  :filter="oc.filterOrden" :rows-per-page-options="rppo">
                    <template v-slot:top-right>
                        <q-input style="width:400px;" color="black" autofocus dense debounce="300" v-model="oc.filterOrden" placeholder="Search">
                            <template v-slot:append>
                                <q-icon :name="oc.filterOrden == '' ? 'search' : 'close'" @click="oc.filterOrden = ''" class="cursor-pointer" />
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

        <!--<div class="row q-px-lg q-mb-lg" v-if="oc.select.length > 0">
            <q-input class="col-2 q-mx-md" readonly v-model="oc.dato.name" stack-label label="Orden Servicio" />
            <q-input class="col-1 q-mx-md" readonly v-model="oc.estado" stack-label label="Estado" />
            <q-input class="col-1 q-mx-md" readonly v-model="oc.datoMoto.name" stack-label label="Motocicleta" />
            <q-input class="col-2 q-mx-md" readonly v-model="oc.datoPersona.nombre" stack-label label="Persona" />
            <q-input class="col-2 q-mx-md" readonly v-model="oc.datoTecnico.nombre" stack-label label="Tecnico" />

        </div>-->
        
        <!--<div class="row " style="" v-if="oc.selectOrden.id > 0 && oc.listaOrdenes.length > 0 || true "> -->  
            <div class="row " style="" v-if="oc.select.length > 0">
                <!--Servicios Solicitados-->
                <q-expansion-item  icon="" v-model="ex" class="col-6 q-px-lg"
                    label="Servicios Solicitados">
                    
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

             <!--<div class="row " style="" v-if="oc.selectOrden.id > 0 && oc.listaOrdenes.length > 0"> --> 
             <div class="row " style="" v-if="oc.select.length > 0" >     
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

              <q-card v-if="oc.listaOrdenes.length == 0">
              	<div> 
              		<h3 class="text-center">No se Encontraron Resultados</h3>
              	</div>
              </q-card>

            <q-card-actions v-if="oc.select.length > 0" align="right" class="q-ma-md ">
                <q-btn color="primary" style="width:130px" @click="oc.cancelOrden">Cancelar</q-btn>
            </q-card-actions>
    	
    </q-card>

   
	
</template>

<script >
	import { defineComponent } from 'vue';
	import { ref } from 'vue';
	import { oc } from "../models/ordenCancel.js";
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
            	trueValue: 1,
            	falseValue:0
    		}
    	},
    	beforeMount() {
        	oc.init();
        },
    	methods:{

    	},
    	computed:{
    		ver(){
    			oc.filterOrdenes();
    			return true
    		}
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
            label: 'Orden',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: null
        },
        { name: 'fechaentrada', align: 'left', label: 'Fecha Entrada', field:'fechaentrada'},
        { name: 'fechasalida', align: 'left', label: 'Fecha Entrada', field:'fechasalida'},
        { name: 'km', align: 'left', label: 'Kilometraje', field:'km'},
        { name: 'estado', align: 'left', label: 'Estado', field:'estado'},
        { name: 'placa', align: 'left', label: 'Placa', field:row=> row.moto.name},

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