import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, email, regex, minLength, Input } from "valibot";
import { appStore } from "@/stores";

export const LoginPage = () => {
  const setProfile = appStore((state) => state.setProfile);
  const request = appStore((state) => state.request);
  const navigate = useNavigate();
  const schema = useMemo(
    () =>
      object({
        email: string([email("invalid email")]),
        password: string([
          regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "must have uppercase lowercase and number"
          ),
          minLength(5, "minimum length is 5"),
        ]),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: Input<typeof schema>) => {
    const response = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      setProfile((await response.json()).data);
      navigate("/");
    }
    if (response.status == 400) {
      setError("email", { message: "invalid credentials", type: "onChange" });
      setError("password", {
        message: "invalid credentials",
        type: "onChange",
      });
    }
  };

  return (
    <main className="flex items-center justify-center">
      <form
        className="border p-3 flex rounded-md flex-col gap-3 lg:w-96 mt-32 shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-semibold">Login Form</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="py-1 px-2 ring-1 rounded-md ring-gray-300 
            focus:outline-none focus:ring-2 focus:ring-slate-800 
            aria-[invalid=true]:ring-red-600 aria-[invalid=true]:focus-visible:ring-red-600 
            aria-[invalid=true]:text-red-500"
            aria-invalid={!!errors.email}
            type="text"
            placeholder="example@email.com"
            {...register("email")}
          />
          <span className="text-red-500 text-sm">{errors.email?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="py-1 px-2 ring-1 rounded-md ring-gray-300 
            focus:outline-none focus:ring-2 focus:ring-slate-800 
            aria-[invalid=true]:ring-red-600 aria-[invalid=true]:focus-visible:ring-red-600 
            aria-[invalid=true]:text-red-500"
            type="password"
            aria-invalid={!!errors.password}
            placeholder="password"
            {...register("password")}
          />
          <span className="text-red-500 text-sm">
            {errors.password?.message}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Link to="/reset-password" className="text-blue-700 hover:underline">
            Forgot your password?
          </Link>
          <button
            type="submit"
            className="mt-2 px-5 font-semibold py-1.5 rounded-md bg-slate-800 transition-colors
            hover:bg-slate-700 active:bg-slate-900 text-white 
            focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-slate-800"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
