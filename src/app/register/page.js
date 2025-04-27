import LoginRegister from '@/components/auth/LoginRegister';

export const metadata = {
  title: 'Register - LooksPure',
  description: 'Create your LooksPure account',
};

export default function RegisterPage() {
  return <LoginRegister mode="register" />;
}