import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SwapOutlined } from "@ant-design/icons";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const DroppableComponent = ({
  droppableId,
  columnTitle,
  data,
}: {
  droppableId: string;
  columnTitle: string;
  data: [];
}) => (
  <Droppable droppableId={droppableId}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        className={`w-1/2 inline-block p-2 ${
          snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-200"
        }`}
      >
        <h3 className="font-medium text-blueDark text-center tracking-widest">{columnTitle}</h3>
        {data?.length > 0 &&
          data?.map((item, index) => {
            return (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`cursor-grab p-2 my-1 uppercase text-white font-medium text-xs ${
                      snapshot.isDragging ? "bg-blueDark" : "bg-slate-500"
                    }`}
                    style={{ ...provided.draggableProps.style }}
                  >
                    {item.name}
                  </div>
                )}
              </Draggable>
            );
          })}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default function DrapDropComponent({
  data,
  handleChange,
}: {
  data: { items: {}; selected: {} };
  handleChange: any;
}) {
  const getList = (id) => {
    if (id === data?.items?.droppableId) {
      return data?.items?.data;
    }
    return data?.selected?.data;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === data?.selected?.droppableId) {
        state = { selected: items };
      }

      handleChange(state);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      handleChange({
        items: result[data?.items?.droppableId],
        selected: result[data?.selected?.droppableId],
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex">
        <DroppableComponent
          columnTitle={data?.items?.columnTitle}
          droppableId={data?.items?.droppableId}
          data={data?.items?.data}
        />
        <SwapOutlined className="p-2" />
        <DroppableComponent
          columnTitle={data?.selected?.columnTitle}
          droppableId={data?.selected?.droppableId}
          data={data?.selected?.data}
        />
      </div>
    </DragDropContext>
  );
}
