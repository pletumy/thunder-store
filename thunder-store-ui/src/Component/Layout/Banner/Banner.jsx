import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { styled } from 'styled-components';

const Description = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: var(--white-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;
    user-select: none;
    & .title {
        font-family: 'Satisfy', cursive;
        font-size: 3rem;
        animation: fadeUp ease-in-out 0.6s;
    }
    & .heading {
        letter-spacing: 2px;
        font-size: 10rem;
        font-weight: 900;
        text-shadow: 1px 3px 0 #969696, 1px 13px 5px #aba8a8;
        text-transform: uppercase;

        animation: fadeUp ease-in-out 0.7s;
    }
    & .description {
        font-size: 1.4rem;
        color: var(--white-color);
        max-width: 50%;
        animation: fadeUp ease-in-out 0.8s;
    }
    & .button {
        color: var(--white-color);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
        font-size: 2rem;
        background-color: transparent;
        border: 2px solid var(--white-color);
        border-radius: 6px;
        margin-top: 30px;
        text-transform: uppercase;
        animation: fadeUp ease-in-out 0.9s;
    }
`;
function Banner() {
    return (
        <>
            <Swiper
                style={{ position: 'relative' }}
                navigation={{
                    nextEl: '.button-next-slide',
                    prevEl: '.button-prev-slide',
                }}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        src="https://bramsfruit.com/wp-content/uploads/2021/12/BF-lookbook-FW21-total.jpg"
                        alt="banner"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://bramsfruit.com/wp-content/uploads/2021/12/BF-lookbook-FW21-total.jpg"
                        alt="banner"
                    />
                </SwiperSlide>
                <div className="button-next-slide">
                    <GrNext />
                </div>
                <div className="button-prev-slide">
                    <GrPrevious />
                </div>
                <Description>
                    <span className="title">BST XUÂN HÈ 2024</span>
                    <h1 className="heading">DAILY VIBES</h1>
                    <span className="description">
                    Mỗi chiếc áo hoodies trong bộ sưu tập "Daily vibes" được tạo ra với sự tinh tế và tâm huyết. Thiết kế đa dạng, từ những họa tiết đơn giản như logo Thunder đến những hình in độc đáo và sắc nét, mang đến một cái nhìn mới mẻ và trẻ trung. 
                    </span>
                    <button className="button">MUA NGAY</button>
                </Description>
            </Swiper>
        </>
    );
}

export default Banner;
