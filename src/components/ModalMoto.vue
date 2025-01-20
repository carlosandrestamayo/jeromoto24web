<template>
	<q-card-section class="bg-primary text-white">
        <div class="text-h6">{{persona.dato.nombre}}</div>
    </q-card-section>
    <q-card-section>
        <q-table title="Motocicletas" :columns="columns" :rows="persona.listaMotos" dense :rows-per-page-options="rppo" v-if="persona.listaMotos.length > 0" />
        <div class="q-px-lg q-mt-lg flex flex-center" v-else>
            <h3 class="text-center">No Registra Motocicletas</h3>
        </div>
    </q-card-section>
</template>

<script>
	
import { defineComponent } from 'vue'
import { persona } from "../models/persona.js";

export default defineComponent({
    name: 'PersonaPage',
    data() {
        return {
            columns,
            persona,
            rppo: [0], 
            rows:[]
        }
    },
    beforeMount() {
        
    }
})

const columns =[
            {
                name: 'name',
                required: true,
                label: 'Placa',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            },
            //{ name: 'id', align: 'left', label: 'Id', field: 'id', sortable: false },
            { name: 'color', align: 'left', label: 'Color', field: 'color'},
            { name: 'tipoaceite', align: 'left', label: 'Tipo Aceite', field: 'tipoaceite'},
            { name: 'revisionaceite', align: 'left', label: 'Revision Aceite', field: 'revisionaceite'},
            { name: 'kmpromedio', align: 'left', label: 'Km Promedio', field: 'kmpromedio'},
            { name: 'tipoName', align: 'left', label: 'Referencia', field: row=> row.tipo.name },
            { name: 'marcaName', align: 'left', label: 'Marca', field: row=> row.marca.name},
    ]
    

</script>