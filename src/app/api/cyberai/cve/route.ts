import {NextRequest,NextResponse} from "next/server";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 const id=request.nextUrl.searchParams.get("id")?.trim().toUpperCase()??"";
 if(!/^CVE-[0-9]{4}-[0-9]{4,}$/.test(id))return NextResponse.json({error:"Provide a valid CVE identifier, such as CVE-2024-3094."},{status:400});
 try{
  const response=await fetch("https://services.nvd.nist.gov/rest/json/cves/2.0?cveId="+encodeURIComponent(id),{headers:{Accept:"application/json"},signal:AbortSignal.timeout(8000),next:{revalidate:3600}});
  if(!response.ok)return NextResponse.json({error:response.status===429?"NVD rate limit reached; retry later.":"NVD is temporarily unavailable or the CVE was not found."},{status:response.status===404?404:502});
  const data=await response.json();const item=data.vulnerabilities?.[0]?.cve;
  if(!item)return NextResponse.json({error:"No matching CVE record returned by NVD."},{status:404});
  const description=item.descriptions?.find((entry:{lang:string})=>entry.lang==="en")?.value??"No English description supplied.";
  const metric=item.metrics?.cvssMetricV40?.[0]?.cvssData??item.metrics?.cvssMetricV31?.[0]?.cvssData??item.metrics?.cvssMetricV30?.[0]?.cvssData??item.metrics?.cvssMetricV2?.[0]?.cvssData;
  return NextResponse.json({id:item.id,description,score:typeof metric?.baseScore==="number"?metric.baseScore:null,severity:metric?.baseSeverity??"Not supplied",published:item.published??"",url:"https://nvd.nist.gov/vuln/detail/"+item.id},{headers:{"Cache-Control":"public, s-maxage=3600, stale-while-revalidate=86400"}});
 }catch{return NextResponse.json({error:"Could not reach NVD. Check the connection and retry."},{status:502});}
}