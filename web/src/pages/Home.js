import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

import Comment from "../components/Comment";
import Form from "../components/Form";

export const GET_COMMENTS = gql`
  query {
    comments {
      id
      name
      content
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_COMMENTS);

  if (error) return;

  return (
    <>
      <h1>Comentários</h1>
      <Form />
      {loading ? (
        "Carregando..."
      ) : (
        <section className="comments">
          {data.comments.map(({ id, name, content }) => (
            <Comment key={id} name={name} description={content} />
          ))}
        </section>
      )}
    </>
  );
}
