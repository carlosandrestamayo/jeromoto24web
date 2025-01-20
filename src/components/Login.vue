<template>
<!--<div class="row q-ma-none">
	<div class="col-5">
		<div class="flex flex-center">
			<h4 class="	text-center">LOGIN TO YOUR ACCOUNT</h4>
		</div>
	</div>
	<div class="col-7">
		<img style="object-fit: cover;max-width: 100%;min-height: 100vh;" src="../../public/imagenes/login.jpg">
	</div>

</div>-->

<div style="width:100%;max-height: 100vh;"> 
	<img style="object-fit: cover;min-width: 100%;max-height: 100vh;position:absolute;" src="../../public/imagenes/login.jpg">
	<div style="" class="box">
        <h4 class="text-center text-white text-bold">Jeromotos 24</h4>

        <div style="margin-top: 60px;">
                <label class=" text-white" style="margin: 0px 10%;width:80%;">Usuario</label>
                <input type="text" class="" style="margin: 5px 10%;width:80%;font-size:16px;padding:    5px;">
        </div>   
        <label class=" text-white" style="margin: 0px 10%;width:80%;">Contraseña</label>
        <input type="text" class="" style="margin: 5px 10%;width:80%;font-size:16px;padding:5px;">

        <input type="button" class="" style="margin:30px 10%;width:80%;font-size:16px;cursor:pointer;" value="Logear" >        
    </div>
</div>
	
</template>

  
<script>
import { defineComponent } from 'vue'
//import { marca } from "../models/marca.js";

export default defineComponent({
    name: 'MarcaPage',
    data() {
        return {
           // marca,
            rppo: [7],
            user:"10988"
        }
    },
    beforeMount() {
        //marca.init();
        //marca.filter = "";
    }
})
</script>

<style scoped>
	.box{
		width: 400px;
		height: 100%;
		position:absolute;
        right:  0;
        background:rgba(0,0,0,0.8);
        z-index:    1000;
	}

    .us{
        color:  white;
    }

    .titulo{
        /*font-family: 'Roboto', sans-serif;*/
    }

</style>