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
  userId: string;
  id: number;
  username: string;
  name: string;
  email: string;
  creationTimestamp: Date;
  updateTimestamp: Date;
}

interface UserData {
  users: User[];
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

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("username") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const username = nameInput.value;
    const email = emailInput.value;
    try {
      await axios.post("http://localhost:8080/v1/users", {
        username,
        email,
      });
      toast({
        title: "Usuário criado com sucesso!",
        variant: "default",
      });
      getUser();
      form.reset();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast({
        title: "Ops!",
        description: "Ocorreu um erro ao tentar criar o usuário",
        variant: "destructive",
      });
    }
  };

  const updateUser = async (
    userId: string,
    username: string,
    email: string
  ) => {
    try {
      console.log("Atualizando usuário:", { userId, username, email });
      await axios.put(`http://localhost:8080/v1/users/${userId}`, {
        userId,
        username,
        email,
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

  const deleteUser = async (id: string) => {
    try {
      console.log("este é o id para ser removido: ", id);
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
            <form onSubmit={createUser}>
              <div className="flex flex-col justify-start items-start gap-4 py-4">
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="name">Nome completo:</Label>
                    <Input
                      id="username"
                      name="username"
                      className="col-span-3"
                      value={newUser}
                      onChange={(e) => setNewUser(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">E-mail:</Label>
                    <Input id="email" name="email" className="col-span-3" />
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
          {users.map((item) => (
            <TableRow key={item.userId}>
              <TableCell className="font-sm">
                ...{item.userId.slice(-6)}
              </TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"} size="icon">
                        <Eye size={18} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-screen-lg p-4">
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          Informações do Usuário
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <form className="max-w-screen overflow-y-auto max-h-[80vh] pl-4 pr-4">
                        <form className="max-w-screen overflow-y-auto max-h-[80vh] pl-4 pr-4">
                          <div className="flex flex-col gap-4 pb-4 w-full">
                            <Accordion type="single" collapsible>
                              <AccordionItem value="item-1">
                                <AccordionTrigger>
                                  Visualize as informações do usuário
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="flex flex-col gap-2 py-2">
                                    <Label>Nome:</Label>
                                    <Input
                                      value={item.username}
                                      readOnly
                                      className="bg-gray-100 cursor-not-allowed"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-2 py-2">
                                    <Label>E-mail:</Label>
                                    <Input
                                      value={item.email}
                                      readOnly
                                      className="bg-gray-100 cursor-not-allowed"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-2 py-2">
                                    <Label>Data de Criação:</Label>
                                    <Input
                                      value={new Date(
                                        item.creationTimestamp
                                      ).toLocaleDateString()}
                                      readOnly
                                      className="bg-gray-100 cursor-not-allowed"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-2 py-2">
                                    <Label>Data de Atualização:</Label>
                                    <Input
                                      value={new Date(
                                        item.updateTimestamp
                                      ).toLocaleDateString()}
                                      readOnly
                                      className="bg-gray-100 cursor-not-allowed"
                                    />
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </form>

                        <DialogFooter>
                          <Button variant={"outline"}>Fechar</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"} size="icon">
                        <Edit size={18} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-screen-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          Editar Usuário
                        </DialogTitle>
                        <DialogDescription>
                          Altere as informações do usuário
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const usernameInput = form.querySelector(
                            `#nameUser-${item.userId}`
                          ) as HTMLInputElement;
                          const emailInput = form.querySelector(
                            `#emailUser-${item.userId}`
                          ) as HTMLInputElement;

                          if (!usernameInput || !emailInput) {
                            console.error(
                              "Elementos de formulário não encontrados"
                            );
                            toast({
                              title: "Erro",
                              description:
                                "Não foi possível encontrar os campos do formulário.",
                              variant: "destructive",
                            });
                            return;
                          }

                          updateUser(
                            item.userId,
                            usernameInput.value,
                            emailInput.value
                          )
                            .then(() => {
                              toast({
                                title: "Usuário atualizado com sucesso!",
                                variant: "default",
                              });
                            })
                            .catch((error) => {
                              console.error(
                                "Erro ao atualizar usuário:",
                                error
                              );
                              toast({
                                title: "Ops!",
                                description:
                                  "Ocorreu um erro ao tentar atualizar o usuário",
                                variant: "destructive",
                              });
                            });

                          getUser();
                        }}
                      >
                        <div className="flex flex-col justify-start items-start gap-4 py-4 p-4">
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor={`nameUser-${item.userId}`}>
                                Nome completo:
                              </Label>
                              <Input
                                id={`nameUser-${item.userId}`}
                                defaultValue={item.username}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor={`emailUser-${item.userId}`}>
                                E-mail:
                              </Label>
                              <Input
                                id={`emailUser-${item.userId}`}
                                defaultValue={item.email}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button type="submit" variant={"default"}>
                            Salvar
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant={"destructive"}
                        size="icon"
                        className="text-white"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Usuário</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir este usuário?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            deleteUser(item.userId);
                          }}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Dashboard;
