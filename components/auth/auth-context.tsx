"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  supabase: ReturnType<typeof createClient>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  isLoading: true,
  supabase: createClient(),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <AuthContext.Provider value={{ user, session, isLoading, supabase }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
