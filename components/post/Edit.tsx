import React, { useState } from "react";
import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";


interface IEdit {
    message: (text: string) => void,
    id: string,
    data: {
        _id: string,
        name: string,
        short_name: string
    }[]
}

const Edit = ({ message, id, data }: IEdit) => {
    const [name, setName] = useState<string>('');
    const [short_name, setShort_name] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);


    const showEditForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {
            const { name, short_name } = data.find(post => post._id === id) || { name: '', short_name: '' };
            setName(name);
            setShort_name(short_name);
        } catch (err) {
            console.log(err);
        }
    };


    const closeEditForm = () => {
        setShow(false);
        message("Data ready.");
    };


    const createObject = () => {
        return {
            name: name,
            short_name: short_name
        }
    }


    const saveHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newObject: {} = createObject();
            const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/post/api/${id}`;
            const requestOptions: RequestInit = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Updated successfully completed");
            } else {
                throw new Error("Failed to create post");
            }
        } catch (error: any) {
            console.error("Error saving post data:", error);
            message("Error saving post data.");
        } finally {
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Name" Id="name" Change={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} Value={name} Chr="50" />
                                    <TextEn Title="Short_name" Id="short_name" Change={(e: React.ChangeEvent<HTMLInputElement>) => setShort_name(e.target.value)} Value={short_name} Chr="50" />
                                </div>
                                <div className="w-full flex justify-start">
                                    <BtnEn Title="Close" Click={closeEditForm} Class="bg-pink-600 hover:bg-pink-800 text-white" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 bg-teal-600 hover:bg-teal-700 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>


        </>
    )
}
export default Edit;


