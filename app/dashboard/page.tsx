"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Edit, Eye, Trash2 } from "lucide-react";
import Loader from "@/components/loader";
import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserStocks {
  stockName: string;
  quantity: number;
  quote: number;
  total: number;
}

interface UserData {
  userStocks?: UserStocks[];
}

const Dashboard = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<string>("");
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState(true);

  const getAllUsers = async (user: any) => {
    try {
      const userId = user.userId;
      console.log(`O id que está sendo enviado é: ${userId}`);

      const response = await axios.get(
        `http://localhost:8080/v1/users/${userId}`
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/v1/users");
        await getAllUsers(response.data[0]);
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error(`Erro ao buscar usuários: Status ${response.status}`);
          toast({
            title: "Erro ao buscar usuários",
            description: `Erro ao buscar usuários: Status ${response.status}`,
            variant: "destructive",
          });
      }
    } catch (e) {
      console.error("Erro ao buscar usuários:", e);
      toast({
        title: "Erro ao buscar usuários",
        description: "Erro ao buscar usuários",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const input = form.elements.namedItem("name") as HTMLInputElement;

    const formData = new FormData();
    const body = {
      nameUser: formData.get("nameUser") as string,
      userEmail: formData.get("userEmail") as string,
    };

    if (input.value !== "") {
      try {
        await axios.post("http://localhost:8080/v1/users", body);
        toast({
          title: "Usuário criado com sucesso!",
          variant: "default",
        });
        getUser();
        setNewUser("");
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        toast({
          title: "Ops!",
          description: "Ocorreu um erro ao tentar criar o usuário",
          variant: "destructive",
        });
      }
    } else {
      alert("Por favor, insira um nome para o usuário");
    }
  };

  const updateUser = async (
    id: number,
    nameUser: string,
    userEmail: string
  ) => {
    try {
      await axios.put(`http://localhost:8080/v1/users/${id}`, {
        id,
        nameUser,
        userEmail,
      });

      getUser();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao tentar atualizar o usuário",
        variant: "destructive",
      });
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/v1/users/${id}`);
      toast({
        title: "Usuário deletado com sucesso!",
        variant: "destructive",
      });
      getUser();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao tentar deletar o usuário",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/users">Usuários</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-between mt-10">
        <div className="flex flex-col antialiased">
          <h3 className="font-bold text-2xl">Usuários</h3>
          <p className="text-gray-500">
            Visualize a lista de usuários cadastrados no sistema.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>+ Novo Usuário</Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Criar Usuário</DialogTitle>
              <DialogDescription>
                Insira os dados para criar um novo usuário
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={saveUser}>
              <div className="flex flex-col justify-start items-start gap-4 py-4">
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="name">Nome completo:</Label>
                    <Input
                      id="name"
                      defaultValue=""
                      className="col-span-3"
                      value={newUser}
                      onChange={(e) => setNewUser(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">E-mail:</Label>
                    <Input id="email" defaultValue="" className="col-span-3" />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant={"outline"}>Cancelar</Button>
                <Button type="submit" variant={"default"}>
                  Cadastrar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="mt-14 bg-gray-200/30 rounded-lg">
        <TableCaption className="text-gray-400">Lista de usuários</TableCaption>
        <TableHeader className="bg-zinc-900 w-full hover:bg:zinc-900">
          <TableRow>
            <TableHead className="w-[70px] font-bold text-white">#</TableHead>
            <TableHead className="font-bold text-white">Nome</TableHead>
            <TableHead className="font-bold text-white">E-mail</TableHead>
            <TableHead className="font-bold text-white">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {users.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"} size="icon">
                        <Eye size={18} />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  );
};

export default Dashboard;
