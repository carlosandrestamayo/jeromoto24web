<template>
    
    <div class="q-pa-md"> 

        <q-table v-if="st.accion.value == -1" flat bordered title="Servicios Taller" :rows="st.rows"
            :columns="st.columns" row-key="name" :filter="st.filter" style=""
            :rows-per-page-options="rppo" class="tabla" >

            <template v-slot:top-right>
                <q-input color="black" autofocus dense debounce="300" style="width:350px;" v-model="st.filter"
                    placeholder="Search">

                    <template v-slot:append>
                        <q-icon :name="st.filter == '' ? 'search' : 'close'" @click="st.filter = ''"
                            class="cursor-pointer" />
                    </template>
                </q-input>
            </template>

            <template v-slot:header="props">

                <q-tr :props="props">
                    <q-th auto-whidt v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                    <q-th auto-whidt>Medible</q-th>
                    <q-th auto-width>
                        <q-btn size="md" color="primary" round dense @click="st.openModal(0)" icon="add" />
                    </q-th>
                </q-tr>

            </template>

            <template v-slot:body="props">

                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                    <q-td auto-width>
                        <q-checkbox :true-value="trueValue" :false-value="falseValue" v-model="props.row.medible" color="dark" disable/>
                    </q-td>
                    <q-td auto-width>
                        <q-btn size="md" color="negative" round dense @click="st.openModal(props.row.id)" icon="edit" />
                    </q-td>
                </q-tr>

            </template>

        </q-table>

        <q-card class="my-card q-pb-md" style="" v-else>

            <q-card-section class="bg-primary text-white">
                <div class="text-h6">{{ st.accion.label }} Servicio Taller</div>
            </q-card-section>

            <q-card-section>  

                <q-input bottom-slots stack-label color="black" v-model="st.dato.name" autofocus label="*Servicio Taller" counter maxlength="40">
                    <template v-slot:append>
                        <q-icon :name="st.dato.name == '' ? '' : 'close'" @click="st.dato.name = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 40 caracteres
                    </template>
                </q-input>
                
            </q-card-section>
            
            <q-card-section class ="row">
                <q-checkbox class="" :true-value="trueValue" :false-value="falseValue" left-label label="Servicio Taller Medible" v-model="st.dato.medible" color="dark" />
            </q-card-section>

            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="st.closeModal">Cancelar</q-btn>
                <q-btn color="primary" @click="st.crud" :disabled="st.disabled()" style="width:90px">{{
                    st.accion.label }}</q-btn>
            </q-card-actions>
        </q-card>

        <q-dialog v-model="st.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ st.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="st.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { servicioTaller as st } from "../models/servicioTaller.js";

export default defineComponent({
    name: 'ServicioTallerPage',
    data() {
        return {
            st,
            rppo: [7],
            trueValue: 1,
            falseValue:0
        }
    },
    beforeMount() {
        st.init();
        st.filter = "";
    }


})
</script>

<style scoped >

.tabla{
    width:55%;
    margin-left:22%;
    margin-top: 1%;
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