import { ConfigProvider } from 'antd';
import theme from './theme';
import './styles.scss';

function GlobalStyle({ children }) {
    return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}

export default GlobalStyle;
