import { NextResponse } from "next/server";
import { performPostAPICall } from "@/utils";
import { cookies } from "next/headers";


export async function POST(req: Request) {

    const body = await req.json();
  

    // console.log("Logghfxhgjhasb", body);
  
    const response = await performPostAPICall(`/admin/login`, body);
    // return NextResponse.json({ ...res.data })
    console.log("Logghfxhgjhasb", response);
  
    if (response.status == 200) {
      const resp = NextResponse.json({ ...response.data });
      // resp.cookies.set({
      //   name: "accessToken",
      //   value: response.data.data.accessToken,
      // });
      // resp.cookies.set({
      //   name: "clientId",
      //   value: response.data.data.clientId,
      // })
  
      console.log("Logghfxhgjhasb1111111111", response.data);
      return resp;
    } else {
      // let res = NextResponse.json({ ...response.error.response.data }, { status: response.error.response.status });
  
      (await cookies()).delete("accessToken");
      return NextResponse.json({ ...response.data })
    }
  
  }