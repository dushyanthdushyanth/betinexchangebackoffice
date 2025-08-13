import React from "react";
import { axiosServer } from "@/utils/axios";
import { USER_LIST_HEADERS } from "@/components/constants";
import { cookies } from "next/headers";
import DisplayUserList from "@/components/userlist/DisplayUserList";
import {getPaginationParamsSSR, getParams, returnConfigHeadersCokkiesPrivate } from "@/utils";
import moment from "moment-timezone";

const fetchUserListData = async (
  searchParams: any,
  body: any
) => {
  const nextCookies = cookies();

  const userListData = await axiosServer.post(
    `/userlist?${getPaginationParamsSSR(searchParams)}`,
    body,
    returnConfigHeadersCokkiesPrivate(nextCookies)
  );
  console.log("userListData", userListData);
  return userListData?.data;
};


const userListPage = async ({ searchParams }: any) => {
  const {
    page: pageNumber,
    itemsPerPage,
    firstName,
    lastName,
    email,
    countryCode,
    phoneNumber,
    status,
    clientId,
  } = getParams(searchParams);


  let body = {};
  if (firstName || lastName || email || countryCode || phoneNumber || status || clientId) {
    const queryParams = { firstName, lastName, email, countryCode, phoneNumber, status, clientId};
    body = {
      ...Object.fromEntries(
        Object.entries(queryParams).filter(
          ([key, value]) => value !== undefined && value !== ""
        )
      ),
    };
  } else {
    body = {
      startDate: moment().subtract(2, "days").startOf("day").utcOffset(5.5).format("YYYY-MM-DDTHH:mm:ss[Z]"),
      endDate:moment().endOf("day").utcOffset(5.5).format("YYYY-MM-DDTHH:mm:ss[Z]")
    };
  }
  

  const userListData = await fetchUserListData(searchParams, body)

  console.log("userListData",userListData)

  return (
    <>
      <div>
        <DisplayUserList header={USER_LIST_HEADERS} body={userListData} />
      </div>
    </>
  );
};

export default userListPage;

