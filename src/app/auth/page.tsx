"use client";
import Image from "next/image";
import banner from "/public/assets/banner-1.png";
import Login from "@/components/Login";
import { useState } from "react";
import Register from "@/components/Register";
import { useStateStore } from "@/Zustand/store";

const Auth = () => {
  const { authState, setAuthState } = useStateStore();
  // const isRegisterModalOpen = useAppSelector((state) => state.auth.authState);
  // const dispatch = useAppDispatch();
  return (
    <div className="md:h-screen   bg-gray-50 flex justify-center items-center relative ">
      <div className="lg:container mx-auto      ">
        <div className="flex md:flex-row flex-col justify-center  md:items-center gap-5 ">
          {/* left  part */}
          <div className="   text-gray-800 lg:p-5 p-20 ">
            <h2 className="font-bold lg:text-4xl text-3xl  ">
              WelCome To <span className="text-blue-500 ">Task Manager</span>
            </h2>
            <p className="text-lg  font-semibold   ">
              Let&apos;s make your project management easier!
            </p>

            <Image
              src={banner}
              width={500}
              height={500}
              placeholder="blur"
              className="mt-6"
              alt="LaundryHub img"
            />
          </div>

          {/* right part  */}

          <div className="    ">
            <div className="  ">
              <Login />
            </div>
          </div>
        </div>

        {/* register modal opening handling */}
        <div className="lg:w-1/4 w-full m-4 lg:m-0 ">
          {authState && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="bg-gray-50  p-6 rounded-xl">
                <Register />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
