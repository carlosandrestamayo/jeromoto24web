<template>
    <div class="q-pa-xs" style="margin-top:1%;">
        <q-tabs v-model="tab" class="bg-white row ">
            <q-tab name="nueva" label="Nueva Orden" class="col-3" />
            <q-tab name="fin" label="Finalizar Orden" class="col-3" />
            <q-tab name="ver" label="Ver Ordenes" class="col-3" />
            <q-tab name="cancelar" label="Cancelar Orden" class="col-3" />
        </q-tabs>
        <div style="">
            <orden-nueva v-if="tab=='nueva'"></orden-nueva>
            <orden-fin v-if="tab=='fin'"></orden-fin>
            <orden-ver v-if="tab=='ver'"></orden-ver>
            <orden-cancelar v-if="tab=='cancelar'"></orden-cancelar>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import OrdenNueva from "./OrdenNueva.vue";
import OrdenFin from "./OrdenFin.vue";
import OrdenVer from "./OrdenVer.vue";
import OrdenCancelar from "./Cancelar.vue";

import { orden } from "../models/orden.js";

export default defineComponent({
    name: 'OrdenPage',
    components: { OrdenNueva,OrdenFin,OrdenVer, OrdenCancelar },
    data() {
        return {
            tab: 'nueva',
            orden
        }
    },
    beforeMount() {
        //store.filter = "";
        //orden.init();
    }


})

</script>