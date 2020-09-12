import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { GET_COMMENTS } from "../pages/Home";

const SAVE_COMMENT = gql`
  mutation saveComment($name: String!, $content: String!) {
    saveComment(input: { name: $name, content: $content }) {
      id
      name
      content
    }
  }
`;

export default function Form() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [saveComment] = useMutation(SAVE_COMMENT);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      saveComment({
        variables: {
          name: name,
          content: content,
        },
        refetchQueries: [{ query: GET_COMMENTS }],
      });
    },
    [content, name, saveComment]
  );

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Digite o seu comentário"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Comentar</button>
    </form>
  );
}
