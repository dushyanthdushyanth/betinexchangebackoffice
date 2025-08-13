"use client"

import React, { useEffect, useState } from 'react'
import SearchTable from '../ui/searchTable/SearchTable'
import { useRouter } from 'next/navigation'
import { axiosClient } from '@/utils/axios';

import { isBrowser, showToast } from '@/utils';



const DisplayUserList = ({header, body}: any) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchUserList = async () => {
  //     try {
  //       const response = await axiosClient.post('/userlist');
  //       console.log("response",response)
  //       if (response.status === 200) {
  //         setUserList(response.data.data);
  //       } else {
  //         showToast("error", "Failed to fetch user list");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user list:", error);
  //       showToast("error", "Error fetching user list");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserList();
  // }, []);

  return (
    <div>
      <SearchTable header={header} body={body} />
    </div>
  );
}

export default DisplayUserList;