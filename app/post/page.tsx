"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/post/Add";

import Edit from "@/components/post/Edit";
import Delete from "@/components/post/Delete";


interface PostInterface {
    _id: string,
    name: string,
    short_name: string
}


const Post = () => {
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [msg, setMsg] = useState("Data ready");



    useEffect(() => {
        const load = async () => {
            const baseUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}`
            try {
                const response = await fetch(`${baseUrl}/post/api`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                    // body: JSON.stringify(data),
                });
                const data = await response.json();
                console.log(data.posts)
                setPosts(data.posts);

            } catch (error) {
                console.error(error);
            }
        };

        load();
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
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Short_name</th>
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.length ? posts.map(post => {

                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={post._id}>
                                        <td className="text-center py-2 px-4">{post.name}</td>
                                        <td className="text-center py-2 px-4">{post.short_name}</td>
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={post._id} data={posts} />
                                            <Delete message={messageHandler} id={post._id} data={posts} />
                                        </td>
                                    </tr>
                                )
                            })
                                : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default Post;


