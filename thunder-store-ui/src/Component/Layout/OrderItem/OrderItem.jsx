import { Link } from 'react-router-dom';
import { Header, Item, ItemWrap, Name, Price, Quantity } from './OrderItem.style';

function OrderItem({ items }) {
    return (
        <ItemWrap>
            <Header className="item">
                <Name>Sản phẩm</Name>
                <Quantity>Size</Quantity>
                <Quantity>Số Lượng </Quantity>
                <Price>Giá</Price>
            </Header>

            {items?.map((item) => {
                return (
                    <Item key={item.id}>
                        <Link to={`/details/${item.id}`} className="image">
                            <img src={item.product.images[0].url} alt="sanpham" />
                        </Link>

                        <Name>{item.product.name}</Name>
                        <Quantity>
                            {item.product.sizes.find((s) => s.id === item.size || s.size === item.size)?.size}
                        </Quantity>

                        <Quantity>{item.quantity}</Quantity>

                        <Price>{Number(item.finalPrice || item.total).toLocaleString('en-US')} &#8363;</Price>
                    </Item>
                );
            })}
        </ItemWrap>
    );
}

export default OrderItem;
