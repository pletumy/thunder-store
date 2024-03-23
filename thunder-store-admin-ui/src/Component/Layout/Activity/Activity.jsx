import { BsBoxSeam } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { AiOutlineFileDone, AiOutlineFileSync } from 'react-icons/ai';
import { useState } from 'react';
const activities = [
    {
        icon: <BsBoxSeam size={30} />,
        title: 'Đã bán',
        data: 20,
        color: 'bg-green-400',
    },
    {
        icon: <AiOutlineFileDone size={30} />,
        title: 'Đơn hàng thành công',
        data: 20,
        color: 'bg-primary',
    },
    {
        icon: <TbTruckDelivery size={30} />,
        title: 'Đang vận chuyển',
        data: 1,
        color: ' bg-blue-400',
    },
    {
        icon: <AiOutlineFileSync size={30} />,
        title: 'Đơn hàng cần duyệt',
        data: 3,
        color: 'bg-red-500',
    },
];

function Activity() {
    const [totalPercent] = useState(() => {
        return activities?.reduce((i, item) => {
            return i + item.data;
        }, 0);
    });

    return (
        <>
            <div>
                {activities?.map((a) => {
                    const percent = (Number(a.data) / totalPercent) * 100;
                    return (
                        <div key={a.title}>
                            <div>{a.icon}</div>
                            <div>
                                {a.title}: <span>{a.data}</span>
                            </div>

                            <div>
                                <div>
                                    <div
                                        className={`${a.color}  text-xs font-mediu p-0.5 leading-none rounded-full`}
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Activity;
