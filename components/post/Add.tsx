import React, { useState } from "react";
import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";

        
interface IAdd {
  message: (text: string) => void;
}

const Add:React.FC<IAdd> = ({ message }) => {
    const [name, setName] = useState<string>('');
    const [shortname, setShortname] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);


    const resetVariables = () => {
        message("Ready to make new additions");        
        setName('');
        setShortname('');
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
            name: name,
            shortname: shortname 
        }
    }


    const saveHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newObject: {} = createObject();
            const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/post/api`;
            const requestOptions: RequestInit = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
              message("Post is created!");
            } else {
              throw new Error("Failed to create post");
            } 
          } catch (error: any) {
              console.error("Error saving post data:", error);
              message("Error saving post data.");
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
                                    <TextEn Title="Name" Id="name" Change={e => setName(e.target.value)} Value={name} Chr={50} />
                                    <TextEn Title="Shortname" Id="shortname" Change={e => setShortname(e.target.value)} Value={shortname} Chr={50} />                                      
                                </div>
                                <div className="w-full flex justify-start">                        
                                   <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />   
                                   <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
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

  