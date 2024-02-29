"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/post/Add";
import Edit from "@/components/post/Edit";
import Delete from "@/components/post/Delete";


interface IPost {
    _id: string,
    name: string,
    short_name: string
}


const Post = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [msg, setMsg] = useState("Data ready");



    useEffect(() => {
        const fetchData = async () => {
            const baseUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}`
            try {
                const response = await fetch(`${baseUrl}/post/api`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                
                const data: { posts: IPost[] } = await response.json();
               
                setPosts(data.posts);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Post</h1>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-100">
                    <thead>
                        <tr className="w-full bg-gray-100">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Short_name</th>
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end pr-4">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length ? (
                            posts.map((post) => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={post._id}>
                                    <td className="text-center py-2 px-4">{post.name}</td>
                                    <td className="text-center py-2 px-4">{post.short_name}</td>
                                    <td className="flex justify-end items-center space-x-2 mt-1">
                                        <Edit message={messageHandler} id={post._id} data={posts} />
                                        <Delete message={messageHandler} id={post._id} data={posts} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center py-10 px-4">
                                    Please wait...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default Post;


