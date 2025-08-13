import {
	performGetAPICall,
	performPostAPICall,
	performPutAPICall,
	returnConfigHeadersPrivate,
} from '@/utils/index'
import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'

export async function POST(req: Request) {
	const headersList = headers()
	const searchParams = new URL(req.url).searchParams
	const itemsPerPage = searchParams.get('itemsPerPage')
	const pageNumber = searchParams.get('pageNumber')
	const body = await req.json()
    console.log("gfgsfgrfvsd",body)
	const res: any = await performPostAPICall(
		`/user/getall?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`,
		body ?? {},
		returnConfigHeadersPrivate(headersList)
	)

	return NextResponse.json({ ...res.data })
}
