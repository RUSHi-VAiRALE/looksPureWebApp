import LoginRegister from '@/components/auth/LoginRegister';

export const metadata = {
  title: 'Login - LooksPure',
  description: 'Sign in to your LooksPure account',
};

export default function LoginPage() {
  return <LoginRegister mode="login" />;
}