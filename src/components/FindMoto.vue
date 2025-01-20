<template>
    <div>{{ moto.filter }}
        <q-table flat bordered title="Motocicletas" dense :rows="moto.rows" :columns="moto.columns" row-key="name"
            selection="single" v-model:selected="moto.selectMoto" @update:selected="moto.selectedPersona"
            :filter="moto.filterPersona" :rows-per-page-options="rppop">
            <template v-slot:top-right>
                <q-input style="width:400px;" borderless dense debounce="300" v-model="moto.filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon :name="moto.filter == '' ? 'search' : 'close'" @click="moto.filter = ''"
                            class="cursor-pointer" />
                    </template>
                </q-input>
            </template>
        </q-table>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { moto } from "../models/moto.js"
export default defineComponent({
    name: 'FindMoto',
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