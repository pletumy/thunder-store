import { BsBox, BsClipboardCheck } from 'react-icons/bs';
import { TbPackages, TbTruckDelivery } from 'react-icons/tb';
import { Progress } from './ProgressBar.style';

function ProgressBar({ order }) {
    const currentItem = order.orderDetails.orderDetailsStatus;

    return (
        <Progress>
            <ul className="step-list">
                <li className={`step-item ${currentItem === 'NOT_READY' ? ' current-item' : ''}`}>
                    <span className="progress-count">1</span>
                    <span className="progress-label">
                        <span className="icon">
                            <BsClipboardCheck />
                        </span>
                        Chờ xác nhận
                    </span>
                </li>
                <li className={`step-item ${currentItem === 'PREPARING_ORDER' ? ' current-item' : ''}`}>
                    <span className="progress-count">2</span>
                    <span className="progress-label">
                        <span className="icon">
                            <TbPackages />
                        </span>
                        Đơn hàng đang chuẩn bị
                    </span>
                </li>
                <li className={`step-item ${currentItem === 'DELIVERING' ? ' current-item' : ''}`}>
                    <span className="progress-count">3</span>
                    <span className="progress-label">
                        <span className="icon">
                            <TbTruckDelivery />
                        </span>
                        Đang giao
                    </span>
                </li>
                <li className={`step-item ${currentItem === 'SUCCESS' ? ' current-item' : ''}`}>
                    <span className="progress-count">4</span>
                    <span className="progress-label">
                        <span className="icon">
                            <BsBox />
                        </span>
                        Nhận hàng thành công
                    </span>
                </li>
            </ul>
        </Progress>
    );
}

export default ProgressBar;
