
const OnePage = (tbl, datas ,opt) => {

    const titleCase = (str) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`','');  
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());


    let dd = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={(e) => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />`
                : dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={(e) => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />\n`;
        }
    }
    );


    let stateVar = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateVar = stateVar + `      const [${d}, set${titleCase(d)}] = useState('');`
                : stateVar = stateVar + `      const [${d}, set${titleCase(d)}] = useState('');\n`
        }
    }
    );



    let stateClear = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateClear = stateClear + `                    set${titleCase(d)}('');`
                : stateClear = stateClear + `                    set${titleCase(d)}('');\n`
        }
    }
    );

    let getData = "";
    data.map((d, i) => {
        i === (data.length - 1)
            ? getData = getData + `set${titleCase(d)}(${d});`
            : getData = getData + `set${titleCase(d)}(${d});\n`
    }
    );


    let getValue = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? getValue = getValue + `              ${d}: ${d}`
                : getValue = getValue + `              ${d}: ${d},\n`
        }
    }
    );


    let thead_string = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? thead_string = thead_string + `                                <th className="text-center border-b border-gray-200 px-4 py-2">${titleCase(d)}</th>`
                : thead_string = thead_string + `                                <th className="text-center border-b border-gray-200 px-4 py-2">${titleCase(d)}</th>\n`;
        }
    }
    );


    let td_string = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? td_string = td_string + `                                            <td className="text-center py-2 px-4">{${tbl}.${d}}</td>`
                : td_string = td_string + `                                            <td className="text-center py-2 px-4">{${tbl}.${d}}</td>\n`;
        }
    }
    );



    const url1 = "const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/" + tbl + "/read/${Id}`);";
    const url2 = "const response = await axios.put(`${Lib.url}/" + tbl + "/update/${Id}`, new" + titleCase(tbl) + "Object);";

    const errData = "console.error(`Error fetching " + tbl + " data: ${error}`);";
    const errData2 = " console.error(`Error updating " + tbl + ": ${error}`);";


    const stringData = data.map(t => ` ${t}`).toString();

// process.env.NEXT_PUBLIC_API_URL

const loc = 'getItems("' + tbl+ '");';
const dex = 'await fetchAll("'+ tbl+ '");';
const mysq = 'await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'`);';


    const str = `"use client";
    import React, { useState, useEffect } from "react";
    import { jsPDF } from "jspdf";
    import { BtnSubmit, TextEn, TextDt } from "@/components/Form";
    import { Lib } from "@/lib/Lib";
    
    
    
    const ${titleCase(tbl)} = () => {
      const [msg, setMsg] = useState("Data ready");
${stateVar}        

    

        useEffect(() => {
            const load = () => {
                try {
                    setMsg("Ready to works"); 
${stateClear}
                } catch (error) {
                    console.log(error);
                }
            };
            load();
        }, [msg]);
    
    

        const createObject = () => {
            return {
${getValue} 
            }
        }


    
        const createHandler = ${opt==='local'?'':'async'} (e) => {
            e.preventDefault();
            setMsg("Please wait..."); 
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true,
                floatPrecision: 16 // or "smart", default is 16
            });


            try {
                setTimeout(() => {
                    const newObject = createObject();
                    doc.text("A PDF File",105, 20, null, null, 'center');                    
                    doc.save(new Date().toISOString() + "-${tbl}.pdf");
                    setMsg("PDF Created Completed."); 
                }, 0);
            } catch (error) {
                console.log(error);
            }
        }


    
        return (
            <>
                <div className="w-full my-6 lg:my-10">
                    <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">${titleCase(tbl)}</h1>
                </div>
    
                <div className="px-4 lg:px-6">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="w-full p-4">
                            <p className="w-full text-center text-sm text-red-700">{msg}</p>
                            <form onSubmit={createHandler}>
                                <div className="grid grid-cols-1 gap-2 my-2">
${dd}                                   
                                </div>
                                <div className="w-full flex justify-start">
                                    <BtnSubmit Title="Create Pdf" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
    
                    </div>
                </div>
            </>
        );
    };
    
    export default ${titleCase(tbl)};
    
    
    `;

    return str;
}

export default OnePage;