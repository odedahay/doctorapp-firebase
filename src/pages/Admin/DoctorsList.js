import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';
import { message, Table } from 'antd';
import { GetAllDoctors, UpdateDoctor } from '../../apicalls/doctors';

function DoctorsList() {
    const [doctors, setDoctors] = React.useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(ShowLoader(true));
            const response = await GetAllDoctors();
            dispatch(ShowLoader(false));
            if (response.success) {
                setDoctors(response.data)
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(ShowLoader(false));
            message.error(error.message)
        }
    };
    const changeStatus = async(payload) =>{
        try {
            dispatch(ShowLoader(true));
            const response = await UpdateDoctor(payload);
            dispatch(ShowLoader(false));
            if(response.success){
                message.success(response.message);
                getData();
            }else{
                throw new Error(response.message);
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getData();
    }, []);
    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName"
        },
        {
            title: "Last Name",
            dataIndex: "lastName"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "phone",
            dataIndex: "phone"
        },
        {
            title: "Speciality",
            dataIndex: "speciality"
        },
        {
            title: "status",
            dataIndex: "status",
            render: (status) => status.toUpperCase()
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (text, record) => {
                if (record.status === "pending") {
                    return (
                        <div className="flex gap-1">
                            <span className="underline cursor-pointer"
                                onClick={() => {
                                    changeStatus({
                                        ...record,
                                        status: "rejected"
                                    })
                                }}
                            >Reject</span>
                            <span className="underline cursor-pointer"
                                onClick={() => {
                                    changeStatus({
                                        ...record,
                                        status: "approved"
                                    })
                                }}
                            >Approve</span>
                        </div>
                    )
                }
                if (record.status === "rejected") {
                    return (
                        <div className="flex gap-1">
                            <span className="underline cursor-pointer"
                                onClick={() => {
                                    changeStatus({
                                        ...record,
                                        status: "pending"
                                    })
                                }}
                            >Restore</span>
                            <span className="underline cursor-pointer"
                                onClick={() => {
                                    changeStatus({
                                        ...record,
                                        status: "approved"
                                    })
                                }}
                            >Approve</span>
                        </div>
                    )
                }
                if (record.status === "approved") {
                    return (
                        <div className="flex gap-1">
                            <span className="underline cursor-pointer"
                             onClick={() => {
                                changeStatus({
                                    ...record,
                                    status: "blocked"
                                })
                            }}
                            >Block</span>
                        </div>
                    )
                }
                if (record.status === "blocked") {
                    return (
                        <div className="flex gap-1">
                            <span className="underline cursor-pointer"
                            onClick={() => {
                                changeStatus({
                                    ...record,
                                    status: "approved"
                                })
                            }}
                            >Unblock</span>
                        </div>
                    )
                }
            }
        }
    ]
    return (
        <div>
            <Table columns={columns} dataSource={doctors} />
        </div>
    )
}

export default DoctorsList
