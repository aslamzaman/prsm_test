"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/gender/Add";
import Edit from "@/components/gender/Edit";    
import Delete from "@/components/gender/Delete";


interface IGender {
    _id: string;
    name: string;
}
const Gender = () => {
    const [genders, setGenders] = useState<IGender[]>([]);
    const [msg, setMsg] = useState<string>("Data ready");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/gender/api`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data: { genders: IGender[] } = await response.json();
                setGenders(data.genders);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Gender</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                           
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>                                
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end py-0.5 pr-4">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {genders.length ?(
                            genders.map(gender => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={gender._id}>                                           
                                          <td className="text-center py-2 px-4">{gender.name}</td>                                            
                                    <td className="flex justify-end items-center space-x-2 mt-1">
                                        <Edit message={messageHandler} id={gender._id} data={genders} />
                                        <Delete message={messageHandler} id={gender._id} data={genders} />
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan={2} className="text-center py-10 px-4">
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

export default Gender;


