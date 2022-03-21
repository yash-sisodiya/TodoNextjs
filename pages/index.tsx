import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import AddTodo from "../components/addTask";
import Todo from "../components/task";
import { Images } from "../constants/images";
import Layout from "../layouts/Layout";
import apolloClient from "../lib/apollo";
import styles from "../styles/Home.module.css";

interface TodoProps {
  __typename: string;
  id: Number;
  name: string;
  status: boolean;
}
interface Props {
  todos: TodoProps[];
}

const QUERY = gql`
  query GetAllTask {
    getAllTask {
      id
      name
      status
    }
  }
`;

const Home: FunctionComponent<Props> = ({ todos }) => {
  const [TodoData, setTodoData] = useState<TodoProps[]>([]);
  const { loading, error, data, refetch } = useQuery(QUERY);
  const [TodoName, setTodoName] = useState<string>("");
  const [EditMode, setEditMode] = useState<boolean>(false);
  const [EditData, setEditData] = useState<TodoProps>({
    name: "",
    id: 0,
    status: false,
    __typename: "",
  });

  useEffect(() => {
    setTodoData(data?.getAllTask || []);
  }, [data]);

  if (loading) {
    return <p>Loading............</p>;
  }
  const { getAllTask }: { getAllTask: TodoProps[] } = data;

  if (!todos) {
    return <p>Loading............</p>;
  }
  const deleteTodo = async (deleteTaskId: Number) => {
    try {
      console.log(deleteTaskId);
      await apolloClient.mutate({
        mutation: gql`
          mutation DeleteTask($deleteTaskId: Float!) {
            deleteTask(id: $deleteTaskId) {
              id
            }
          }
        `,
        variables: { deleteTaskId },
      });
      todos = [...TodoData.filter((task) => task.id !== deleteTaskId)];
      setTodoData(todos);
      console.log("successfully deleted note!", todos);
    } catch (err) {
      console.log({ err });
    }
  };

  const addTodo = async () => {
    try {
      !EditMode
        ? await apolloClient.mutate({
            mutation: gql`
              mutation CreateTask($task: createtaskDto!) {
                createTask(task: $task) {
                  name
                  status
                }
              }
            `,
            variables: {
              task: {
                name: TodoName,
                status: false,
              },
            },
          })
        : await apolloClient.mutate({
            mutation: gql`
              mutation UpdateTask(
                $task: updatetaskDto!
                $updateTaskId: Float!
              ) {
                updateTask(task: $task, id: $updateTaskId) {
                  name
                }
              }
            `,
            variables: {
              task: {
                name: TodoName,
              },
              updateTaskId: EditData.id,
            },
          });
      setEditMode(false);
      setEditData({ name: "", id: 0, status: false, __typename: "" });
      setTodoName("");
      refetch();
    } catch (err) {
      console.log({ err });
    }
  };
  const markTodo = async (id: Number, status: boolean) => {
    try {
      await apolloClient.mutate({
        mutation: gql`
          mutation UpdateTask($task: updatetaskDto!, $updateTaskId: Float!) {
            updateTask(task: $task, id: $updateTaskId) {
              status
            }
          }
        `,
        variables: {
          task: {
            status: status,
          },
          updateTaskId: id,
        },
      });
      refetch();
    } catch (err) {
      console.log({ err });
    }
  };

  const updateTodo = async (data: TodoProps) => {
    setEditMode(true);
    setTodoName(data.name);
    setEditData(data);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Todo List App</title>
          <meta name="description" content="Todo List" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AddTodo
          addTodo={addTodo}
          TodoName={TodoName}
          setTodoName={(e) => setTodoName(e)}
          EditMode={EditMode}
        />
        {TodoData && TodoData.length > 0 ? (
          <div className={styles.wrapper}>
            {TodoData?.map((todo: TodoProps) => (
              <Todo
                todo={todo}
                deleteTodo={(id: Number) => deleteTodo(id)}
                key={todo.name}
                markTodo={(id, status) => markTodo(id, status)}
                updateTodo={(data) => updateTodo(data)}
              />
            ))}
          </div>
        ) : (
          "No Data Availabel"
        )}
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context: any) {
  // const { req }: { req: any } = context;
  // req.setHeader("Cache-Control", `s-maxage=1, stale-while-revalidate`);
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllTask {
        getAllTask {
          id
          name
          status
        }
      }
    `,
  });
  // console.log("abbb", data);
  return {
    props: {
      todos: data.getAllTask,
    },
  };
}

export default Home;
