// "use client";
// import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { FaP } from "react-icons/fa6";

// interface EditableTextProps {
//   text: string;
//   onSave: (newText: string) => void;
// }
// const WorkSpacePage: React.FC<EditableTextProps> = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState("To Do");

//   const handleDoubleClick = () => {
//     setIsEditing(true);
//   };

//   const handleBlur = () => {
//     setIsEditing(false);
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditedText(e.target.value);
//   };
//   return (
//     <div>
//       <div className="w-[20rem] border bg-gray-50 rounded-lg  ">
//         <button className="w-full" onDoubleClick={handleDoubleClick}>
//           {isEditing ? (
//             <textarea
//               className="w-full"
//               type="text"
//               value={editedText}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               autoFocus
//             />
//           ) : (
//             <span>{editedText}</span>
//           )}
//         </button>
//         <div>
//           <button className="flex text-lg  items-center gap-1 w-full">
//             <FaPlus /> Add a card
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkSpacePage;

"use client";
// import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { HiDotsHorizontal } from "react-icons/hi";
// import { CgClose } from "react-icons/cg";
// import { useStoreWithEqualityFn } from "zustand/traditional";

// interface Card {
//   id: string;
//   text: string;
// }

// interface Column {
//   id: string;
//   title: string;
//   cards: Card[];
// }

// const TaskManagement: React.FC = () => {
//   const [columns, setColumns] = useState<Column[]>([
//     {
//       id: "column1",
//       title: "To Do",
//       cards: [
//         { id: "card1", text: "Task 1" },
//         { id: "card2", text: "Task 2" },
//         { id: "card3", text: "Task 3" },
//       ],
//     },
//     {
//       id: "column2",
//       title: "In Progress",
//       cards: [
//         { id: "card4", text: "Task 4" },
//         { id: "card5", text: "Task 5" },
//       ],
//     },
//     {
//       id: "column3",
//       title: "Done",
//       cards: [
//         { id: "card6", text: "Task 6" },
//         { id: "card7", text: "Task 7" },
//         { id: "card8", text: "Task 8" },
//       ],
//     },
//   ]);

//   const [columnId, setColumnId] = useState<string | null>(null);

//   const [draggedCard, setDraggedCard] = useState<Card | null>(null);

//   const handleAddCard = (columnId: string) => {
//     const newCard: Card = {
//       id: `card${Date.now()}`,
//       text: "New Task",
//     };

//     const updatedColumns = columns.map((column) => {
//       if (column.id === columnId) {
//         return {
//           ...column,
//           cards: [...column.cards, newCard],
//         };
//       }
//       return column;
//     });

//     setColumns(updatedColumns);
//   };

//   const handleDeleteCard = (columnId: string, cardId: string) => {
//     const updatedColumns = columns.map((column) => {
//       if (column.id === columnId) {
//         return {
//           ...column,
//           cards: column.cards.filter((card) => card.id !== cardId),
//         };
//       }
//       return column;
//     });

//     setColumns(updatedColumns);
//   };

//   const handleDragStart = (
//     event: React.DragEvent<HTMLDivElement>,
//     card: Card
//   ) => {
//     setDraggedCard(card);
//   };

//   const handleDragOver = (
//     event: React.DragEvent<HTMLDivElement>,
//     columnId: string,
//     index: number
//   ) => {
//     event.preventDefault();
//     setColumnId(columnId);
//   };

//   const handleDrop = (
//     event: React.DragEvent<HTMLDivElement>,
//     targetColumnId: string,
//     targetIndex: number
//   ) => {
//     if (!draggedCard) return;

//     const updatedColumns = columns.map((column) => {
//       if (column.cards.find((card) => card.id === draggedCard.id)) {
//         const filteredCards = column.cards.filter(
//           (card) => card.id !== draggedCard.id
//         );
//         const cards = [
//           ...filteredCards.slice(0, targetIndex),
//           draggedCard,
//           ...filteredCards.slice(targetIndex),
//         ];
//         return {
//           ...column,
//           cards,
//         };
//       }
//       if (column.id === targetColumnId) {
//         return {
//           ...column,
//           cards: [...column.cards, draggedCard],
//         };
//       }
//       return {
//         ...column,
//         cards: column.cards.filter((card) => card.id !== draggedCard.id),
//       };
//     });

//     setColumns(updatedColumns);

//     setDraggedCard(null);
//   };

//   return (
//     <div className="flex flex-row space-x-4 p-4">
//       {columns.map((column) => (
//         <div
//           key={column.id}
//           className="flex flex-col bg-gray-200 p-4 rounded-md w-[17rem]"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold">{column.title}</h2>
//             <HiDotsHorizontal className="text-gray-500 cursor-pointer" />
//           </div>

//           <div className="flex flex-col gap-2">
//             {column.cards.map((card, index) => (
//               <div
//                 key={card.id}
//                 className={`flex justify-between items-center bg-white rounded-md p-2 shadow-md cursor-move`}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, card)}
//                 onDragOver={(e) => handleDragOver(e, column.id, index)}
//                 onDrop={(e) => handleDrop(e, column.id, index)}
//                 style={{
//                   transition: "transform 0.2s ease-in-out",
//                   transform:
//                     draggedCard?.id === card.id ? "scale(1.05)" : "scale(1)",
//                 }}
//               >
//                 <span>{card.text}</span>
//                 <CgClose
//                   className="text-red-500 cursor-pointer"
//                   onClick={() => handleDeleteCard(column.id, card.id)}
//                 />
//               </div>
//             ))}
//           </div>
//           <button
//             className="flex items-center gap-1 mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             onClick={() => handleAddCard(column.id)}
//           >
//             <FaPlus />
//             <span>Add Card</span>
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskManagement;

"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

interface Card {
  id: string;
  text: string;
  isEditing?: boolean;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
  isEditable: boolean;
}

const TaskManagement: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "column1",
      title: "To Do",
      cards: [
        { id: "card1", text: "Task 1", isEditing: false },
        { id: "card2", text: "Task 2", isEditing: false },
        { id: "card3", text: "Task 3", isEditing: false },
      ],
      isEditable: false,
    },
    {
      id: "column2",
      title: "In Progress",
      cards: [
        { id: "card4", text: "Task 4", isEditing: false },
        { id: "card5", text: "Task 5", isEditing: false },
      ],
      isEditable: false,
    },
    {
      id: "column3",
      title: "Done",
      cards: [
        { id: "card6", text: "Task 6", isEditing: false },
        { id: "card7", text: "Task 7", isEditing: false },
        { id: "card8", text: "Task 8", isEditing: false },
      ],
      isEditable: false,
    },
  ]);

  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  const handleClickAddCard = (columnId: string) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        const { isEditable, ...otherData } = column;
        return {
          ...otherData,
          isEditable: true,
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleMakeCardChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    columnId: string
  ) => {
    const newCard: Card = {
      id: `card${Date.now()}`,
      text: event.target.value,
      isEditing: false,
    };
    // console.log(event.target.value > 0);
    if (event.target.value.length > 0) {
      const updatedColumns = columns.map((column) => {
        if (column.id === columnId) {
          const { isEditable, ...otherData } = column;
          return {
            ...otherData,
            isEditable: false,
            cards: [...column.cards, newCard],
          };
        }
        return column;
      });

      setColumns(updatedColumns);
    } else {
      const updatedColumns = columns.map((column) => {
        if (column.id === columnId) {
          const { isEditable, ...otherData } = column;

          return {
            ...otherData,
            isEditable: false,
          };
        }
        return column;
      });
      setColumns(updatedColumns);
    }
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== cardId),
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    card: Card
  ) => {
    setDraggedCard(card);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    columnId: string,
    index: number
  ) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetColumnId: string,
    targetIndex: number
  ) => {
    if (!draggedCard) return;

    const updatedColumns = columns.map((column) => {
      if (column.cards.find((card) => card.id === draggedCard.id)) {
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== draggedCard.id),
        };
      }
      if (column.id === targetColumnId) {
        const targetColumnCards = [...column.cards];
        targetColumnCards.splice(targetIndex, 0, draggedCard);
        return {
          ...column,
          cards: targetColumnCards,
        };
      }
      return column;
    });

    setColumns(updatedColumns);
    setDraggedCard(null);
  };

  const handleTitleDoubleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    cardId: string
  ) => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      cards: column.cards.map((card) =>
        card.id === cardId ? { ...card, isEditing: true } : card
      ),
    }));

    setColumns(updatedColumns);
  };

  const handleTitleBlur = (
    event: React.FocusEvent<HTMLTextAreaElement>,
    cardId: string
  ) => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      cards: column.cards.map((card) =>
        card.id === cardId ? { ...card, isEditing: false } : card
      ),
    }));

    setColumns(updatedColumns);
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    cardId: string
  ) => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      cards: column.cards.map((card) =>
        card.id === cardId ? { ...card, text: event.target.value } : card
      ),
    }));

    setColumns(updatedColumns);
  };

  return (
    <div className="flex flex-row space-x-4 p-4">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex flex-col bg-gray-200 p-4 rounded-md w-[17rem]"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{column.title}</h2>
            <HiDotsHorizontal className="text-gray-500 cursor-pointer" />
          </div>

          <div className="flex flex-col gap-2">
            {column.cards.map((card, index) => (
              <div
                key={card.id}
                className={`flex justify-between items-center bg-white rounded-md p-2 shadow-md cursor-move ${
                  draggedCard?.id === card.id ? "opacity-40" : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
                onDragOver={(e) => handleDragOver(e, column.id, index)}
                onDrop={(e) => handleDrop(e, column.id, index)}
              >
                {card.isEditing ? (
                  <textarea
                    className="w-full"
                    value={card.text}
                    onChange={(e) => handleTitleChange(e, card.id)}
                    onBlur={(e) => handleTitleBlur(e, card.id)}
                    autoFocus
                  />
                ) : (
                  <button
                    className="w-full text-left"
                    onDoubleClick={(e) => handleTitleDoubleClick(e, card.id)}
                  >
                    {card.text}
                  </button>
                )}
                <CgClose
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteCard(column.id, card.id)}
                />
              </div>
            ))}
          </div>
          {column.isEditable && (
            <textarea
              className="w-full"
              onBlur={(e) => handleMakeCardChange(e, column.id)}
              autoFocus
            />
          )}
          <button
            className="flex items-center gap-1 mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => handleClickAddCard(column.id)}
          >
            <FaPlus />
            <span>Add Card</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskManagement;
