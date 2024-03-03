"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/customer/Add";
import Edit from "@/components/customer/Edit";
import Delete from "@/components/customer/Delete";


interface ICustomer {
    _id: string;
    name: string;
    address: string;
    contact: string;
    join_date: string;
    show_in_dues: string;
    createdAt: string;
    updatedAt: string;
}
const Customer = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [msg, setMsg] = useState<string>("Data ready");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/api`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data: { customers: ICustomer[] } = await response.json();
                setCustomers(data.customers);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Customer</h1>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Address</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Contact</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Join_date</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Show_in_dues</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Createdat</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Updatedat</th>
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end py-0.5 pr-4">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length ? (
                            customers.map(customer => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={customer._id}>
                                    <td className="text-center py-2 px-4">{customer.name}</td>
                                    <td className="text-center py-2 px-4">{customer.address}</td>
                                    <td className="text-center py-2 px-4">{customer.contact}</td>
                                    <td className="text-center py-2 px-4">{customer.join_date}</td>
                                    <td className="text-center py-2 px-4">{customer.show_in_dues}</td>
                                    <td className="text-center py-2 px-4">{customer.createdAt}</td>
                                    <td className="text-center py-2 px-4">{customer.updatedAt}</td>
                                    <td className="flex justify-end items-center space-x-2 mt-1">
                                        <Edit message={messageHandler} id={customer._id} data={customers} />
                                        <Delete message={messageHandler} id={customer._id} data={customers} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-10 px-4">
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

export default Customer;


