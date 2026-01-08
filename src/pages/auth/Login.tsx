import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, GraduationCap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore, getRoleDashboardPath } from '@/store/authStore';
import { mockApi, UserRole } from '@/api/mock';
import { toast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const demoAccounts = [
  { role: 'admin' as UserRole, email: 'admin@demo.com', label: 'Admin Account' },
  { role: 'teacher' as UserRole, email: 'teacher@demo.com', label: 'Teacher Account' },
  { role: 'finance' as UserRole, email: 'finance@demo.com', label: 'Finance Account' },
  { role: 'kitchen' as UserRole, email: 'kitchen@demo.com', label: 'Kitchen Account' },
  { role: 'parent' as UserRole, email: 'parent@demo.com', label: 'Parent Account' },
  { role: 'student' as UserRole, email: 'student@demo.com', label: 'Student Account' },
  { role: 'admin' as UserRole, email: 'plans@demo.local', label: 'Plans (Tariflar)' },
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const user = await mockApi.login(data.email, data.password);
      if (user) {
        login(user);
        toast({
          title: 'Welcome back!',
          description: `Logged in as ${user.name}`,
        });
        if (user.email === 'plans@demo.local') {
          navigate('/plans');
        } else {
          navigate(getRoleDashboardPath(user.role));
        }
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Try Demo1234 as password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectDemoAccount = (account: typeof demoAccounts[0]) => {
    setValue('email', account.email);
    setValue('password', 'Demo1234');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-primary via-primary to-green-dark" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground">Iftixor School</h1>
              <p className="text-primary-foreground/70">Digital Platform</p>
            </div>
          </div>
          <h2 className="text-4xl xl:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Manage Your School
            <br />
            <span className="text-primary-foreground/80">Smarter & Faster</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-md">
            A comprehensive solution for modern educational institutions. 
            Streamline administration, enhance teaching, and engage parents.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-3xl font-bold text-primary-foreground">50+</p>
              <p className="text-sm text-primary-foreground/70">Schools Connected</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-3xl font-bold text-primary-foreground">10K+</p>
              <p className="text-sm text-primary-foreground/70">Students Managed</p>
            </div>
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary-foreground/5" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-foreground/5" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Iftixor School</h1>
              <p className="text-sm text-muted-foreground">Digital Platform</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or try demo</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                Demo Accounts
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-popover" align="center">
              {demoAccounts.map((account) => (
                <DropdownMenuItem
                  key={account.role}
                  onClick={() => selectDemoAccount(account)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{account.label}</span>
                    <span className="text-xs text-muted-foreground">{account.email}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;