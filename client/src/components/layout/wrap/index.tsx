import { ReactNode } from "react"

interface Props {
  children: ReactNode,
  className?: string
}

const Wrap: React.FC<Props> = ({children, className}) => {
  return <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>
};

export default Wrap