import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessTitle, setBusinessTitle] = useState("");
  const [message, setMessage] = useState("");
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          business_title: businessTitle,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email,
        business_title: businessTitle,
      });
    }

    setMessage("Akun dibuat. Cek email Anda untuk verifikasi.");
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Login berhasil");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Inventory App</Text>
        <Text style={styles.subtitle}>{businessTitle || "Nama usaha"}</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Judul header / nama usaha"
          placeholderTextColor="#94a3b8"
          value={businessTitle}
          onChangeText={setBusinessTitle}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Buat Akun</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        {session ? <Text style={styles.sessionText}>Session aktif</Text> : <Text style={styles.sessionText}>Belum login</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  content: {
    padding: 24,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 18,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#0f172a",
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 12,
    color: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  message: {
    marginTop: 16,
    color: "#f8fafc",
  },
  sessionText: {
    marginTop: 18,
    color: "#94a3b8",
  },
});
