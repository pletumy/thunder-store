import Popup from 'reactjs-popup';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Button from '~/Component/Layout/Button';
import { getUserId, inforUserSelector } from '~/redux/Selector/AuthSelector';
import { FaLocationDot } from 'react-icons/fa6';
import { AddressList } from './Infor.style';
import { BsSendPlusFill } from 'react-icons/bs';
import { useState } from 'react';
import { setDefaultAddressApi } from '~/Apis/ProfileApi';
import { Address } from '~/Component/Page';
import useAxiosJwt from '~/Component/Hook/useAxiosjwt';

function ChangeAddress() {
    const currentUser = useSelector(inforUserSelector);
    const userId = useSelector(getUserId);

    const [openCreateAddress, setOpenCreateAddress] = useState(false);
    const { getAxiosJwt, dispatch } = useAxiosJwt();

    const handleChangeAddress = (id, close) => {
        const data = {
            userId,
            addressId: id,
        };
        const axiosJwt = getAxiosJwt();

        if (axiosJwt) {
            setDefaultAddressApi(data, dispatch, axiosJwt);
        }
        close();
    };
    return (
        <>
            <Popup
                trigger={
                    <div className="delte-btn btn btn-s">
                        <Button type="button" className="btn btn-outline">
                            Thay đổi
                        </Button>
                    </div>
                }
                modal
            >
                {(close) => (
                    <div className="modal">
                        <button className="modal_close" onClick={close}>
                            <FaTimes />
                        </button>
                        {openCreateAddress || <div className="modal_header"> Chọn địa chỉ </div>}
                        <div className="modal_content">
                            {!openCreateAddress ? (
                                <AddressList>
                                    {currentUser?.userAddress.map((address) => {
                                        return !address.defaultAddress ? (
                                            <div
                                                onClick={() => handleChangeAddress(address.id, close)}
                                                className="item"
                                                key={address.id}
                                            >
                                                <span className="icon">
                                                    <FaLocationDot />
                                                </span>
                                                <p>
                                                    {address.address}, {address.ward}, {address.district},{' '}
                                                    {address.city}
                                                </p>
                                            </div>
                                        ) : null;
                                    })}
                                    <div className="item">
                                        <span className="icon">
                                            <BsSendPlusFill />
                                        </span>
                                        <p className="primary-color" onClick={() => setOpenCreateAddress(true)}>
                                            Thêm địa chỉ mới
                                        </p>
                                    </div>
                                </AddressList>
                            ) : (
                                <Address closeModal={close} />
                            )}
                        </div>
                        <div className="modal_actions">
                            {!openCreateAddress ? (
                                <Button
                                    onClick={() => {
                                        close();
                                    }}
                                    className="btn btn-warning"
                                >
                                    Lưu
                                </Button>
                            ) : (
                                <Button onClick={() => setOpenCreateAddress(false)}>Quay lại</Button>
                            )}
                        </div>
                    </div>
                )}
            </Popup>
        </>
    );
}

export default ChangeAddress;
