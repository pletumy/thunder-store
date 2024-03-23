import { Button, Flex, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const { Item } = Form;

const EditUserForm = ({ user, setUser, onSubmit, onCancel }) => {
    const roles = useSelector((state) => state.users.roles);
    const [form] = Form.useForm();

    const rolesOptions = roles?.map((item) => ({ label: item.code, value: item.id }));

    const getRolesDefault = (userRoles) => {
        if (userRoles)
            return roles
                .filter((role) => userRoles.find((userRole) => userRole.id === role.id))
                .map((item) => ({
                    label: item?.code,
                    value: item?.id,
                }));
    };

    const handleChangeRoles = (value) => {
        setUser((prev) => ({ ...prev, roles: roles.filter((role) => value.includes(role.id)) }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({ ...prev, userDetails: { ...prev.userDetails, [name]: value } }));
    };
    const handleChangeStatus = (value) => {
        setUser((prev) => ({ ...prev, userDetails: { ...prev.userDetails, status: value } }));
    };

    const defaultValue = {
        ...user?.userDetails,
        roles: getRolesDefault(user?.roles),
        status: [{ label: user.userDetails.status, value: user.userDetails.status }],
    };

    useEffect(() => {
        form.setFieldsValue(defaultValue);
    }, [form, user]);

    return (
        <Form form={form} layout="vertical" initialValues={defaultValue} onFinish={onSubmit}>
            <Item name="username" label="Username" rules={[{ required: true }, { type: 'string', min: 6 }]}>
                <Input type="text" name="username" placeholder="Username" onChange={(e) => handleInputChange(e)} />
            </Item>

            <Item name="fristName" label="Frist Name" rules={[{ type: 'string', min: 6 }]}>
                <Input type="text" name="fristName" placeholder="fristName" onChange={(e) => handleInputChange(e)} />
            </Item>
            <Item name="lastName" label="LastName" rules={[{ type: 'string', min: 6 }]}>
                <Input type="text" name="lastName" placeholder="LastName" onChange={(e) => handleInputChange(e)} />
            </Item>
            <Item name="displayName" label="DisplayName" rules={[{ required: true }, { type: 'string', min: 6 }]}>
                <Input
                    type="text"
                    name="displayName"
                    placeholder="DisplayName"
                    onChange={(e) => handleInputChange(e)}
                />
            </Item>
            <Item name="email" label="Email" rules={[{ required: true }, { type: 'string', min: 6 }]}>
                <Input type="text" name="email" placeholder="Email" onChange={(e) => handleInputChange(e)} />
            </Item>
            <Item name="phone" label="Phone" rules={[{ required: true }, { type: 'string', min: 6 }]}>
                <Input type="text" name="phone" placeholder="phone" onChange={(e) => handleInputChange(e)} />
            </Item>

            <Item name="roles" label="Roles">
                <Select
                    virtual={false}
                    mode="multiple"
                    placeholder="Please select"
                    onChange={(value) => handleChangeRoles(value)}
                    options={rolesOptions}
                />
            </Item>
            <Item name="status" label="Status">
                <Select
                    virtual={false}
                    placeholder="Please select"
                    onChange={(value) => handleChangeStatus(value)}
                    options={[
                        { label: 'ACTIVE', value: 'ACTIVE' },
                        { label: 'TEMPORATY_BLOCKED', value: 'TEMPORATY_BLOCKED' },
                        { label: 'PERMANENT_BLOCKED', value: 'PERMANENT_BLOCKED' },
                    ]}
                />
            </Item>
            <Flex justify="flex-end" gap="small" wrap="wrap">
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Flex>
        </Form>
    );
};

export default EditUserForm;
