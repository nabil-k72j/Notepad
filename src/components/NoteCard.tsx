import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "@/utils/api";

type Note = RouterOutputs["note"]["getAll"][0];

const NoteCard = ({ note, onDelete }: { note: Note; onDelete: () => void }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  return (
    <div className="card bg-base-100 mt-5 border border-gray-200 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collpase-content">
            <article className="prose lg:prose-xl ml-4">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
      <div className="card-actions mx-2 flex justify-end">
        <button className="btn-warning btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
