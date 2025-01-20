<template>
    <q-card class="q-pb-md" style="margin-top:4%;min-height:600px;" id="ordenfinId">
        <div class="q-px-lg q-mb-lg" v-if="of.rowsOrdenes.length > 0">
            <q-expansion-item  icon="" v-model="of.exOrden" class="" label="Ordenes de Servicio">
                <q-table flat bordered title="Ordenes Iniciadas" dense :rows="of.rowsOrdenes" :columns="columnsOrdenes" row-key="name" selection="single" v-model:selected="of.selectOrden"
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
                    
                    <q-input v-model="of.s1" counter maxlength="60"  readonly outlined  stack-label label="Solicitud 1" color="black" class="q-mb-xs" />
                    <q-input v-model="of.s2" counter maxlength="60"  readonly outlined  stack-label label="Solicitud 2" color="black" class="q-mb-xs" />
                    <q-input v-model="of.s3" counter maxlength="60"  readonly outlined  stack-label label="Solicitud 3" color="black" class="q-mb-xs" />
                    <q-input v-model="of.s4" counter maxlength="60" readonly outlined  stack-label label="Solicitud 4" color="black" class="q-mb-xs" />
                    <q-input v-model="of.s5" counter maxlength="60"  readonly outlined  stack-label label="Solicitud 5" color="black" class="q-mb-xs" />
                    </q-expansion-item>
                 
                 <q-expansion-item expand-separator icon="" v-model="ex2" class="col-6 q-px-lg " label="Realizados">
                    <q-input v-model="of.r1" counter maxlength="60" outlined  stack-label label="Respuesta 1" color="black" class="q-mb-xs" />
                    <q-input v-model="of.r2" counter maxlength="60" outlined  stack-label label="Respuesta 2" color="black" class="q-mb-xs" />
                    <q-input v-model="of.r3" counter maxlength="60" outlined  stack-label label="Respuesta 3" color="black" class="q-mb-xs" />
                    <q-input v-model="of.r4" counter maxlength="60" outlined  stack-label label="Respuesta 4" color="black" class="q-mb-xs" />
                    <q-input v-model="of.r5" counter maxlength="60" outlined  stack-label label="Respuesta 5" color="black" class="q-mb-xs" />
                </q-expansion-item>
  
             </div>

            <!-- <div class="row q-mt-md" style="" v-if="of.selectOrden.length > 0">  
                <q-uploader
                    style=""
                    url="http://localhost:4444/upload"
                    label="Restricted to images"
                    multiple
                    accept=".jpg, image/*"
                    @removed="removeFotos"
                    @added="addFotos"
                    class="q-mx-lg"
                />
            </div>
        
            <q-btn label="Mostrar" @click="cargar" color="primary" />

            <div class="q-ma-md">
                <img :src="src" v-for="src in listaFotos" width="300" height="300" alt="No Hya Foto" />
            </div>-->    

            <q-card-actions align="right" v-if="of.selectOrden.length > 0" class="q-mr-md q-mt-md">
                <!--<q-btn color="negative"  @click="of.cancelarOrden" style="width:90px">Cancelar</q-btn>
                <q-btn color="orange"  @click="of.imprimirOrden" style="width:90px">Imprimir</q-btn>-->
                <q-btn color="primary"  @click="of.finalizarOrden" style="width:90px">Finalizar</q-btn>
            </q-card-actions>   
            


            <div class="q-px-lg q-mt-lg flex flex-center" v-if="of.rowsOrdenes.length == 0">
                <h3 class="text-center">No hay Ordenes Inicadas</h3>
            </div>

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
            rppo: [10],
            columns,
            columnsOrden,
            columnsOrdenes,
            columnsMoto,
            trueValue: 1,
            falseValue:0,
            listaFotos:[],
            listaFiles:[]
        }
    }, 
    methods: {
        addFotos(files){
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                this.listaFiles.push(file);
                reader.onloadend =(e)=>{
                    this.listaFotos.push(e.target.result);
                    of.listaFotos.push(e.target.result);
                }
                reader.readAsDataURL(file);                   
            }
        },
        removeFotos(files){
            const file = files[0];
            this.listaFiles = this.listaFiles.filter(f=> file.__key !== f.__key);
            this.listaFotos = [];
            of.listaFotos   = [];
            for (let i = 0; i < this.listaFiles.length; i++) {
                const file = this.listaFiles[i];
                const reader = new FileReader();
                
                reader.onloadend =(e)=>{
                    this.listaFotos.push(e.target.result);
                    of.listaFotos.push(e.target.value);
                }
                reader.readAsDataURL(file);                   
            } 
        },
        cargar(){
            console.log("cargar");
            let arr = [];  

            for (let i = 0; i < this.listaFotos.length; i++) {
                const file = this.listaFotos[i];
                const reader = new FileReader();

                reader.onloadend = ()=>{
                    console.log(reader.result);
                }    

                reader.readAsDataURL(file);
            
                //this.listaFotos.push(files[i]);                     
            }    

        }

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
        { name: 'placa', align: 'left', label: 'placa', field:row=> row.moto.name },
        { name: 'propietario', align: 'left', label: 'Propietario', field:row=> row.persona.nombre},
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