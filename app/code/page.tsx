"use client"
import React, { ReactEventHandler, useEffect, useState } from "react";
import { BtnEn, DropdownEn, TextEn } from "@/components/Form";

import Page from "@/components/code/Page";
import Add from "@/components/code/Add";
import Edit from "@/components/code/Edit";
import Delete from "@/components/code/Delete";
import LocalDatabase from "@/components/code/LocalDatabase";
import LayoutPage from "@/components/code/LayoutPage";
import Help_code from "@/components/code/HelpCode";
import TwoPart from "@/components/code/TowPart";
import OnePage from "@/components/code/OnePage";
import ModelPage from "@/components/code/ModelPage";
import RoutePage from "@/components/code/RoutePage";
import RouteDynamicPage from "@/components/code/RouteDynamicPage";



const titleCase = (str: string) => {
    return str
        .split(' ')
        .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}



const Code = () => {
    const [opt, setOpt] = useState<string>("mysql");
    const [tbl, setTbl] = useState<string>("");
    const [fld, setFld] = useState<string>("");
    const [titleText, setTitleText] = useState<string>("Result");
    const [result, setResult] = useState<string>("Result");

    useEffect(() => {
        const newDb = localStorage.getItem('db');
        const newTbl = localStorage.getItem('tbl');
        const newFld = localStorage.getItem('fld');
        setOpt(newDb ? newDb : "local");
        setTbl(newTbl ? newTbl : "bayprostab");
        setFld(newFld ? newFld : "id, item, nos,taka");
    }, []);


    const PageGenerate = () => {
        localStorage.setItem('db', opt);
        localStorage.setItem('tbl', tbl);
        localStorage.setItem('fld', fld);
        setTitleText(`app/${tbl}/page.tsx`);
        setResult(Page(tbl, fld, opt));
    }


    const AddGenerate = () => {
        setTitleText(`components/${tbl}/Add.tsx`);
        setResult(Add(tbl, fld, opt));
    }

    const EditGenerate = () => {
        setTitleText(`components/${tbl}/Edit.tsx`);
        setResult(Edit(tbl, fld, opt));
    }

    const DeleteGenerate = () => {
        setTitleText(`components/${tbl}/Delete.tsx`);
        setResult(Delete(tbl, fld, opt));
    }

    const LocalDatabaseGenerate = () => {
        setTitleText(`lib/LocalDatabase.tsx`);
        setResult(LocalDatabase());
    }



    const UnitqueIdGenerator = () => {
        setTitleText(`Unique Id`);
        const str = `${Date.now()}\n\n${new Date().toISOString()}`;
        setResult(str);
    }

    const LayoutPageGenerate = () => {
        setTitleText(`app/${tbl}/layout.tsx`);
        setResult(LayoutPage(tbl, fld));
    }

    const HelpPageGenerate = () => {
        setTitleText(`Help`);
        setResult(Help_code(tbl));
    }


    const TwoPartHandle = () => {
        setTitleText(`app/${tbl}/page.tsx`);
        setResult(TwoPart(tbl, fld, opt));
    }

    const OnePartHandle = () => {
        setTitleText(`app/${tbl}/page.tsx`);
        setResult(OnePage(tbl, fld, opt));
    }

    const PromiseGenerate = () => {
        const tbls = prompt("Tables name");
        if (tbls === null || tbls === '') return false;
        const sp = tbls.split(',');

        const tbName = sp.map(t => ' ' + t.trim() + 'Response').toString();

        let str = "";

        let s4 = "";
        for (let i = 0; i < sp.length; i++) {
            s4 = s4 + `    const [${sp[i].trim()}s, set${titleCase(sp[i].trim())}s] = useState([]);\n`;
        }
        str = str + s4;

        str = str + "\n";

        let s6 = "";
        for (let i = 0; i < sp.length; i++) {
            s6 = s6 + `    const [${sp[i].trim()}_id, set${titleCase(sp[i].trim())}_id] = useState("");\n`;
        }
        str = str + s6;

        str = str + "\n";



        str = str + "    const fetchData = async (callback) => {\n";
        str = str + "        try {\n";
        str = str + "            const [" + tbName + " ] = await Promise.all([\n";
        let s1 = "";
        for (let i = 0; i < sp.length - 1; i++) {
            s1 = s1 + '                fetchAll("' + sp[i].trim() + '"),\n';
        }

        s1 = s1 + '                fetchAll("' + sp[sp.length - 1].trim() + '")\n';
        str = str + s1;
        str = str + "            ]);\n\n"


        str = str + "            callback({\n";

        let s3 = "";
        for (let i = 0; i < sp.length - 1; i++) {
            s3 = s3 + `                ${sp[i].trim()}: ${sp[i].trim() + 'Response'}.data,\n`;
        }

        s3 = s3 + `                ${sp[sp.length - 1].trim()}: ${sp[sp.length - 1].trim() + 'Response'}.data\n`;
        str = str + s3;




        str = str + "            });\n";
        str = str + "        } catch (error) {\n";
        str = str + '            console.error("Error fetching data:", error);\n';
        str = str + "        }\n";

        str = str + "    };\n";

        str = str + "\n";



        str = str + "    const getData = async () => {\n";
        str = str + "        try{\n";
        str = str + "            await fetchData(data => {\n";
        let s5 = "";
        for (let i = 0; i < sp.length; i++) {
            s5 = s5 + `                set${titleCase(sp[i].trim())}s(data.${sp[i].trim()});\n`;
        }
        str = str + s5;

        str = str + "            });\n";
        str = str + "        }catch(error){\n";
        str = str + "            console.log(error);\n";
        str = str + "        };\n";
        str = str + "    };\n\n";


        let s7 = "";
        for (let i = 0; i < sp.length; i++) {
            s7 = s7 + `                                    <DropdownEn Title="${titleCase(sp[i].trim())}" Id="${sp[i].trim()}_id" Change={e => set${titleCase(sp[i].trim())}_id(e.target.value)} Value={${sp[i].trim()}_id}>\n`;
            s7 = s7 + `                                        {${sp[i].trim()}s.length?${sp[i].trim()}s.map(${sp[i].trim()}=><option value={${sp[i].trim()}.id} key={${sp[i].trim()}.id}>{${sp[i].trim()}.name}</option>):null}\n`;
            s7 = s7 + `                                    </DropdownEn>\n`;
        }
        str = str + s7;


        setResult(str);

    }


    const DropdownById = () => {
        const tblName = prompt("Dropdown Id. (say: customer_id)");
        if (tblName === null || tblName === '') return false;

        const tbl = tblName.split("_");
        if (tbl.length < 1) return false;
        console.log(tbl.length);


        let str = '    import {fetchAll} from "@/lib/DexieDatabase";\n';
        str = str + '    import { BtnSubmit, BtnEn, DropdownEn, TextNum } from "@/components/Form";\n';
        str = str + "\n";
        str = str + "\n";
        str = str + `    const [${tbl[0]}s, set${titleCase(tbl[0])}s] = useState([]);\n`;
        str = str + `    const [${tblName}, set${titleCase(tblName)}] = useState("");\n`;

        str = str + "\n";
        str = str + "\n";

        str = str + "    const fetchData = async () => {\n";
        str = str + "        try {\n";
        str = str + "            const " + tbl[0] + "Response = await fetchAll('" + tbl[0] + "');\n";
        str = str + "            const " + tbl[0] + "Data = " + tbl[0] + "Response.data;\n";
        str = str + `            set${titleCase(tbl[0])}s(${tbl[0]}Data);\n`;
        str = str + "        } catch (error) {\n";
        str = str + '            console.error("Error fetching data:", error);\n';
        str = str + "        }\n";

        str = str + "    };\n";
        str = str + "\n";
        str = str + "\n";





        str = str + `                                    <DropdownEn Title="${titleCase(tbl[0])}" Id="${tblName}" Change={e => set${titleCase(tblName)}(e.target.value)} Value={${tblName}}>\n`;
        str = str + `                                        {${tbl[0]}s.length?${tbl[0]}s.map(${tbl[0]}=><option value={${tbl[0]}.id} key={${tbl[0]}.id}>{${tbl[0]}.name}</option>):null}\n`;

        str = str + `                                    </DropdownEn>\n`;


        setResult(str);
    }


    const JonGenerate = () => {
        const tbls = prompt("Tables name");
        if (tbls === null || tbls === '') return false;
        const sp = tbls.split(',');

        const tbName = sp.map(t => ' ' + t.trim() + 'Response').toString();

        let str = "";
        str = str + 'import React, { useState, useEffect } from "react";\n';
        str = str + 'import {fetchAll} from "@/lib/DexieDatabase";\n';
        str = str + "\n";

        str = str + `    const [${sp[0].trim()}s, set${titleCase(sp[0].trim())}s] = useState([]);\n`;

        str = str + "\n";


        str = str + "    const fetchData = async () => {\n";
        str = str + "        try {\n";
        str = str + "            const [" + tbName + " ] = await Promise.all([\n";
        let s1 = "";
        for (let i = 0; i < sp.length - 1; i++) {
            s1 = s1 + '                fetchAll("' + sp[i].trim() + '"),\n';
        }

        s1 = s1 + '                fetchAll("' + sp[sp.length - 1].trim() + '")\n';
        str = str + s1;
        str = str + "            ]);\n\n"


        let s3 = "";
        for (let i = 0; i < sp.length; i++) {
            s3 = s3 + `            const ${sp[i].trim()}Data = ${sp[i].trim() + 'Response'}.data;\n`;
        }
        str = str + s3;
        str = str + "\n";
        str = str + `            const jointData = ${sp[0].trim()}Data.map(${sp[0].trim()}=>{\n`;

        let m1 = "";
        for (let i = 1; i < sp.length; i++) {
            m1 = m1 + '                const match' + titleCase(sp[i].trim()) + ' = ' + sp[i].trim() + 'Data.find(' + sp[i].trim() + ' => parseInt(' + sp[i].trim() + '.id) === parseInt(' + sp[0].trim() + '.' + sp[i].trim() + '_id));\n';
        }
        str = str + m1;


        str = str + `                return {\n`;
        str = str + '                   ...' + sp[0].trim() + ',\n';

        let m3 = "";
        for (let i = 1; i < sp.length - 1; i++) {
            m3 = m3 + '                   ' + sp[i].trim() + ' : match' + titleCase(sp[i].trim()) + '? match' + titleCase(sp[i].trim()) + ".name : 'Error!',\n";
        }

        m3 = m3 + '                   ' + sp[sp.length - 1].trim() + ' : match' + titleCase(sp[sp.length - 1].trim()) + '? match' + titleCase(sp[sp.length - 1].trim()) + ".name : 'Error!'\n";



        str = str + m3;


        str = str + `                }\n`;


        str = str + `            });\n`;
        str = str + "\n";

        str = str + "            const result = jointData.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);\n";
        str = str + "            set" + titleCase(sp[0]) + "s(result);\n";


        str = str + "        } catch (error) {\n";
        str = str + '            console.error("Error fetching data:", error);\n';
        str = str + "        }\n";

        str = str + "    };\n";

        str = str + "\n";
        str = str + "    fetchData();\n";
        setResult(str);

    }


    const resultChangeHander = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setResult(e.target.value);
    }

const ModelPageGenerate = ()=>{
    setTitleText(`models/${titleCase(tbl)}Model.tsx`);
    setResult(ModelPage(tbl,fld));
}

const RoutePageGenerate = ()=>{
    setTitleText(`${tbl}/api/route.tsx`);
    setResult(RoutePage(tbl,fld));
}

const RouteDynamicPageGenerate = ()=>{
    setTitleText(`${tbl}/api/[id]/route.tsx`);
    setResult(RouteDynamicPage(tbl,fld));
}





    return (
        <div className="pb-10">
            <h1 className="w-full text-center text-3xl text-gray-500 font-bold py-7">Code Generator</h1>

            <div className="w-full px-4 grid grid-cols-5 gap-4">
                <div className="w-full col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                        <DropdownEn Title="Option" Id="opt" Change={e => setOpt(e.target.value)} Value={opt}>
                            <option value="local">Local</option>
                            <option value="mongo">MongoDB</option>
                        </DropdownEn>
                        <TextEn Title="Table" Id="tbl" Change={e=> setTbl(e.target.value)} Value={tbl} Chr={20} />
                    </div>
                </div>
                <div className="col-span-3">
                    <TextEn Title="Column" Id="fld" Change={e => setFld(e.target.value)} Value={fld} Chr={150} />
                </div>
            </div>


            <div className="w-full px-4 grid grid-cols-3 gap-4">
                <div className="mt-7">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-2">

                        <BtnEn Title="Page" Click={PageGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="LayoutPage" Click={LayoutPageGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="Route" Click={RoutePageGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="DynamicRoute" Click={RouteDynamicPageGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        
                        <BtnEn Title="Add" Click={AddGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="Edit" Click={EditGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="Delete" Click={DeleteGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                       
                        <BtnEn Title="Model" Click={ModelPageGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                       
                        <BtnEn Title="Two Part" Click={TwoPartHandle} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="One Page" Click={OnePartHandle} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="LocalDatabase" Click={LocalDatabaseGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="Unique Id" Click={UnitqueIdGenerator} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="Promise All" Click={PromiseGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="DropdownById" Click={DropdownById} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="Joint Table" Click={JonGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                        <BtnEn Title="Help" Click={HelpPageGenerate} Class="bg-indigo-700 hover:bg-indigo-900 text-white mr-1 text-xs" />
                    </div>
                </div>
                <div className="col-span-2 py-4">
                    <p>{titleText}</p>
            <textarea rows={20} id="result" name="result" onChange={resultChangeHander} value={result} required maxLength={2500} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />

                </div>
            </div>
        </div>
    )

}
export default Code;