import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Flex } from 'antd';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Container = styled.section`
    width: 70%;
    margin: 20px auto;
`;

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Doanh thu tháng overview',
        },
    },
    scales: {
        x: {
            ticks: {
                stepSize: 2,
            },
            title: {
                display: true,
                text: 'Ngày trong tháng',
            },
        },
        y: {
            ticks: {
                stepSize: 1,
                callback: (value) => value + ' Tr',
            },
            title: {
                display: true,
                text: 'Doanh thu',
            },
        },
    },
};

export function LineChart() {
    const [month, setMonth] = useState(new Date());
    const [data, setData] = useState(null);

    const getCurrentMonthDays = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };
    const [labels, setLabels] = useState(() => {
        const daysInMonth = getCurrentMonthDays(month.getFullYear(), month.getMonth());
        return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
    });

    //chart data

    useEffect(() => {
        const getData = () => {
            return {
                labels,
                datasets: [
                    {
                        label: 'Doanh thu',
                        data: labels?.map(() => faker.number.int({ min: 1, max: 10 })),
                        tension: 0.2,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(245, 145, 33,0.2)',
                        borderColor: 'rgba(245, 145, 33,0.8)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#212121',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#f59121',
                        pointHoverBorderColor: 'rgba(255,255,255,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    },
                ],
            };
        };

        setData(getData());
    }, [labels]);
    // date

    const handleChangeMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = getCurrentMonthDays(year, month);

        const newLabels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

        setMonth(date);
        setLabels(newLabels);
    };

    return (
        <Container>
            <Flex justify="flex-end">
                <ReactDatePicker
                    selected={month}
                    onChange={(date) => handleChangeMonth(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    className="datepicker-custom"
                />
            </Flex>
            {data && <Line options={options} data={data} />}
        </Container>
    );
}
export default LineChart;
