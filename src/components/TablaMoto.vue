  <template>
    
    <div class="q-pa-md">  
            
        <q-table v-if="moto.accion.value == -1 && !moto.modalViewPersona && !moto.modalViewTabla &&  
         !moto.modalViewOrdenes" flat bordered title="Motocicletas" :rows="moto.rows" :columns="moto.columns" dense
            row-key="name" :filter="moto.filter" :rows-per-page-options="rppo" 
            style="width:98%;margin-left:1%;margin-top:1%" >

            <template v-slot:top-right>
                <q-input  style="width:400px;" autofocus color="black" dense debounce="300" v-model="moto.filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon :name="moto.filter == '' ? 'search' : 'close'" @click="moto.filter = ''" class="cursor-pointer" />
                    </template>
                </q-input>
            </template>

            <template v-slot:header="props">

                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                    <q-th auto-width/>
                    <q-th auto-width/>
                    <q-th auto-width/>
                    <q-th auto-width>
                        <q-btn size="md" color="primary" round dense @click="moto.openModal(0)" icon="add" />
                    </q-th>
                </q-tr>

            </template>

            <template v-slot:body="props">

                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                     <q-td auto-width>
                        <q-btn size="md" color="orange" round dense @click="moto.openModalViewOrdenes(props.row)" icon="save" />
                    </q-td>
                    <q-td auto-width>
                        <q-btn size="md" color="dark" round dense @click="moto.openModalViewContador(props.row)" icon="build" />
                    </q-td> 
                    <q-td auto-width>
                        <q-btn size="md" color="dark" round dense @click="moto.openModalViewPersona(props.row.id)" icon="person" />
                    </q-td>    
                    <q-td auto-width>
                        <q-btn size="md" color="negative" round dense @click="moto.openModal(props.row)" icon="edit" />
                    </q-td>
                </q-tr>  

            </template>

        </q-table>

        <!--Ver Persona-->
        <q-card class=" q-pb-md" style="width:50%;margin-left:25%;margin-top:1%"
            v-if="moto.modalViewPersona">
                <modal-persona :persona="moto.persona" ></modal-persona>
                <q-card-actions align="right" class="q-pr-md">
                    <!--<q-btn color="negative" @click="moto.closeModalPersona">Cancelar</q-btn>-->
                   <q-btn color="primary"  @click="moto.closeModalViewPersona"
                    style="width:90px">Ok</q-btn>
            </q-card-actions>
        </q-card>        

        <!--Ver Tabla--> 
        <q-card class="q-pb-md" style="width:70%;margin-left:15%;margin-top:1%;"
            v-if="moto.modalViewTabla" >
                <!--<modal-tabla></modal-tabla>-->
                <gestion></gestion>  
                <q-card-actions align="right" class="q-pr-md" >
                    <q-btn color="negative" v-if="moto.listaTabla.length > 0" @click="moto.imprimirTabla" >Imprimir</q-btn>
                    <q-btn color="primary"  @click="moto.closeModalViewTabla" style="width:90px">Ok</q-btn>
                </q-card-actions>
        </q-card>        

        

        <!--Formulario Moto-->
        <q-card class="my-card q-pb-md" style="width:60%;margin-left:20%;margin-top:1%"
            v-if="moto.accion.value !== -1 && !moto.modalPersona ">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">{{ moto.accion.label }} Moto</div>
            </q-card-section>

            <q-card-section class="row">
                <q-input bottom-slots color="black" mask="AAA##A" stack-label autofocus v-model.trim="moto.dato.name" label="*Placa" counter maxlength="6" class="col-5">

                    <template v-slot:append>
                        <q-icon :name="moto.dato.name == '' ? '' : 'close'" @click="moto.dato.name = ''"
                            class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Maximo 6 caracteres
                    </template>
                </q-input>
                
               

                <div class="col-1"></div>

                <q-select label="*Referencias" color="black" v-model="moto.selectTipo" :options="moto.optionsTipo" option-value="id" option-label="name" @update:model-value="moto.selectedTipo" class="col-6" />

                </q-card-section>

                <q-card-section class="row">
                    <q-input bottom-slots stack-label color="black" v-model.trim="moto.dato.color" label="      Color" counter maxlength="12" class="col-5">

                        <template v-slot:append>
                            <q-icon :name="moto.dato.color == '' ? '' : 'close'" @click="moto.dato.color = ''" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            Maximo 12 caracteres
                        </template>
                    </q-input>
                    
                    <div class="col-1"></div>
                    
                    <q-input bottom-slots stack-label color="black" v-model="moto.dato.tipoaceite" label="      Tipo Aceite" counter maxlength="12" class="col-6">

                        <template v-slot:append>
                            <q-icon :name="moto.dato.tipoaceite == '' ? '' : 'close'" @click="moto.dato.tipoaceite = ''" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            Maximo 12 caracteres
                        </template>
                    </q-input>

                </q-card-section>

                <q-card-section>
                

                    <q-input bottom-slots stack-label color="black" v-model="moto.persona.nombre" label="*Propietario" readonly>

                        <template v-slot:append>
                            <q-icon name="search" @click="moto.openModalPersona" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            {{ moto.persona.name }}
                        </template>
                    </q-input>

                </q-card-section>

                <q-card-actions align="right" class="q-pr-md">
                    <q-btn color="negative" @click="moto.closeModal">Cancelar</q-btn>
                    <q-btn color="primary" @click="moto.crud" :disabled="moto.disabled()" 
                    style="width:90px">{{moto.accion.label }}</q-btn>
                </q-card-actions>
        </q-card>

        <!--Buscar Persona-->

        <q-card class="my-card q-pb-md" style="width:60%;margin-left:20%;margin-top:1%" v-if="moto.modalPersona">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Buscar Persona</div>
            </q-card-section>
            
            <q-card-section class="row">
                <q-input class="col-6" dense :hint="moto.personaComputed().name" bottom-slots v-model="moto.personaComputed().nombre" label="Persona" readonly />
            </q-card-section>
            
            <q-table flat bordered title="Personas" dense :rows="moto.optionsPersona" :columns="moto.columnsPersona"
                row-key="name" selection="single" v-model:selected="moto.selectPersona"
                @update:selected="moto.selectedPersona" :filter="moto.filterPersona" :rows-per-page-options="rppop">
                <template v-slot:top-right>
                    <q-input style="width:400px;" color="black" autofocus dense debounce="300" v-model="moto.filterPersona"
                        placeholder="Search">
                        <template v-slot:append>
                            <q-icon :name="moto.filterPersona == '' ? 'search' : 'close'" @click="moto.filterPersona = ''"
                                class="cursor-pointer" />
                        </template>
                    </q-input>
                </template>
            </q-table>

            <q-card-actions align="right" class="q-pr-md">
                <q-btn color="negative" @click="moto.closeModalPersona">Cancelar</q-btn>
                <q-btn color="primary" :disabled="moto.disabledPersona()" @click="moto.editPersona"
                    style="width:90px">Ok</q-btn>
            </q-card-actions>
        </q-card>

        <!--Dialogo Orden Moto-->

        <div style="background:#58585c;" v-if="moto.modalViewOrdenes">
            <orden-moto :dato="moto.dato"></orden-moto>
        </div>

        <!--Dialogo-->

        <q-dialog v-model="moto.notificacion.type">
            <q-card style="width:500px;">
                <q-card-section class="row items-center ">
                    <div class="text-h6">{{ moto.notificacion.msg }}</div>
                    <q-space />
                    <q-btn :icon="moto.notificacion.icon" flat round dense v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>
    
</template>
  
<script>
import { defineComponent } from 'vue';
import ModalPersona from '../components/ModalPersona.vue';
import ModalTabla from '../components/ModalTabla.vue';
import OrdenMoto from '../components/OrdenMoto.vue';
import Gestion from "../components/Gestion.vue"
import { moto } from "../models/moto.js";
export default defineComponent({
    name: 'MotoPage',
    components:{ModalPersona,ModalTabla,OrdenMoto,Gestion},
    data() {
        return {
            moto,
            rppo: [7],
            rppop: [5]
        }
    },
    beforeMount() {
        moto.init();
        moto.filter = "";
    }
})
</script>