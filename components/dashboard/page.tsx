'use client'
import React, { useEffect, useState } from "react";
import AfterSaleCard from "./AfterSaleCard";
import CardSsOne from "./SsOneCard";
import { useRouter } from "next/navigation";
import authAxios from "@/utils/axiosWithAxios";
import axios from 'axios'
import { Alert } from "@mui/material";
interface Item {
    Title: string;
    Subtitle: string;
    Icon1Detail: string;
    Icon2Detail: string;
    Icon3Detail: string;
}


const afterSaleItems: Item[] = [
    {
        Title: "Title 1",
        Subtitle: "Subtitle 1",
        Icon1Detail: "Detail for Icon 1",
        Icon2Detail: "Detail for Icon 2",
        Icon3Detail: "Detail for Icon 3"
    },
    {
        Title: "Title 2",
        Subtitle: "Subtitle 2",
        Icon1Detail: "Detail for Icon 4",
        Icon2Detail: "Detail for Icon 5",
        Icon3Detail: "Detail for Icon 6"
    }
];


const Page: React.FC = () => {

    const [AfterSaleData, setAfterSaleData] = useState<any>([]);
    const [SslData, setSslData] = useState<any>([]);
    const [reload, seReload] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            const storedUserData = localStorage.getItem("userData");
            let user;

            if (storedUserData) {

                user = JSON.parse(storedUserData);
            }
            else {
                return;
            }

            try {
                const [sslResponse, afterSaleResponse] = await Promise.all([
                    authAxios.get(`/api/ssl/get-my-ssl?id=${user.id}`, {

                    }),
                    authAxios.get(`/api/aftersale/get-my-aftersales?id=${user.id}`, {

                    })
                ]);

                setSslData(sslResponse.data);
                setAfterSaleData(afterSaleResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [reload]);


    const router = useRouter();


    const handleEditSS1 = (index: number, data: any) => {

        console.log(" ss1 edited index is", index)
        router.push(`/ssl/edit/${index}`);


        // navigation.navigate("AddingNavigation" as never, { screen: "SsOne", params: { index, isEditing: true, data } } as never);
    };

    const handleViewSS1 = (index: number, data: any) => {

        console.log(" ss1 edited index is", index)
        router.push(`/ssl/view/${index}`);

        // navigation.navigate("AddingNavigation" as never, { screen: "SsOne", params: { index, isEditing: false, data } } as never);
    };

    const handleDeleteSsl = (id: any) => {

        const storedUserData = localStorage.getItem("userData");
        const token = localStorage.getItem("token");
        let user;

        if (storedUserData) {

            user = JSON.parse(storedUserData);
            console.log("first", user)

        }
        else {
            return
        }


        console.log("the  delete id", id);

        authAxios.delete(`/api/ssl?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => {
                alert("Deletion Successful");
                console.log('Delete successful:', response.data);
                seReload(true)
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });

        seReload(false)
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-0 justify-between max-w-[364px] items-start pb-3.5 border-b border-solid border-zinc-200">
                <div className="flex flex-1 gap-1.5 pr-20 font-medium text-black">
                    <div className="shrink-0 my-auto w-2 h-2 bg-fuchsia-500 rounded-full" />
                    <div className="text-sm">SS1 2 </div>

                </div>
                <div className="flex justify-center items-center bg-white rounded-2xl">
                    <img
                        loading="lazy"
                        src="/plus.svg"
                        className="w-5 h-5 aspect-square"
                    />
                </div>

            </div>
            <div className="grid  grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-3 gap-10 max-w-screen-xl ">


                {SslData.map((ss: any, index: number) => (
                    <CardSsOne
                        key={index}
                        actionText={ss?.status}
                        sent={true}
                        address1={ss.address1}
                        address2={ss.address2}
                        address3={ss.address3}
                        index={index}
                        handlePress={() => handleEditSS1(ss.id, ss)}
                        handleSslDelete={() => handleDeleteSsl(ss.id)}
                        handleViewSS1={() => handleViewSS1(ss.id, ss)}

                    />
                ))}
            </div>

            <div className="flex gap-0 justify-between max-w-[364px] items-start pb-3.5 border-b border-solid border-zinc-200">
                <div className="flex flex-1 gap-1.5 pr-20 font-medium text-black">
                    <div className="shrink-0 my-auto w-2 h-2 bg-yellow-500 rounded-full" />
                    <div className="text-sm">Aftersale 4</div>

                </div>
                <div className="flex justify-center items-center bg-white rounded-2xl">
                    <img
                        loading="lazy"
                        src="/plus.svg"
                        className="w-55 h-5 aspect-square"
                    />
                </div>

            </div>
            {/* <div className="grid  grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 max-w-screen-xl ">


                {AfterSaleData.map((item, index:number) => (
                    <AfterSaleCard item={item} key={index} />
                ))}
            </div> */}
        </div>
    );
};

export default Page;
