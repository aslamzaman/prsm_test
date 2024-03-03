
const LayoutPage = (tbl:string, datas:string) => {

    const titleCase = (str:string) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`','');  
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());


    let dd = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={(e) => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />`
                : dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={(e) => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />\n`;
        }
    }
    );


    let stateVar = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateVar = stateVar + `      const [${d}, set${titleCase(d)}] = useState('');`
                : stateVar = stateVar + `      const [${d}, set${titleCase(d)}] = useState('');\n`
        }
    }
    );



    let stateClear = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateClear = stateClear + `          set${titleCase(d)}('');`
                : stateClear = stateClear + `          set${titleCase(d)}('');\n`
        }
    }
    );

    let getData = "";
    data.map((d, i) => {
        i === (data.length - 1)
            ? getData = getData + `set${titleCase(d)}(${d});`
            : getData = getData + `set${titleCase(d)}(${d});\n`
    }
    );


    let getValue = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? getValue = getValue + `              ${d}: ${d}`
                : getValue = getValue + `              ${d}: ${d},\n`
        }
    }
    );



    const url1 = "const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/" + tbl + "/read/${Id}`);";
    const url2 = "const response = await axios.put(`${Lib.url}/" + tbl + "/update/${Id}`, new" + titleCase(tbl) + "Object);";

    const errData = "console.error(`Error fetching " + tbl + " data: ${error}`);";
    const errData2 = " console.error(`Error updating " + tbl + ": ${error}`);";


    const stringData = data.map(t => ` ${t}`).toString();




    const str = `    export const metadata = {
      title: '${titleCase(tbl)}',
      description: 'Generated by create next app',
    }

    interface IChildren {
        children: React.ReactNode;
      }
    export default function ${titleCase(tbl)}Layout({ children }:IChildren) {
      return <>{children} </> 
    }
  
    `;

    return str;
}

export default LayoutPage;