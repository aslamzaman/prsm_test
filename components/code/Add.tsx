

const Add = (tbl: string, datas: string, opt: string) => {

    const titleCase = (str: string) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`', '');
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());


    let dd = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={e => set${titleCase(d)}(e.target.value)} Value={${d}} Chr={50} />`
                : dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={e => set${titleCase(d)}(e.target.value)} Value={${d}} Chr={50} />\n`;
        }
    }
    );


    let stateVar = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateVar = stateVar + `      const [${d}, set${titleCase(d)}] = useState<string>('');`
                : stateVar = stateVar + `      const [${d}, set${titleCase(d)}] = useState<string>('');\n`
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
    let gv = '';
    if (opt === 'local') {
        gv = '              id: Date.now(),'+ '\n';
    }
    getValue += gv;
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? getValue = getValue + `              ${d}: ${d}`
                : getValue = getValue + `              ${d}: ${d},\n`
        }
    }
    );

    //----------------------------------------------------------------
    let saveStr = '';
    saveStr += '              const newObject: {} = createObject();' + '\n';
    saveStr += '              const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/'+tbl+'/api`;' + '\n';
    saveStr += '              const requestOptions: RequestInit = {' + '\n';
    saveStr += '                method: "POST",' + '\n';
    saveStr += '                headers: { "Content-Type": "application/json" },' + '\n';
    saveStr += '                body: JSON.stringify(newObject)' + '\n';
    saveStr += '              };' + '\n';

    saveStr += '              const response = await fetch(apiUrl, requestOptions);' + '\n';
    saveStr += '              if (response.ok) {' + '\n';
    saveStr += '                message("'+titleCase(tbl)+' is created!");' + '\n';
    saveStr += '              } else {' + '\n';
    saveStr += '                throw new Error("Failed to create '+tbl+'");' + '\n';
    saveStr += '              }';


    let localSave = '';
    localSave += '              const newObject = createObject();' + '\n';
    localSave += '              const response = addItem("'+tbl+'", newObject);' + '\n';
    localSave += '              message(response.message);';

    //----------------------------------------------------------------


    const str = `  import React, { useState } from "react";
  import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";
  ${opt === 'local' ? 'import { addItem } from "@/lib/LocalDatabase";' : ''}
          
  interface IAdd {
    message: (text: string) => void;
  }

  const Add:React.FC<IAdd> = ({ message }) => {
${stateVar}
      const [show, setShow] = useState<boolean>(false);
  
  
      const resetVariables = () => {
          message("Ready to make new additions");        
${stateClear}
      }
  
  
      const showAddForm = () => {
          setShow(true);
          resetVariables();
      }
  
  
      const closeAddForm = () => {
          setShow(false);
          message("Data ready");
      }
  
  
      const createObject = () => {
          return {
${getValue} 
          }
      }
  
 
      const saveHandler = ${opt === 'local' ? '' : 'async'} (e: React.FormEvent) => {
          e.preventDefault();
          try {
${opt === 'mongo' ? saveStr : localSave} 
            } catch (error: any) {
                console.error("Error saving ${tbl} data:", error);
                message("Error saving ${tbl} data.");
           }finally {
             setShow(false);
           }
      }
  
  
      return (
          <>
              {show && (
                  <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                      <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                          <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                              <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                              <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                               </button>
                          </div>
                          <div className="px-6 pb-6 text-black">
                              <form onSubmit={saveHandler}>
                                  <div className="grid grid-cols-1 gap-4 my-4">
${dd}                                      
                                  </div>
                                  <div className="w-full flex justify-start">                        
                                     <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                     <BtnEn Title="Close" Click={closeAddForm} Class="bg-pink-600 hover:bg-pink-800 text-white" />
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              )}
              <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
          </>
      )
  }
  export default Add;
  
    `;

    return str;
}

export default Add;