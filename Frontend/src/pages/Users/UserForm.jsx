import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Form, Input, Button, Card, message } from "antd";
import {
  updateUser,
  getUser,
} from "../../services/userDashboard";
import userValidation from '../../validation/userValidation'


const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState({ username: "", email: "" });

  useEffect(() => {
    if (id) {
      (async () => {
        const getData = await getUser(id);
        if (getData.success){
          const data = getData.data.user || getData.data;
          setInitial({
            username: data?.username || "",
            email: data?.email || "",
          });
        }
      })();
    }
  }, [id]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
      <Card title={id ? "Edit User" : "New User"} style={{ width: 600 }}>
        <Formik
          enableReinitialize
          initialValues={initial}
          validationSchema={userValidation}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                username: values.username,
                email: values.email,
              }

              if (id) {
                const updateUserResponse = await updateUser(id, payload);
                if(updateUserResponse.success){
                  alert("User updated successfully");
                  navigate("/user");
                }
              } else {
                navigate("/user");
              }
            } catch (err) {
              message.error("Save failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleSubmit, setFieldValue, setFieldTouched, handleChange, handleBlur, errors, touched }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item 
                label="User Name"
                validateStatus={touched.username && errors.username ? "error" : ""}
                help={touched.username && errors.username ? errors.username : null}
              >
                <Input
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item 
                label="Email"
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : null}
              >
                <Input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={() => navigate("/user")}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default UserForm;
