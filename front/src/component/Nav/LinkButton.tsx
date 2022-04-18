import { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
}

/**
 * Style-less component. It is a button. And it has an attribute named `to`,
 * which work like the component `Link` in the react-router.
 */
const LinkButton = (props: ButtonProps) => {
  const { to, ...rest } = props;
  const navigate = useNavigate();

  return <button onClick={() => navigate(to)} {...rest} />;
};

export default LinkButton;
