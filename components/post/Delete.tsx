import React, { useState } from "react";
import { BtnEn } from "../Form";
import { Close } from "@/components/Icons";


interface DeleteData {
    message: (text: string) => void,
    id: string,
    data: {
        _id: string,
        name: string,
        short_name: string
    }[]
}
const Delete = ({ message, id, data }: DeleteData) => {
    const [name, setName] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);


    const showDeleteForm = async () => {
        setShow(true);
        try {
            const { name } = data.find(p => p._id === id) || { name: '' };
            setName(name);
            message("Ready to delete");
        }
        catch (err) {
            console.log(err);
        }
    }


    const closeDeleteForm = () => {
        setShow(false);
        message("Data ready");
    }


    const deleteYesClick = async () => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/post/api/${id}`;
            console.log(apiUrl)
            const requestOptions = { method: "DELETE" };
            const response = await fetch(apiUrl, requestOptions);

            if (!response.ok) {
                throw new Error(`Failed to delete post. Status: ${response.status}`);
            }

            message("Deleted successfully completed");
        } catch (error) {
            console.error("Delete Error:", error);
            message("Data deleting error");
        } finally {
            setShow(false);
        }
    };


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Delete Existing Data</h1>
                            <Close Click={closeDeleteForm} Size="w-8 h-8" />
                        </div>
                        <div className="p-4 lg:p-6 flex flex-col space-y-4">
                            <div className="w-full">
                                <svg height="80" width="80" xmlns="http://www.w3.org/2000/svg" className="bg-white mx-auto">
                                    <path d="M40 5 L5 75 L75 75 Z" className="fill-none stroke-black stroke-[5px]"  />
                                    <path d="M40 25 L40 50" className="fill-none stroke-black stroke-[5px]"  />
                                    <path d="M40 55 L40 65" className="fill-none stroke-black stroke-[5px]"  />
                                </svg>

                                <h1 className="text-sm text-center text-gray-600">
                                    Are you sure to proceed with the deletion?</h1>
                                <h1 className="text-center text-gray-600 font-bold">{name}</h1>
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnEn Title="Close" Click={closeDeleteForm} Class="bg-pink-700 hover:bg-pink-900 text-white mr-1" />
                                <BtnEn Title="Yes Delete" Click={deleteYesClick} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </div>
                    </div>
                </div >
            )}
            <button onClick={showDeleteForm} title="Delete" className="w-8 h-8 rounded-full hover:bg-gray-200 mr-[16px] flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </>
    )
}
export default Delete;


