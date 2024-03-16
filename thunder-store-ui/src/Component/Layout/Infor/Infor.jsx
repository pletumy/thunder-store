import { BiLocationPlus } from 'react-icons/bi';
import { Address, InforMain } from './Infor.style';
import { useSelector } from 'react-redux';
import { defaultAddressSelector, inforUserSelector } from '~/redux/Selector/AuthSelector';
import ChangeAddress from './ChangeAddress';
import styled from 'styled-components';
import { AiOutlineWarning } from 'react-icons/ai';
const Error = styled.p`
    font-weight: 500;
    color: var(--error-color);
    display: flex;
    gap: 0 10px;
    align-items: center;
    margin: 10px 0;
`;
function Infor() {
    const currentUser = useSelector(inforUserSelector);
    const defaultAddress = useSelector(defaultAddressSelector);

    return (
        <InforMain>
            <strong>
                <BiLocationPlus /> Địa chỉ nhận hàng
            </strong>
            <Address>
                <div>
                    <div>
                        <strong>Tên:</strong> {currentUser?.displayName}
                    </div>
                    <div>
                        <strong>Số điện thoại:</strong> {currentUser?.phone}
                    </div>
                    {defaultAddress ? (
                        <>
                            <div>
                                <strong>Địa chỉ:</strong> {defaultAddress.address} , {defaultAddress.ward},
                                {defaultAddress.district}, {defaultAddress.city}
                                <span className="tag primary">Mặt định</span>
                            </div>
                        </>
                    ) : (
                        <Error>
                            <AiOutlineWarning />
                            Bạn chưa có địa chỉ hãy thêm địa chỉ mới.
                        </Error>
                    )}
                </div>
                <ChangeAddress />
            </Address>
        </InforMain>
    );
}

export default Infor;
