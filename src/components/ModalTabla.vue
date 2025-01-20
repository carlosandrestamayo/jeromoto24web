
<template>  
	
	<q-card-section class="bg-primary text-white">
        <div class="text-h6">Proximos Servicios Motocicleta con Placa {{moto.dato.name}}</div>
        <div  id="tablamarcaId" >Kilometraje Promedio {{moto.dato.kmpromedio}} km/dia</div>
    </q-card-section>
    
    <q-card-section  class="row" v-if="moto.listaTabla.length > 0" style="height:400px;overflow-y: scroll;">
        <q-list style="width:80%;margin:0 10%" padding bordered class="" >
            <q-item v-for="dato in moto.listaTabla" bordered>
                   
                <q-item-section>
                    <q-item-label class="text-bold">{{dato.name}}  Realizar cada {{dato.tablaKm}} kms</q-item-label>
                    <q-item-label>** Proximo Servicio a los {{parseInt(dato.orden.km)+parseInt(dato.tablaKm)}} kms</q-item-label>
                    
                    <q-item-label>** Ultimo Servicio a los {{dato.orden.km}} kms el {{dato.orden.fechasalida}} en la orden de servicio #{{dato.orden.name}}</q-item-label>
                    <q-item-label v-if="dato.tablaKm == 0 || dato.kmpromedio == 0">**No se puede calcular Tabla de  mantenimiento 0 kms o Km Promedio igual a 0 km/dia</q-item-label>
                    <q-item-label v-else>**Proximo Servicio estimado a la fecha {{dato.fechaestimada}}
                        </q-item-label>

                    <q-item-label caption>Realizar cada {{dato.tablaKm}} kms</q-item-label>
                    
                </q-item-section>
            </q-item>
        </q-list>
    </q-card-section>

    <div class="q-px-lg q-mt-lg flex flex-center" v-if="moto.listaTabla.length == 0">
        <h3 class="text-center">No se Encontraron Resultados</h3>
    </div>

</template>


<script>
import { defineComponent } from 'vue';
import { moto } from "../models/moto.js";
export default defineComponent({
    name: 'PersonaPage',
    data() {
        return {
            moto,
            columns,
            rows:[],
            rppo: [0]
        }
    }
})

const columns=[
    {
        name: 'name',
        required: true,
        label: 'Servicio Taller',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`
    },
    //{ name: 'id', align: 'left', label: 'Id', field: 'id', sortable: false },
    { name: 'proximo', align: 'left', label: 'Proximo Servicio (kms)', field: row=> row.proximo },
    { name: 'ultimo', align: 'left', label: 'Ultimo Servicio (kms)', field:'ultimo' },
    { name: 'frecuencia', align: 'left', label: 'Realizar ', field: 'frecuencia'}
    
]


</script>