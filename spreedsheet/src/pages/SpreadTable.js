import { useState, useEffect } from 'react'
import axios from 'axios';
import { CSVLink } from "react-csv"
import { Table, DatePicker, Row, Col, Button, Modal, Input, InputNumber, Typography, Form, Popconfirm } from 'antd';
import { DownloadOutlined, AppstoreAddOutlined, UserOutlined } from '@ant-design/icons';
const { Title } = Typography;

const SpreadTable = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employee, setEmployee] = useState('');
    const [monday, setMonday] = useState('2023-05-07');
    const [tuesday, setTuesday] = useState('2023-05-08');
    const [wednesday, setWednesday] = useState('2023-05-09');
    const [thursday, setThursday] = useState('2023-05-10');
    const [friday, setFriday] = useState('2023-05-11');
    const [saturday, setSaturday] = useState('2023-05-12');
    const [sunday, setSunday] = useState('2023-05-13');
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [nth_week, setNthWeek] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps} >
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                            border: '0px',
                        }}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            fixed: 'left',
            editable: true,
        },
        {
            title: monday,
            editable: true,
            children: [
                {
                    title: 'Monday',
                    editable: true,
                    children: [
                        {
                            title: 'Rate',
                            dataIndex: 'monday_rate',
                            key: 'monday_rate',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Hrs',
                            dataIndex: 'monday_hrs',
                            key: 'monday_hrs',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Tips',
                            dataIndex: 'monday_tips',
                            key: 'monday_tips',
                            editable: true,
                            width: 60,
                        },
                    ],
                }
            ]
        },
        {
            title: tuesday,
            editable: true,
            children: [
                {
                    title: 'Tuesday',
                    editable: true,
                    children: [
                        {
                            title: 'Rate',
                            dataIndex: 'tuesday_rate',
                            key: 'tuesday_rate',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Hrs',
                            dataIndex: 'tuesday_hrs',
                            key: 'tuesday_hrs',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Tips',
                            dataIndex: 'tuesday_tips',
                            key: 'tuesday_tips',
                            editable: true,
                            width: 60,
                        },
                    ],
                }
            ]
        },
        {
            title: wednesday,
            editable: true,
            children: [
                {
                    title: 'Wednesday',
                    editable: true,
                    children: [
                        {
                            title: 'Rate',
                            dataIndex: 'wednesday_rate',
                            key: 'wednesday_rate',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Hrs',
                            dataIndex: 'wednesday_hrs',
                            key: 'wednesday_hrs',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Tips',
                            dataIndex: 'wednesday_tips',
                            key: 'wednesday_tips',
                            editable: true,
                            width: 60,
                        },
                    ],
                }
            ]
        },
        {
            title: thursday,
            editable: true,
            children: [
                {
                    title: 'Thursday',
                    editable: true,
                    children: [
                        {
                            title: 'Rate',
                            dataIndex: 'thursday_rate',
                            key: 'thursday_rate',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Hrs',
                            dataIndex: 'thursday_hrs',
                            key: 'thursday_hrs',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Tips',
                            dataIndex: 'thursday_tips',
                            key: 'thursday_tips',
                            editable: true,
                            width: 60,
                        },
                    ],
                }
            ]
        },
        {
            title: friday,
            editable: true,
            children: [
                {
                    title: 'Friday',
                    editable: true,
                    children: [
                        {
                            title: 'Rate',
                            dataIndex: 'friday_rate',
                            key: 'friday_rate',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Hrs',
                            dataIndex: 'friday_hrs',
                            key: 'friday_hrs',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Tips',
                            dataIndex: 'friday_tips',
                            key: 'friday_tips',
                            editable: true,
                            width: 60,
                        },
                    ],
                }
            ]
        },
        {
            title: saturday,
            editable: true,
            children: [
                {
                    title: 'Saturday',
                    editable: true,
                    children: [
                        {
                            title: 'Rate',
                            dataIndex: 'saturday_rate',
                            key: 'saturday_rate',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Hrs',
                            dataIndex: 'saturday_hrs',
                            key: 'saturday_hrs',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Tips',
                            dataIndex: 'saturday_tips',
                            key: 'saturday_tips',
                            editable: true,
                            width: 60,
                        },
                    ],
                }
            ]
        },
        {
            title: sunday,
            editable: true,
            children: [
                {
                    title: 'Sunday',
                    editable: true,
                    children: [
                        {
                            title: 'Rate',
                            dataIndex: 'sunday_rate',
                            key: 'sunday_rate',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Hrs',
                            dataIndex: 'sunday_hrs',
                            key: 'sunday_hrs',
                            editable: true,
                            width: 60,
                        },
                        {
                            title: 'Tips',
                            dataIndex: 'sunday_tips',
                            key: 'sunday_tips',
                            editable: true,
                            width: 60,
                        },
                    ],
                }
            ]
        },
        {
            title: 'Total Hrs',
            dataIndex: 'total_hrs',
            key: 'total_hrs',
            width: 100,
            align: 'center',
            fixed: 'right'
        },
        {
            title: 'Total $',
            dataIndex: 'total_rate',
            key: 'total_rate',
            align: 'center',
            width: 100,
            fixed: 'right'
        },
        {
            title: 'Total Tips',
            dataIndex: 'total_tips',
            key: 'total_tips',
            align: 'center',
            width: 100,
            fixed: 'right'
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: 120,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>

                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>&nbsp;|&nbsp;
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const mapColumns = (col) => {
        if (!col.editable) {
            return col;
        }

        const newCol = {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'name' ? 'text' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };

        if (col.children) {
            newCol.children = col.children.map(mapColumns);
        }

        return newCol;
    };

    const mergedColumns = columns.map(mapColumns);

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            monday_rate: '',
            monday_hrs: '',
            monday_tips: '',
            tuesday_rate: '',
            tuesday_hrs: '',
            tuesday_tips: '',
            wednesday_rate: '',
            wednesday_hrs: '',
            wednesday_tips: '',
            thursday_rate: '',
            thursday_hrs: '',
            thursday_tips: '',
            friday_rate: '',
            friday_hrs: '',
            friday_tips: '',
            saturday_rate: '',
            saturday_hrs: '',
            saturday_tips: '',
            sunday_rate: '',
            sunday_hrs: '',
            sunday_tips: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });


                await axios.put(
                    `${process.env.REACT_APP_IP_ADDRESS}/spreadsheets/${newData[index].key}`,
                    {
                        employee: newData[index].name,
                        monday_rate: newData[index].monday_rate === '' ? 0 : newData[index].monday_rate,
                        monday_hrs: newData[index].monday_hrs === '' ? 0 : newData[index].monday_hrs,
                        monday_tips: newData[index].monday_tips === '' ? 0 : newData[index].monday_tips,
                        tuesday_rate: newData[index].tuesday_rate === '' ? 0 : newData[index].tuesday_rate,
                        tuesday_hrs: newData[index].tuesday_hrs === '' ? 0 : newData[index].tuesday_hrs,
                        tuesday_tips: newData[index].tuesday_tips === '' ? 0 : newData[index].tuesday_tips,
                        wednesday_rate: newData[index].wednesday_rate === '' ? 0 : newData[index].wednesday_rate,
                        wednesday_hrs: newData[index].wednesday_hrs === '' ? 0 : newData[index].wednesday_hrs,
                        wednesday_tips: newData[index].wednesday_tips === '' ? 0 : newData[index].wednesday_tips,
                        thursday_rate: newData[index].thursday_rate === '' ? 0 : newData[index].thursday_rate,
                        thursday_hrs: newData[index].thursday_hrs === '' ? 0 : newData[index].thursday_hrs,
                        thursday_tips: newData[index].thursday_tips === '' ? 0 : newData[index].thursday_tips,
                        friday_rate: newData[index].friday_rate === '' ? 0 : newData[index].friday_rate,
                        friday_hrs: newData[index].friday_hrs === '' ? 0 : newData[index].friday_hrs,
                        friday_tips: newData[index].friday_tips === '' ? 0 : newData[index].friday_tips,
                        saturday_rate: newData[index].saturday_rate === '' ? 0 : newData[index].saturday_rate,
                        saturday_hrs: newData[index].saturday_hrs === '' ? 0 : newData[index].saturday_hrs,
                        saturday_tips: newData[index].saturday_tips === '' ? 0 : newData[index].saturday_tips,
                        sunday_rate: newData[index].sunday_rate === '' ? 0 : newData[index].sunday_rate,
                        sunday_hrs: newData[index].sunday_hrs === '' ? 0 : newData[index].sunday_hrs,
                        sunday_tips: newData[index].sunday_tips === '' ? 0 : newData[index].sunday_tips,
                        nth_week: nth_week
                    }
                );

                newData.forEach(record => {
                    let tmp_tips = Number(record.monday_tips) + Number(record.tuesday_tips) + Number(record.wednesday_tips) + Number(record.thursday_tips) + Number(record.friday_tips) + Number(record.saturday_tips) + Number(record.sunday_tips);
                    let tmp_hrs = Number(record.monday_hrs) + Number(record.tuesday_hrs) + Number(record.wednesday_hrs) + Number(record.thursday_hrs) + Number(record.friday_hrs) + Number(record.saturday_hrs) + Number(record.sunday_hrs);
                    let tmp_rate = Number(record.monday_rate) * Number(record.monday_hrs) + Number(record.tuesday_rate) * Number(record.tuesday_hrs) + Number(record.wednesday_rate) * Number(record.wednesday_hrs) + Number(record.thursday_rate) * Number(record.thursday_hrs) + Number(record.friday_rate) * Number(record.friday_hrs) + Number(record.saturday_rate) * Number(record.saturday_hrs) + Number(record.sunday_rate) * Number(record.sunday_hrs);
                    record.total_tips = isNaN(tmp_tips) ? '0' : tmp_tips;
                    record.total_hrs = isNaN(tmp_hrs) ? '0' : tmp_hrs;
                    record.total_rate = isNaN(tmp_rate) ? '0' : tmp_rate;
                });

                console.log("-----------", newData[index], newData[index].key)
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                newData.forEach(record => {
                    let tmp_tips = Number(record.monday_tips) + Number(record.tuesday_tips) + Number(record.wednesday_tips) + Number(record.thursday_tips) + Number(record.friday_tips) + Number(record.saturday_tips) + Number(record.sunday_tips);
                    let tmp_hrs = Number(record.monday_hrs) + Number(record.tuesday_hrs) + Number(record.wednesday_hrs) + Number(record.thursday_hrs) + Number(record.friday_hrs) + Number(record.saturday_hrs) + Number(record.sunday_hrs);
                    let tmp_rate = Number(record.monday_rate) * Number(record.monday_hrs) + Number(record.tuesday_rate) * Number(record.tuesday_hrs) + Number(record.wednesday_rate) * Number(record.wednesday_hrs) + Number(record.thursday_rate) * Number(record.thursday_hrs) + Number(record.friday_rate) * Number(record.friday_hrs) + Number(record.saturday_rate) * Number(record.saturday_hrs) + Number(record.sunday_rate) * Number(record.sunday_hrs);
                    record.total_tips = isNaN(tmp_tips) ? '0' : tmp_tips;
                    record.total_hrs = isNaN(tmp_hrs) ? '0' : tmp_hrs;
                    record.total_rate = isNaN(tmp_rate) ? '0' : tmp_rate;
                });
                console.log("==============", newData[index], index)

                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        let newData = {
            key: data.length,
            name: employee,
            monday_rate: '',
            monday_hrs: '',
            monday_tips: '',
            tuesday_rate: '',
            tuesday_hrs: '',
            tuesday_tips: '',
            wednesday_rate: '',
            wednesday_hrs: '',
            wednesday_tips: '',
            thursday_rate: '',
            thursday_hrs: '',
            thursday_tips: '',
            friday_rate: '',
            friday_hrs: '',
            friday_tips: '',
            saturday_rate: '',
            saturday_hrs: '',
            saturday_tips: '',
            sunday_rate: '',
            sunday_hrs: '',
            sunday_tips: '',
            total_hrs: 0,
            total_rate: 0,
            total_tips: 0
        };

        const res = await axios.post(
            `${process.env.REACT_APP_IP_ADDRESS}/spreadsheets`,
            {
                employee: employee,
                nth_week: nth_week
            }
        );
        if (res.status === 200) {

            setData([...data, newData]);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDelete = async (key) => {
        await axios.delete(
            `${process.env.REACT_APP_IP_ADDRESS}/spreadsheets?id=${key}`
        );

        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };
    const onChange = async (date, dateString) => {
        setNthWeek(dateString);
        const res = await axios.get(
            `${process.env.REACT_APP_IP_ADDRESS}/spreadsheets?nth_week=${dateString}`
        );
        if (res.status === 200) {
            if (res.data.length) {
                let newData = [];
                res.data.forEach(record => {
                    newData.push({
                        key: record.id,
                        name: record.employee,
                        monday_rate: record.monday_rate === null ? '' : record.monday_rate,
                        monday_hrs: record.monday_hrs === null ? '' : record.monday_hrs,
                        monday_tips: record.monday_tips === null ? '' : record.monday_tips,
                        tuesday_rate: record.tuesday_rate === null ? '' : record.tuesday_rate,
                        tuesday_hrs: record.tuesday_hrs === null ? '' : record.tuesday_hrs,
                        tuesday_tips: record.tuesday_tips === null ? '' : record.tuesday_tips,
                        wednesday_rate: record.wednesday_rate === null ? '' : record.wednesday_rate,
                        wednesday_hrs: record.wednesday_hrs === null ? '' : record.wednesday_hrs,
                        wednesday_tips: record.wednesday_tips === null ? '' : record.wednesday_tips,
                        thursday_rate: record.thursday_rate === null ? '' : record.thursday_rate,
                        thursday_hrs: record.thursday_hrs === null ? '' : record.thursday_hrs,
                        thursday_tips: record.thursday_tips === null ? '' : record.thursday_tips,
                        friday_rate: record.friday_rate === null ? '' : record.friday_rate,
                        friday_hrs: record.friday_hrs === null ? '' : record.friday_hrs,
                        friday_tips: record.friday_tips === null ? '' : record.friday_tips,
                        saturday_rate: record.saturday_rate === null ? '' : record.saturday_rate,
                        saturday_hrs: record.saturday_hrs === null ? '' : record.saturday_hrs,
                        saturday_tips: record.saturday_tips === null ? '' : record.saturday_tips,
                        sunday_rate: record.sunday_rate === null ? '' : record.sunday_rate,
                        sunday_hrs: record.sunday_hrs === null ? '' : record.sunday_hrs,
                        sunday_tips: record.sunday_tips === null ? '' : record.sunday_tips
                    });
                });
                newData.forEach(record => {
                    let tmp_tips = Number(record.monday_tips) + Number(record.tuesday_tips) + Number(record.wednesday_tips) + Number(record.thursday_tips) + Number(record.friday_tips) + Number(record.saturday_tips) + Number(record.sunday_tips);
                    let tmp_hrs = Number(record.monday_hrs) + Number(record.tuesday_hrs) + Number(record.wednesday_hrs) + Number(record.thursday_hrs) + Number(record.friday_hrs) + Number(record.saturday_hrs) + Number(record.sunday_hrs);
                    let tmp_rate = Number(record.monday_rate) * Number(record.monday_hrs) + Number(record.tuesday_rate) * Number(record.tuesday_hrs) + Number(record.wednesday_rate) * Number(record.wednesday_hrs) + Number(record.thursday_rate) * Number(record.thursday_hrs) + Number(record.friday_rate) * Number(record.friday_hrs) + Number(record.saturday_rate) * Number(record.saturday_hrs) + Number(record.sunday_rate) * Number(record.sunday_hrs);
                    record.total_tips = isNaN(tmp_tips) ? '0' : tmp_tips;
                    record.total_hrs = isNaN(tmp_hrs) ? '0' : tmp_hrs;
                    record.total_rate = isNaN(tmp_rate) ? '0' : tmp_rate;
                });
                setData(newData);
            } else {
                setData([]);
            }
        }
        const startOfWeek = date.startOf('week').format('YYYY-MM-DD');
        setMonday(startOfWeek);
        let dd = new Date(startOfWeek);
        dd.setDate(dd.getDate() + 1);
        let nextDate = dd.toISOString().slice(0, 10);
        setTuesday(nextDate);
        dd.setDate(dd.getDate() + 1);
        nextDate = dd.toISOString().slice(0, 10);
        setWednesday(nextDate);
        dd.setDate(dd.getDate() + 1);
        nextDate = dd.toISOString().slice(0, 10);
        setThursday(nextDate);
        dd.setDate(dd.getDate() + 1);
        nextDate = dd.toISOString().slice(0, 10);
        setFriday(nextDate);
        dd.setDate(dd.getDate() + 1);
        nextDate = dd.toISOString().slice(0, 10);
        setSaturday(nextDate);
        dd.setDate(dd.getDate() + 1);
        nextDate = dd.toISOString().slice(0, 10);
        setSunday(nextDate);
    };

    return (
        <Row style={{ display: "inline-block" }}>
            <Title >Employee SpreadSheet</Title>
            <Row style={{ margin: "10px", float: 'right' }}>
                <Col >
                    <DatePicker onChange={onChange} picker="week" />
                </Col>
                <Col style={{ marginLeft: '10px' }}>
                    <Button type="primary" shape="round" icon={<AppstoreAddOutlined />} onClick={showModal}>
                        Add Employee
                    </Button>
                </Col>
                <Col style={{ marginLeft: '10px' }}>
                    <Button type="primary" shape="round" icon={<DownloadOutlined />}>
                        <CSVLink
                            filename={"Expense_Table.csv"}
                            data={data}
                            className="btn btn-primary"
                        >
                            Export to CSV
                        </CSVLink>
                    </Button>
                </Col>
            </Row>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    pagination={{
                        onChange: cancel,
                    }}
                    scroll={{
                        x: 'calc(700px + 50%)',
                    }}
                    style={{ padding: "10px" }}
                />
            </Form>

            <Modal title="Add Employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Row style={{ marginTop: "30px" }}>
                    <Input placeholder="Employee name" prefix={<UserOutlined />} style={{ marginBottom: "10px" }} value={employee} onChange={(e) => setEmployee(e.target.value)} />
                </Row>
            </Modal>
        </Row>
    )
};
export default SpreadTable;