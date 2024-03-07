
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

    let inter = "";
    inter += "    interface I"+titleCase(tbl)+" {"+"\n";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? inter +=  `       ${d}: String;`
                : inter +=  `       ${d}: String;\n`
        }
    });
    inter += "\n    }"+"\n";



    let str = `    import mongoose,{ Schema } from "mongoose";

${inter}
    const ${titleCase(tbl)}Schema = new Schema<I${titleCase(tbl)}>(
        {
 ${obj}       
        },
        {
            timestamps: true
        }
    );
    
    export const ${titleCase(tbl)}Model = mongoose.models.${titleCase(tbl)} || mongoose.model<I${titleCase(tbl)}>("${titleCase(tbl)}", ${titleCase(tbl)}Schema);  
    `;

    return str;

}

export default ModelPage;