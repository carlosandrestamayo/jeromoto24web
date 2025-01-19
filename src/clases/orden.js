export class Orden {
    constructor(obj = { id: 0,name:'',estado:'Iniciada', km: '0',fechaentrada:"",horaentrada:"",fechasalida:"",horasalida:"",fechaentrega:"",horaentrega:"",solicitados:{s1:"",s2:"",s3:"",s4:"",s5:""},realizados:{r1:"",r2:"",r3:"",r4:"",r5:""},motoId:0,tecnicoId:0,fotos:[] }) {
        this.id = obj.id;
        this.name = obj.name;
        this.km = obj.km;
        this.estado=obj.estado;
        this.solicitados=obj.solicitados;
        this.realizados=obj.realizados;
        this.fechaentrada = obj.fechaentrada;
        this.horaentrada = obj.horaentrada;
        this.fechasalida = obj.fechasalida;
        this.horasalida = obj.horasalida;
        this.fechaentrega = obj.fechaentrega;
        this.horaentrega = obj.horaentrega;
        this.motoId = obj.motoId; 
        this.tecnicoId = obj.tecnicoId;
        this.fotos = obj.fotos;
    }
    
    static url(){
        return "http://localhost/apijm/backend/orden.php"
    }

    static columns() {
        return [
            {
                name: 'name',
                required: true,
                label: 'Referencia',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            },
            //{ name: 'id', align: 'left', label: 'Id', field: 'id', sortable: false },
            { name: 'marcaName', align: 'left', label: 'Marca', field: row=> row.marca.name, sortable: false }
        ]
    }
}