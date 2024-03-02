
const RouteDynamicPage = (tbl: string, datas: string) => {

    const titleCase = (str: string) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`', '');
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());

    let obj = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? obj +=  `${d}`
                : obj +=  `${d}, `
        }
    });

    let str = `    import { NextResponse } from 'next/server';
    import { Connect } from '@/db/MongoDbConnection';
    import { ${titleCase(tbl)}Model } from '@/models/${titleCase(tbl)}Model';
    
    
    export const PUT = async (req: Request,{ params }:{params: {id: string}}) => {
      try {
        const body = await req.json();
        const {id} = params;
        const { ${obj} } = body;
        await Connect();
        const ${tbl}s = await ${titleCase(tbl)}Model.findByIdAndUpdate(id, { ${obj} });
        return NextResponse.json(${tbl}s);
      } catch (err) {
        return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
      }
    }
    
    
    export const DELETE = async (req: Request,{ params }:{params: {id: string}}) => {
      try {
        const {id} = params;
        await Connect();
        const ${tbl}s = await ${titleCase(tbl)}Model.findOneAndDelete({_id: id});
        return NextResponse.json(${tbl}s);
      } catch (err) {
        return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
      }
    } `;

    return str;

}

export default RouteDynamicPage;