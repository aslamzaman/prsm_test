export const metadata = {
  title: 'Employee',
  description: 'Generated by create next app',
}

interface IChildren {
    children: React.ReactNode;
  }
export default function EmployeeLayout({ children }:IChildren) {
  return <>{children} </> 
}

