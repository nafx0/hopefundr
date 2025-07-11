import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "../contexts/AuthProvider";
import auth from "../auth/firebase.init";

export function LoginForm({ className, ...props }) {
  const { googleAuth, logInManually } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    pass: "",
  });

  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Login Successful",
        text: "You have successfully logged in.",
        icon: "success",
      });
    }
  }, [success]);

  const handleGoogleSignIn = () => {
    googleAuth()
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
    setSuccess(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    logInManually(form.email, form.pass)
      .then((userCredential) => {
        console.log("Login User: ", userCredential.user);
        setSuccess(true);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      })
      .finally(() => {
        setForm({ ...form, email: "", pass: "" });
      });
  };

  const handleForgetPass = () => {
    const email = form.email;

    if (!email) {
      setErrorMessage("Provide a valid email");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Password Reset Email Sent",
            text: "Check your inbox to reset your password.",
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="bg-background flex min-h-svh relative flex-col items-center justify-center gap-6 py-10 px-6 md:p-10 mt-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                  <span className="sr-only">Hopefundr.</span>
                </a>
                <h1 className="text-xl font-bold">Welcome to Hopefundr.</h1>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <NavLink
                    to="/register"
                    className="underline underline-offset-4 text-primary"
                  >
                    Sign up
                  </NavLink>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-3 relative">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline text-primary"
                      onClick={handleForgetPass}
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    name="pass"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={form.pass}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-12.25 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <Button type="submit" className="w-full" onClick={handleLogin}>
                  Continue
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or
                </span>
              </div>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </form>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
