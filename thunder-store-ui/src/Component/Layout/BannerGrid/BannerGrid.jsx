import { styled } from 'styled-components';
const ImgWrap = styled.div`
    & img {
        width: 300px;
        height: 400px;
        object-fit: cover;
        border-radius: 6px;
    }
`;
const Container = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    gap: 0 20px;
    padding: 30px;
    border-radius: 6px;
    background-color: var(--white-color);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);
`;
const WrapItem = styled.div`
    flex: 1 0;
    min-width: 300px;
    flex-shrink: 0;
    & span {
        display: block;
        font-size: 1.6rem;
        color: var(--gray-color);
        margin: 10px 0 20px 0;
        width: 80%;
    }
`;
const Heading = styled.p`
    width: 50%;
    font-size: 3rem;
    margin-top: 20px;
    font-weight: 700;
    font-family: 'Satisfy', cursive;
    color: var(--primary-color);
`;
function BannerGrid() {
    return (
        <Container className="container">
            <WrapItem>
                <Heading>Best Materials</Heading>
                <span>
                Chất liệu của các áo hoodies trong bộ sưu tập "Daily vibes" được chọn kỹ lưỡng để đảm bảo sự thoải mái và độ bền. 
                Chất liệu cotton mềm mại và thoáng khí giúp bạn cảm thấy thoải mái suốt cả ngày. Áo hoodies cũng được thiết kế với 
                kiểu dáng rộng rãi và cổ áo cao, tạo cảm giác ấm áp và bảo vệ bạn khỏi thời tiết lạnh giá.
                </span>
                <ImgWrap>
                    <img
                        src="https://bramsfruit.com/wp-content/uploads/2021/12/Brams-Fruit-30-10-2151105.jpg"
                        alt="review-1"
                    />
                </ImgWrap>
            </WrapItem>
            <WrapItem>
                <ImgWrap>
                    <img
                        src="https://bramsfruit.com/wp-content/uploads/2021/12/BF-lookbook-FW21.jpg"
                        alt="review-1"
                    />
                </ImgWrap>

                <Heading>Be Your Own</Heading>
                <span>
                Bên cạnh thiết kế và chất liệu, bộ sưu tập "Daily vibes" còn mang lại sự linh hoạt và tính ứng dụng. 
                Bạn có thể dễ dàng kết hợp áo hoodies với các trang phục khác nhau, từ jeans đơn giản đến váy hoặc 
                chân váy để tạo nên phong cách cá nhân riêng biệt. 
                </span>
            </WrapItem>
        </Container>
    );
}

export default BannerGrid;
