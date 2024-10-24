"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactElement, ReactNode } from "react";

interface ParentProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<ParentProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
