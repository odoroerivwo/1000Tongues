'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Generate particles once using useMemo to avoid hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: (i * 13.7 + 23.5) % 100,
      top: (i * 17.3 + 41.2) % 100,
      opacity: 0.1 + (i % 3) * 0.1,
      duration: 8 + (i % 15),
      delay: i % 5,
    }));
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Small delay to ensure cookie is set before redirect
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (err) {
      console.error('Login request failed', err);
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={particle.id ?? index}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: particle.opacity,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.1;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-120px) translateX(80px) scale(1.2);
            opacity: 0.4;
          }
          75% {
            opacity: 0.2;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes borderFlow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Icon section */}
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center mb-6">
              {/* Glowing ring animation */}
              <div className="absolute w-24 h-24 border-2 border-white/20 rounded-3xl animate-ping opacity-20" />
              <div className="absolute w-24 h-24 border border-white/30 rounded-3xl animate-pulse" />

              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-gray-400 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                <Image
                  src="/1000 tonguessss 1.png"
                  alt="Admin Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <h1 className="text-5xl font-bold text-white tracking-tight">Welcome Back</h1>
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <p className="text-gray-400 text-lg">Sign in to continue your journey</p>
          </div>

          {/* Login card */}
          <div className="relative group">
            {/* Animated border gradient */}
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-white via-gray-500 to-white rounded-3xl opacity-20 group-hover:opacity-40 blur transition-all duration-500"
              style={{
                backgroundSize: '200% 200%',
                animation: 'borderFlow 3s ease infinite',
              }}
            />

            <div className="relative bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8">
              <div className="space-y-6">
                {/* Email field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90 tracking-wide">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-2xl blur-sm opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 ${
                        focusedField === 'email' ? 'opacity-100' : ''
                      }`}
                    />
                    <div className="relative">
                      <Mail
                        className={`absolute left-4 top-3.5 w-5 h-5 transition-all duration-300 ${
                          focusedField === 'email' ? 'text-white scale-110' : 'text-gray-500'
                        }`}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/20 focus:bg-white/10 backdrop-blur-sm transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90 tracking-wide">Password</label>
                  <div className="relative group/input">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-2xl blur-sm opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 ${
                        focusedField === 'password' ? 'opacity-100' : ''
                      }`}
                    />
                    <div className="relative">
                      <Lock
                        className={`absolute left-4 top-3.5 w-5 h-5 transition-all duration-300 ${
                          focusedField === 'password' ? 'text-white scale-110' : 'text-gray-500'
                        }`}
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField('')}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/20 focus:bg-white/10 backdrop-blur-sm transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors group/check">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded bg-white/10 border border-white/20 focus:ring-2 focus:ring-white/30 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors relative group/link">
                    Forgot password?
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full" />
                  </a>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="relative w-full group/button overflow-hidden mt-8"
                  type="button"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300 rounded-2xl" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: loading ? 'none' : 'shimmer 2s infinite',
                    }}
                  />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center justify-center gap-2 py-4 text-black font-bold text-lg">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Signing you in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Additional info */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Don&apos;t have an account?{' '}
                  <a href="#" className="text-white hover:text-gray-300 font-medium transition-colors relative group/signup">
                    Sign up for free
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/signup:w-full" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center mt-8 text-gray-600 text-xs">Protected by enterprise-grade security</p>
        </div>
      </div>
    </div>
  );
}
