import Logo from '../../components/ui/logo'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="flex min-h-screen bg-primaryColor flex-col justify-center items-center">
      <Logo className="mb-4" />
      <div className="bg-white border-2 border-primary px-12 py-8 shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center gap-y-8">
          <h1 className="h1">404 - Not Found</h1>
            <Link className="text-secondaryColor underline" to="/login">Go back to login</Link>
        </div>
      </div>
    </div>
  )
}

export default Error
