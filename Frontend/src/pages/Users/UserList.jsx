import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { listUsers, } from "../../services/userDashboard";

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    const res = await listUsers();
    if (res.success) {
      setData(res.data.rows);
    } else {
      if (res.message == "Unauthorized") {
        localStorage.removeItem('userData');
        navigate("/login");
      }
      alert(res.message);
      
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);


  const columns = [
    // { title: "S. No.", dataIndex: "id", key: "id" },
    { title: "UserName", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => navigate(`/user/${record.id}/edit`)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate("/user/form") }>
          New Company
        </Button>
      </Space> */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};

export default UserList;
