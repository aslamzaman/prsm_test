const Page = (tbl: string, datas: string, opt: string) => {

    const titleCase = (str: string) => {
        return str
            .split(' ')
            .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`', '');
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
                ? stateClear = stateClear + `          set${titleCase(d)}('');`
                : stateClear = stateClear + `          set${titleCase(d)}('');\n`
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
                ? thead_string = thead_string + `                                      <th className="text-center border-b border-gray-200 px-4 py-2">${titleCase(d)}</th>`
                : thead_string = thead_string + `                                      <th className="text-center border-b border-gray-200 px-4 py-2">${titleCase(d)}</th>\n`;
        }
    }
    );


    let td_string = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? td_string = td_string + `                                              <td className="text-center py-2 px-4">{${tbl}.${d}}</td>`
                : td_string = td_string + `                                              <td className="text-center py-2 px-4">{${tbl}.${d}}</td>\n`;
        }
    }
    );

    let interface_string = "";
    interface_string = interface_string + `   interface I${titleCase(tbl)} {\n`;
    data.map((d, i) => {
        i === (data.length - 1)
            ? interface_string = interface_string + `        ${d}: string;\n`
            : interface_string = interface_string + `        ${d}: string;\n`;
    });
    interface_string = interface_string + `   }`;


    //-------------------------------
    let loadMongo: string = "";
    loadMongo += '                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/' + tbl + '/api`, {' + '\n';
    loadMongo += '                        method: "GET",' + '\n';
    loadMongo += '                        headers: { "Content-Type": "application/json" }' + '\n';
    loadMongo += '                    });' + '\n\n';
    loadMongo += '                    if (!response.ok) {' + '\n';
    loadMongo += '                        throw new Error("Failed to fetch data");' + '\n';
    loadMongo += '                    }' + '\n\n';

    loadMongo += '                    const data: I' + titleCase(tbl) + '[] = await response.json();' + '\n';
    loadMongo += '                    console.log(data);' + '\n';
    loadMongo += '                    set' + titleCase(tbl) + 's(data);';
    //-------------
    let localLoad: string = "";
    localLoad += '                    const response = getItems("' + tbl + '");' + '\n';
    localLoad += '                    const data: IPost[] = response.data;' + '\n';
    localLoad += '                    const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);' + '\n';
    localLoad += '                    set' + titleCase(tbl) + 's(result);';
    //--------------------------------------------------------------------------------------------


    const str = `    "use client";
    import React, { useState, useEffect } from "react";
    import Add from "@/components/${tbl}/Add";
    import Edit from "@/components/${tbl}/Edit";    
    import Delete from "@/components/${tbl}/Delete";
 ${opt === 'mongo' ? '' : '   import { getItems } from "@/lib/LocalDatabase";'} 

${interface_string}
    const ${titleCase(tbl)} = () => {
        const [${tbl}s, set${titleCase(tbl)}s] = useState<I${titleCase(tbl)}[]>([]);
        const [msg, setMsg] = useState<string>("Data ready");

    
        useEffect(() => {
            const fetchData = ${opt === 'local' ? '' : 'async'} () => {
                try {
${opt === 'mongo' ? loadMongo : localLoad}
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setMsg("Failed to fetch data");
                }
            };
            fetchData();
        }, [msg]);
    
    
        const messageHandler = (data: string) => {
            setMsg(data);
        }
    
    
        return (
            <>
                <div className="w-full my-6 lg:my-8">
                    <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">${titleCase(tbl)}</h1>
                </div>    
                <div className="px-4 lg:px-6">
                    <p className="w-full text-sm text-red-700">{msg}</p>    
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">                           
${thead_string}                                
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {${tbl}s.length ?(
                                ${tbl}s.map(${tbl} => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={${tbl}.${opt==='mongo'?'_id':'id'}}>                                           
${td_string}                                            
                                        <td className="flex justify-end items-center space-x-2 mt-1">
                                            <Edit message={messageHandler} id={${tbl}.${opt === 'mongo' ? '_id' : 'id'}} data={${tbl}s} />
                                            <Delete message={messageHandler} id={${tbl}.${opt === 'mongo' ? '_id' : 'id'}} data={${tbl}s} />
                                        </td>
                                    </tr>
                                ))
                            ): (
                                <tr>
                                    <td colSpan={${data.length}} className="text-center py-10 px-4">
                                        Data not available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    
    };
    
    export default ${titleCase(tbl)};
    
  
    `;

    return str;
}

export default Page;