import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Screen } from "../types";

interface AuthProps {
  navigate: (screen: Screen) => void;
}

export const WelcomeScreen: React.FC<AuthProps> = ({ navigate }) => {
  return (
    <Layout className="bg-primary flex flex-col items-center min-h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mt-[-8vh]">
        <div className="text-white text-4xl font-display font-bold tracking-tight mb-4 flex items-center gap-1">
          Goudela<span className="text-secondary text-4xl">•</span>
        </div>
        <p className="text-white/80 text-center text-[16px] font-medium max-w-[280px] mb-12">
          Envoyer en un clic. Reçu instantanément en Haïti
        </p>

        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => navigate(Screen.REGISTER)}
            className="w-full bg-secondary text-white font-bold h-14 rounded-xl shadow-sm transition-all active:scale-[0.98]"
          >
            Sign up
          </button>
          <button
            onClick={() => navigate(Screen.LOGIN)}
            className="w-full bg-white text-primary font-bold h-14 rounded-xl shadow-sm transition-all active:scale-[0.98]"
          >
            Sign in
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4 text-white/70 text-xs pb-6 mt-auto">
        <div className="flex gap-6">
          <button onClick={() => navigate(Screen.ABOUT)} className="hover:text-white transition-colors">
            About Us
          </button>
          <button onClick={() => navigate(Screen.CONTACT)} className="hover:text-white transition-colors">
            Contact
          </button>
          <button onClick={() => navigate(Screen.TERMS)} className="hover:text-white transition-colors">
            Terms
          </button>
          <button onClick={() => navigate(Screen.PRIVACY)} className="hover:text-white transition-colors">
            Privacy
          </button>
        </div>
        <p className="text-white/40">© 2026 Goudela Transfer. All rights reserved.</p>
      </div>
    </Layout>
  );
};

export const LoginScreen: React.FC<AuthProps> = ({ navigate }) => {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("email");

  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <div className="flex-1 px-6 pt-12 flex flex-col items-center">
        <div className="text-primary dark:text-white text-3xl font-display font-bold tracking-tight mb-10 flex items-center gap-1">
          Goudela<span className="text-secondary text-3xl">•</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Login to your Account</h2>

          <form className="flex flex-col gap-4">
            <div>
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => setLoginMethod(loginMethod === "phone" ? "email" : "phone")}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Use {loginMethod === "phone" ? "Email" : "Phone Number"} instead
                </button>
              </div>
              {loginMethod === "phone" ? (
                <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <select className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 px-3 text-sm font-medium outline-none text-slate-700 dark:text-gray-300">
                    <option value="+1">US/CA (+1)</option>
                    <option value="+33">FR (+33)</option>
                    <option value="+56">CL (+56)</option>
                    <option value="+55">BR (+55)</option>
                    <option value="+1809">DO (+1)</option>
                    <option value="+44">UK (+44)</option>
                    <option value="+34">ES (+34)</option>
                    <option value="+52">MX (+52)</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="flex-1 h-12 bg-white dark:bg-card-dark px-4 outline-none text-sm"
                  />
                </div>
              ) : (
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                />
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => navigate(Screen.FORGOT_PASSWORD)}
                  className="text-primary text-xs font-medium"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => navigate(Screen.DASHBOARD)}
                className="flex-1 min-w-0 bg-primary hover:bg-primary-dark text-white font-medium h-12 rounded-lg shadow-md shadow-primary/20 active:scale-[0.98] transition-all whitespace-nowrap overflow-hidden text-ellipsis px-2"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => navigate(Screen.DASHBOARD)}
                className="w-12 h-12 flex-shrink-0 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-primary rounded-lg shadow-sm flex items-center justify-center active:scale-[0.98] transition-all"
                title="Sign in with Fingerprint"
              >
                <span className="material-symbols-outlined">fingerprint</span>
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative bg-white dark:bg-surface-dark px-4 text-xs text-gray-400">
                - Or sign in with -
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-sm font-medium text-slate-700 dark:text-white">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button onClick={() => navigate(Screen.REGISTER)} className="text-primary font-medium">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const RegisterScreen: React.FC<AuthProps> = ({ navigate }) => {
  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <div className="flex-1 px-6 pt-8 flex flex-col items-center">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => navigate(Screen.WELCOME)} className="text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>

        <div className="text-primary dark:text-white text-3xl font-display font-bold tracking-tight mb-8 flex items-center gap-1">
          Goudela<span className="text-secondary text-3xl">•</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Create your Account</h2>

          <form className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Prénom"
                className="w-1/2 h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
              />
              <input
                type="text"
                placeholder="Nom"
                className="w-1/2 h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
            />

            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <select className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 px-3 text-sm font-medium outline-none text-slate-700 dark:text-gray-300">
                <option value="+1">US/CA (+1)</option>
                <option value="+33">FR (+33)</option>
                <option value="+56">CL (+56)</option>
                <option value="+55">BR (+55)</option>
                <option value="+1809">DO (+1)</option>
                <option value="+44">UK (+44)</option>
                <option value="+34">ES (+34)</option>
                <option value="+52">MX (+52)</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                className="flex-1 h-12 bg-white dark:bg-card-dark px-4 outline-none text-sm"
              />
            </div>

            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
            />

            <button
              type="button"
              onClick={() => navigate(Screen.OTP)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium h-12 rounded-lg shadow-md shadow-primary/20 mt-2 active:scale-[0.98] transition-all"
            >
              Sign up
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative bg-white dark:bg-surface-dark px-4 text-xs text-gray-400">
                - Or sign up with -
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-sm font-medium text-slate-700 dark:text-white">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>
          </div>

          <div className="mt-8 text-center pb-6">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button onClick={() => navigate(Screen.LOGIN)} className="text-primary font-medium">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const ForgotPasswordScreen: React.FC<AuthProps> = ({ navigate }) => {
  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <div className="flex-1 px-6 pt-8 flex flex-col items-center">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => navigate(Screen.LOGIN)} className="text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>

        <div className="text-primary dark:text-white text-3xl font-display font-bold tracking-tight mb-8 flex items-center gap-1">
          Goudela<span className="text-secondary text-3xl">•</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Forgot Password</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your email or phone number to reset your password.</p>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
            />

            <button
              type="button"
              onClick={() => navigate(Screen.LOGIN)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium h-12 rounded-lg shadow-md shadow-primary/20 mt-2 active:scale-[0.98] transition-all"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export const OTPScreen: React.FC<AuthProps> = ({ navigate }) => {
  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <div className="flex-1 px-6 pt-8 flex flex-col items-center">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => navigate(Screen.LOGIN)} className="text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>

        <div className="text-primary dark:text-white text-3xl font-display font-bold tracking-tight mb-8 flex items-center gap-1">
          Goudela<span className="text-secondary text-3xl">•</span>
        </div>

        <div className="w-full max-w-sm flex flex-col items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Verification</h2>
          <p className="text-gray-500 text-sm text-center mb-8">A code has been sent to your phone number.</p>

          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-10 h-12 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-lg font-bold bg-white dark:bg-card-dark"
              >
                {i === 1 ? "5" : ""}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(Screen.DASHBOARD)}
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium h-12 rounded-lg shadow-md shadow-primary/20 active:scale-[0.98] transition-all"
          >
            Verify & Continue
          </button>
        </div>
      </div>
    </Layout>
  );
};
