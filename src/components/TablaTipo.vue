<template>
    <div class="q-pa-md">

        <q-table v-if="tipo.accion.value == -1 && !tipo.modalTabla" flat bordered title="Referencias" :rows="tipo.rows" :columns="tipo.columns"
            row-key="name" :filter="tipo.filter" class="tabla"  :rows-per-page-options="rppo">

            <template v-slot:top-right>
                <q-input color="black" autofocus dense debounce="300" v-model="tipo.filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon :name="tipo.filter == '' ? 'search' : 'close'" @click="tipo.filter = ''"
                            class="cursor-pointer" />
                    </template>
                </q-input>
            </template>

            <template v-slot:header="props">

                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                    <q-th auto-width/>
                    <q-th auto-width>
                        <q-btn size="md" color="primary" round dense @click="tipo.openModal(0)" icon="add" />
                    </q-th>
                </q-tr>

            </template>

            <template v-slot:body="props">

                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                    <q-td auto-width>
                        <q-btn size="md" color="dark" round dense @click="tipo.openTabla(props.row.id)"
                            icon="build" />
                    </q-td>
                    <q-td auto-width>
                        <q-btn size="md" color="negative" round dense @click="tipo.openModal(props.row.id)" icon="edit" />
                    </q-td>
                </q-tr>

            </template>

        </q-table>

         <!--Formulario Referencias-->

        <q-card class="my-card q-pb-md" style="width:30%;margin-left:35%;margin-top:5%"
            v-if="tipo.accion.value !== -1 && !tipo.modalTabla">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">{{ tipo.accion.label }} Referencia</div>
            </q-card-section>

            <q-card-section>
                <q-input autofocus stack-label color="black" bottom-slots mask="XXXXXXXXXXXXXXX" v-model.trim="tipo.dato.name" label="Referencia" counter maxlength="15">

                    <template v-slot:append>
                        <q-icon :name="tipo.dato.name == '' ? '' : 'close'" @click="tipo.dato.name = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 15 caracteres
                    </template>
                </q-input>

            </q-card-section>

            <q-card-section>
                <q-select label="Marcas" color="black" v-model="tipo.selectMarca" :options="tipo.optionsMarca" option-value="id"
                    option-label="name" @update:model-value="tipo.selectedMarca" />
            </q-card-section>

            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="tipo.closeModal">Cancelar</q-btn>
                <q-btn color="primary" @click="tipo.crud" :disabled="tipo.disabled()" style="width:90px">{{
                    tipo.accion.label }}</q-btn>
            </q-card-actions>
        </q-card>


        <!--Tabla Mantenimiento-->

        <q-card class="my-card q-pb-md" style="width:60%;margin-left:20%;margin-top:1%" v-if="tipo.modalTabla && !tipo.modalEditTabla">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Tabla Mantenimiento  {{tipo.dato.name}}</div>
            </q-card-section>


            <q-table flat bordered   :rows="tipo.optionsTabla" :columns="tipo.columnsTabla"
                row-key="name" :filter="tipo.filter" :rows-per-page-options="rppo">
                <template v-slot:top-right>
                    <q-input color="black" autofocus style="width:300px;"  dense debounce="300"  v-model="tipo.filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon :name="tipo.filter == '' ? 'search' : 'close'" @click="tipo.filter = ''"
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
                        <q-th auto-width />
                    </q-tr>

                </template>

                <template v-slot:body="props">

                    <q-tr :props="props">
                        <q-td v-for="col in props.cols" :key="col.name" :props="props">
                            {{ col.value }}
                        </q-td>
                        <q-td auto-width>
                            <q-checkbox dense :true-value="trueValue" :false-value="falseValue" v-model="props.row.medible"
                                color="secondary" disable />
                        </q-td>
                        <q-td auto-width>
                            <q-btn size="md" v-if="props.row.medible == 1" color="negative" round dense @click="tipo.openModalEditTabla(props.row.id)" icon="edit" />
                        </q-td>
                    </q-tr>

                </template>

            </q-table>

            <q-card-actions align="right" class="q-pr-md">
                <!--<q-btn color="negative" @click="tipo.closeModalTabla">Cancelar</q-btn>-->
                <q-btn color="primary" @click="tipo.closeModalTabla" style="width:90px">Cerrar</q-btn>
            </q-card-actions>
        </q-card>

         <!--Formulario Tabla -->


         <q-card class="my-card q-pb-md" style="width:60%;margin-left:20%;margin-top:1%" v-if="tipo.modalEditTabla">

            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Editar Tabla Mantenimiento {{tipo.datoTabla.name}} de Referencia {{tipo.dato.name}}</div>
            </q-card-section>

            <q-card-section class="row">

               <q-checkbox  class="col-4" :label="tipo.datoTabla.name" :true-value="trueValue" :false-value="falseValue" v-model="tipo.datoTabla.medible" color="secondary" disable />

               <div class="col-2"></div>

               <q-input bottom-slots color="black" mask="######" stack-label autofocus v-model="tipo.datoTabla.km" label="Kilometraje" counter maxlength="6" class="col-4">

                    <template v-slot:append>
                        <q-icon :name="tipo.datoTabla.km == '' ? '' : 'close'" @click="tipo.datoTabla.km = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 6 caracteres
                    </template>
                </q-input>

            </q-card-section>


            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="tipo.closeModalEditTabla">Cancelar</q-btn>
                <q-btn color="primary" @click="tipo.editTabla" :disabled="tipo.datoTabla.km == ''" style="width:90px">Editar</q-btn>
            </q-card-actions>
         </q-card>


        <!--Dialogo-->

        <q-dialog v-model="tipo.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ tipo.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="tipo.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { tipo } from "../models/tipo.js"

export default defineComponent({
    name: 'TipoPage',
    data() {
        return {
            tipo,
            rppo: [7],
            trueValue:1,
            falseValue:0
        }
    },
    beforeMount() {
        tipo.init();
        tipo.filter = "";
    }
})
</script>

<style scoped >

.tabla{
    width:50%;
    margin-left:25%;
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
