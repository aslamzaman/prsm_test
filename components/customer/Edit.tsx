import React, { useState } from "react";
import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";


interface IEdit {
    message: (text: string) => void;
    id: string;
    data: {
        _id: string;
        name: string;
        address: string;
        contact: string;
        join_date: string;
        show_in_dues: string;
        createdAt: string;
        updatedAt: string;
    }[]
}

const Edit: React.FC<IEdit> = ({ message, id, data }) => {
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [join_date, setJoin_date] = useState<string>('');
    const [show_in_dues, setShow_in_dues] = useState<string>('');
    const [createdAt, setCreatedat] = useState<string>('');
    const [updatedAt, setUpdatedat] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);


    const showEditForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {
            const { name, address, contact, join_date, show_in_dues, createdAt, updatedAt } = data.find(customer => customer._id === id) || { name: '', address: '', contact: '', join_date: '', show_in_dues: '', createdAt: '', updatedAt: '' };
            setName(name);
            setAddress(address);
            setContact(contact);
            setJoin_date(join_date);
            setShow_in_dues(show_in_dues);
            setCreatedat(createdAt);
            setUpdatedat(updatedAt);
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
            address: address,
            contact: contact,
            join_date: join_date,
            show_in_dues: show_in_dues,
            createdAt: createdAt,
            updatedAt: updatedAt
        }
    }


    const saveHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newObject: {} = createObject();
            const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/customer/api/${id}`;
            const requestOptions: RequestInit = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Updated successfully completed");
            } else {
                throw new Error("Failed to create customer");
            }
        } catch (error: any) {
            console.error("Error saving customer data:", error);
            message("Error saving customer data.");
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
                                    <TextEn Title="Name" Id="name" Change={e => setName(e.target.value)} Value={name} Chr={50} />
                                    <TextEn Title="Address" Id="address" Change={e => setAddress(e.target.value)} Value={address} Chr={50} />
                                    <TextEn Title="Contact" Id="contact" Change={e => setContact(e.target.value)} Value={contact} Chr={50} />
                                    <TextEn Title="Join_date" Id="join_date" Change={e => setJoin_date(e.target.value)} Value={join_date} Chr={50} />
                                    <TextEn Title="Show_in_dues" Id="show_in_dues" Change={e => setShow_in_dues(e.target.value)} Value={show_in_dues} Chr={50} />
                                    <TextEn Title="Createdat" Id="createdAt" Change={e => setCreatedat(e.target.value)} Value={createdAt} Chr={50} />
                                    <TextEn Title="Updatedat" Id="updatedAt" Change={e => setUpdatedat(e.target.value)} Value={updatedAt} Chr={50} />
                                </div>
                                <div className="w-full flex justify-start">
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
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


