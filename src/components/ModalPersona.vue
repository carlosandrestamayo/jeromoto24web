
<template>
	
	<q-card-section class="bg-primary text-white">
        <div class="text-h6">Informacion Propietario</div>
    </q-card-section>

        <div class="q-pa-md" style="max-width:80%;margin-left:10%;">
             <q-list bordered separator style="">
                
                <q-item >
                    <q-item-section>
                        <q-item-label overline>Nit</q-item-label>
                        <q-item-label >{{persona.name}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Nombre</q-item-label>
                        <q-item-label>{{persona.nombre}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Telefono</q-item-label>
                        <q-item-label>{{persona.telefono}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Telefono 2</q-item-label>
                        <q-item-label>{{persona.telefono2}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Direccion</q-item-label>
                        <q-item-label>{{persona.direccion}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item >
                    <q-item-section>
                        <q-item-label overline>Correo</q-item-label>
                        <q-item-label>{{persona.correo}}</q-item-label>
                    </q-item-section>
                </q-item>

            </q-list>
        </div>

    <!--<q-card-section class="row">
        
        <q-input autofocus class="col-4" readonly stack-label v-model.trim="persona.name" label="Nit" />

        <div class="col-1"></div>
        
        <q-input class="col-7" readonly stack-label v-model.trim="persona.nombre" label="Nombre" />

    </q-card-section>

    <q-card-section class="row">
        <q-input class="col-4" readonly stack-label mask="###-###-####"  v-model="persona.telefono" label="Telefono 1" />

        <div class="col-1"></div>
        
        <q-input class="col-7" readonly stack-label v-model="persona.direccion" label="Direccion" />

    </q-card-section>

    <q-card-section class="row">

        <q-input class="col-4" readonly stack-label mask="###-###-####" bottom-slots v-model="persona.telefono2" label="Telefono 2" />

        <div class="col-1"></div>

        <q-input class="col-7" readonly stack-label bottom-slots v-model="persona.correo" label="Correo" />

                    
    </q-card-section>-->

   
</template>




<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PersonaPage',
    props:["persona"],
    data() {
        return {
            
        }
    },
    methods:{

    }
})
</script>