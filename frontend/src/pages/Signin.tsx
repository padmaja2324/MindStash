import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'motion/react';
import { Brain, ArrowLeft, Lock, User, Loader2 } from 'lucide-react';
import { BACKEND_URL } from '../config';

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem('token', jwt);
      localStorage.setItem('username', username);
      setLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.response?.data?.message || 'Incorrect credentials');
    }
  }

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center p-4 text-[#17211C] font-sans relative overflow-hidden"
      style={{
        backgroundColor: '#F7FAF8',
        backgroundImage:
          'linear-gradient(rgba(20,60,45,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,60,45,0.04) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }}
    >
      {/* Light Mode Signin Card Container (#FFFFFF White) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white border border-[#D9E4DE] rounded-2xl p-8 shadow-sm z-10 space-y-6 relative"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E2F0E9] text-[#0D825B] mb-1">
            <Brain className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#17211C]">Welcome Back</h1>
          <p className="text-xs text-[#5F7068]">Sign in to your Mindstash workspace</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs text-center font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#5F7068] uppercase tracking-wider">
              Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 w-4 h-4 text-[#0D825B]" />
              <input
                ref={usernameRef}
                type="text"
                placeholder="Username"
                onKeyDown={(e) => e.key === 'Enter' && signin()}
                className="w-full bg-[#F7FAF8] border border-[#D9E4DE] rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-[#17211C] placeholder:text-[#7A8982] outline-none focus:border-[#0D825B] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#5F7068] uppercase tracking-wider">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-[#0D825B]" />
              <input
                ref={passwordRef}
                type="password"
                placeholder="••••••••"
                onKeyDown={(e) => e.key === 'Enter' && signin()}
                className="w-full bg-[#F7FAF8] border border-[#D9E4DE] rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-[#17211C] placeholder:text-[#7A8982] outline-none focus:border-[#0D825B] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={signin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#0D825B] hover:bg-[#0D825B]/90 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>

        {/* Footer Links */}
        <div className="pt-4 border-t border-[#EAF4EF] flex flex-col items-center gap-3 text-xs text-[#5F7068]">
          <p>
            Don&apos;t have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-[#0D825B] hover:underline font-bold cursor-pointer"
            >
              Sign Up
            </button>
          </p>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-[#5F7068] hover:text-[#17211C] transition-colors cursor-pointer text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
