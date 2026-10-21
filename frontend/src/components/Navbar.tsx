import { Logo } from '../icons/Logo';

interface NavbarProps {
  text: string;
}

export function Navbar({ text }: NavbarProps) {
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-slate-500 opacity-100 fixed top-0 left-0 right-0 z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <span className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {text}
            </span>
          </span>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="signup"
              className="text-md  text-blue-600 dark:text-blue-200 hover:underline"
            >
              Signup
            </a>

            <a
              href="signin"
              className="text-md  text-blue-600 dark:text-blue-200 hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
