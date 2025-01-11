import LoginForm from "../../components/forms/login";
import Logo from "../../components/ui/logo";

const Login: React.FC = () => {

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col justify-center items-center">
      <Logo className="mb-4" />
      <div className="bg-white border-2 border-primary px-12 py-8 shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center gap-y-8">
          <h2 className="h2">Sign In</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
