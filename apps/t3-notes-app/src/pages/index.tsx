import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api, type RouterOutputs } from "../utils/api";

import {Header} from "~/components/Header";
import {NoteEditor} from "~/components/NoteEditor";
import {NoteCard} from "~/components/NoteCard";
import { useState } from "react";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
     <>
     <main>
        <Header />
        <Content />
      </main>
     </>
  );
}

const Content: React.FC = () => {
  const { data: sessionData } = useSession();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // get all topics
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  // create new topic topics
  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const { data: notes, refetch: refetchNotes } = api.notes.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createNote = api.notes.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.notes.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <div className="mx-5 grid grid-cols-4 gap-2">
      <div className="px-2">

        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {topics?.map((topic) => {
            return (
              <li key={topic.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedTopic(topic);
                }}
              >
                {topic.title}
              </a>
            </li>
            )
          })}
        </ul>

        <input type="text" 
        placeholder="add new topic"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if(e.key == "Enter") {
            createTopic.mutate({
              title : e.currentTarget.value,
            });
            e.currentTarget.value= ""
          }
        }}></input>

      </div>

      <div className="col-span-3">
  
        <div>
            {
              notes?.map((note) => {
                return (
                  <div key={note.id} className="mt-5">
                    <NoteCard note={note} onDelete={() => deleteNote.mutate({id: note.id})}></NoteCard>
                  </div>
                )
              })
            }

        </div>
        <NoteEditor onSave={({title, content}: any) => {
          createNote.mutate({
            title,
            content,
            topicId: selectedTopic?.id?? ""
          })
        }} />

      </div>
    </div>
  )
}