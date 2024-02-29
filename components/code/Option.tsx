export const Option = (opt: string, flds: []) => {

    let db: string ="";
    let inter:string[]=[];
    let str: string="";


    for (let i = 0; i < flds.length; i++) {
        let nId:string = opt === 'mongo' ? `_${flds[i]}` : flds[i] ;
        inter.push(nId+"\n");
    }



    if (opt === 'local') {
        db = db + ' import { getItems } from "@/lib/LocalDatabase";';

        str = str + "Aslam";
    } else if (opt === 'dexie') {
        db = db + ' import {fetchAll} from "@/lib/DexieDatabase";';
        str = str + "Aslam";
    } else if (opt === 'mongo') {
        str = str + "Aslam";
    } else if (opt === '') {
        str = str + "Aslam";
        db = db + ' import axios from "axios";';
    } else {
        str = str + "Aslam";
        db = db + ' import axios from "axios";';
    }

    return { db, str, inter };
}