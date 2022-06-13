import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import { Box } from '@chakra-ui/react'
import axios from 'axios';

const groupPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [groupData, setGroupData] = useState(null);

    const myFunction = async () => {
        const res = await axios.get(`/api/group/${id}/`);
        setGroupData(res.data);
        console.log(res.data.memb);
    };

    useEffect(() => {
        if (router.isReady) {
            myFunction();
        }
    }, [router.isReady]);

    return !(groupData && router.isReady) ? (
        "loading"
      ) : (
    <>
        GroupID: {groupData.id}
        <br/>
        Group name: {groupData.groupName}
        <br/>
        {groupData.memb.map(member => <p>{member}</p>)}
    </>
    )
};

export default groupPage;