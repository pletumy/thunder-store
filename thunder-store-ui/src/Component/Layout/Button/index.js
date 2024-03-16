import { Link } from 'react-router-dom';

function Button({ to, icon, href, className, disabled = false, children, onClick, ...passProps }) {
    let Comp = 'button';
    let props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp {...props} className={className}>
            {icon && <span className="icon">{icon}</span>}
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
