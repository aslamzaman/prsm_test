import Link from "next/link"

export const metadata = {
  title: 'Post',
  description: 'Generated by create next app',
}

export default function PostLayout({ children }:any) {
  return <>   
    {children}
  </>
}