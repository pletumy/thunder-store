import { InboxOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import { LineChart } from '../Layout/Chart';

const formatter = (value) => <CountUp duration={1.2} end={value} separator="," />;
function Home() {
    return (
        <>
            <Row gutter={16}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            style={{ display: 'inline' }}
                            title="Active Users"
                            prefix={<UserOutlined />}
                            value={112893}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total sells"
                            value={123000000}
                            prefix={<WalletOutlined />}
                            suffix=" &#8363;"
                            precision={2}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total Orders"
                            prefix={<InboxOutlined />}
                            value={578}
                            precision={2}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Average order value"
                            value={1000000}
                            prefix={<WalletOutlined />}
                            suffix=" &#8363;"
                            precision={2}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>
            <LineChart />
        </>
    );
}

export default Home;
