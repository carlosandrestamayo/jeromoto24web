<template>
    <div class="q-pa-md">
        
        <q-table v-if="marca.accion.value == -1" flat bordered title="Marcas" :rows="marca.rows" :columns="marca.columns"
            row-key="name" :filter="marca.filter" style="" class="tabla" :rows-per-page-options="rppo">

            <template v-slot:top-right>
                <q-input color="black" dense debounce="300" autofocus v-model="marca.filter" placeholder="Search">

                    <template v-slot:append>
                        <q-icon :name="marca.filter == '' ? 'search' : 'close'" @click="marca.filter = ''"
                            class="cursor-pointer" />
                    </template>
                </q-input>
            </template>

            <template v-slot:header="props">

                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                    <q-th auto-width>
                        <q-btn size="md" color="primary" round dense @click="marca.openModal(0)" icon="add" />
                    </q-th>
                </q-tr>

            </template>

            <template v-slot:body="props">

                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                    <q-td auto-width>
                        <q-btn size="md" color="negative" round dense @click="marca.openModal(props.row.id)" icon="edit" />
                    </q-td>
                </q-tr>

            </template>


        </q-table>

        <!--Formulario Marca -->    
        <q-card class="my-card q-pb-md" style="" v-else>

            <q-card-section class="bg-primary text-white">
                <div class="text-h6">{{ marca.accion.label }} Marca</div>
            </q-card-section>

            <q-card-section>

                <q-input bottom-slots stack-label v-model.trim="marca.dato.name" autofocus label="Marca" counter maxlength="15" color="black">
                    <template v-slot:append>
                        <q-icon :name="marca.dato.name == '' ? '' : 'close'" @click="marca.dato.name = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 15 caracteres
                    </template>
                </q-input>

            </q-card-section>

            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="marca.closeModal">Cancelar</q-btn>
                <q-btn color="primary" @click="marca.crud" :disabled="marca.disabled()" style="width:90px">{{marca.accion.label }}</q-btn>
            </q-card-actions>
        </q-card>

        <q-dialog v-model="marca.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ marca.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="marca.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { marca } from "../models/marca.js";

export default defineComponent({
    name: 'MarcaPage',
    data() {
        return {
            marca,
            rppo: [7]
        }
    },
    beforeMount() {
        marca.init();
        marca.filter = "";
    }
})
</script>

<style >

.tabla{
    width:50%;
    margin-left:25%;
}

.my-card{
    width:30%;
    margin-left:35%;
    margin-top:5%
}

@media only screen and (max-width: 390px) {
    .tabla {
        width:100%;
        margin-left:0%;
    }

    .my-card{
        width:100%;
        margin-left:0%;
        margin-top:5%
    }
}

</style>