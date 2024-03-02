
const ModelPage = (tbl: string, datas: string) => {

    const titleCase = (str: string) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`', '');
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());

    let obj = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? obj +=  `       ${d}: String`
                : obj +=  `       ${d}: String,\n`
        }
    });

    let str = `    import mongoose from "mongoose";

    const ${titleCase(tbl)}Schema = new mongoose.Schema({
 ${obj}       
    })
    
    export const ${titleCase(tbl)}Model = mongoose.models.${titleCase(tbl)} || mongoose.model("${titleCase(tbl)}", ${titleCase(tbl)}Schema);  
    `;

    return str;

}

export default ModelPage;